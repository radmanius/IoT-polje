package hr.fer.oauth;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.UrlEncodedFormEntity;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.apache.hc.core5.http.NameValuePair;
import org.apache.hc.core5.http.ParseException;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

public class OAtuh2AuthorizationFlowPKCEClient {
  protected Logger log = LoggerFactory.getLogger(getClass());

  private static final String SCOPES = "openid%20profile";
  private static final String CHARS = "abcdefghijklmnopqrstxyzABCDEFGHIJKLMNOPQRSTXYZ0123456789";

  private String clientId;
  // u Keycloaku staviti u Valid redirect uri za klijenta
  private String redirectUrl = "http://127.0.0.1:";

  private String authorizationServerAuthorizeUrl;
  private String authorizationServerTokenUrl;

  // oauth2 PKCE process vars
  private String verifier;
  private String challenge;

  private String authCode;

  protected String accessToken;
  protected String refreshToken;

  protected CloseableHttpClient httpClient;

  public OAtuh2AuthorizationFlowPKCEClient(String authorizationServerUrl, String realm, String clientId) {
    this.clientId = clientId;

    authorizationServerAuthorizeUrl = authorizationServerUrl + "/realms/" + realm + "/protocol/openid-connect/auth";
    authorizationServerTokenUrl = authorizationServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";

    initializeHttpClient();
  }

  private void initializeHttpClient() {
    httpClient = HttpClientBuilder
      .create()
      .disableRedirectHandling()
      .build();
  }

  public static PKCEClientAppBuilder builder() {
    return new PKCEClientAppBuilder();
  }

  public void authenticate() throws Exception {
    if(accessToken == null) {
      Path refreshTokenPath = Paths.get("refresh.txt");
      if(Files.exists(refreshTokenPath)) {
        refreshToken = Files.readString(refreshTokenPath, StandardCharsets.UTF_8);
        refreshTokens();
      } else {
        authenticateWithUserCredentials();
      }
    } else {
      refreshTokens();
    }
  }

  private void refreshTokens() throws Exception {
    log.debug("refreshing tokens");
    HttpPost getTokensRequest = new HttpPost(authorizationServerTokenUrl);
    getTokensRequest.setHeader("Content-Type", "application/x-www-form-urlencoded");

    List<NameValuePair> getTokensRequest_bodyParameters = new ArrayList<>();
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("grant_type", "refresh_token"));
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("client_id", clientId));
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("refresh_token", refreshToken));
    getTokensRequest.setEntity(new UrlEncodedFormEntity(getTokensRequest_bodyParameters));

    CloseableHttpResponse getTokenResponse = httpClient.execute(getTokensRequest);
    String jsonString = EntityUtils.toString(getTokenResponse.getEntity());
    log.debug("Get token response: {}", jsonString);

    extractTokens(jsonString);

  }

  private void authenticateWithUserCredentials()
      throws NoSuchAlgorithmException, URISyntaxException, IOException, ParseException {
    generatePKCEMaterial();

    RedirectServer rs = new RedirectServer();
    rs.startServer();
    redirectUrl += rs.getPort();
    rs.startBrowser(generateLoginPageUrl());
    rs.waitOrStopServer();
    authCode = rs.getAuthCode();
    if (authCode != null)
      fetchTokens();
  }

  private void generatePKCEMaterial() throws NoSuchAlgorithmException {
    log.info("APP: Generating PKCE Verifier");

    generateVerifier();
    calculateChallenge();
    log.info("*********************");
  }

  // VERIFIER=`cat /dev/urandom | LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 50 |
  // head -n 1`
  private void generateVerifier() {
    Random rand = new Random();
    StringBuilder sb = new StringBuilder(50);
    int maxIndex = CHARS.length();
    for (int i = 0; i < 50; i++) {
      sb.append(CHARS.charAt(rand.nextInt(maxIndex)));
    }

    verifier = sb.toString();
    log.info("Verifier is: " + verifier);
  }

  // #Generate PKCE Challenge from Verifier and convert / + = characters"
  private void calculateChallenge() throws NoSuchAlgorithmException {
    byte[] bytes = verifier.getBytes(StandardCharsets.US_ASCII);
    MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
    messageDigest.update(bytes, 0, bytes.length);
    byte[] digest = messageDigest.digest();
    challenge = Base64.getUrlEncoder().withoutPadding().encodeToString(digest);

    log.info("Challenge is: " + challenge);
  }

  private String generateLoginPageUrl() {
    String authorizationCodeRequest_params = String.format(
        "redirect_uri=%s&scope=%s&response_type=code&client_id=%s&code_challenge=%s&code_challenge_method=S256&response_mode=query",
        URLEncoder.encode(redirectUrl, StandardCharsets.UTF_8), SCOPES, clientId, challenge);
    String loginPageUrl = authorizationServerAuthorizeUrl + "?" + authorizationCodeRequest_params;
    return loginPageUrl;
  }

  public void fetchTokens() throws URISyntaxException, IOException, ParseException {
    log.info("APP: Exchange code for Tokens (UML: 14--> <--15)");
    log.info("using auth code {}", authCode);

    HttpPost getTokensRequest = prepareTokensRequest();
    CloseableHttpResponse getTokenResponse = httpClient.execute(getTokensRequest);
    String jsonString = EntityUtils.toString(getTokenResponse.getEntity());
    log.debug("Get token response: {}", jsonString);

    extractTokens(jsonString);
  }

  private void extractTokens(String jsonString) throws IOException {
    // parse Json and extract tokens
    DocumentContext jsonContext = JsonPath.parse(jsonString);
    // ACCESS_TOKEN=`echo $TOKENS | jq -r .access_token`
    accessToken = jsonContext.read("$['access_token']");
    // REFRESH_TOKEN=`echo $TOKENS | jq -r .refresh_token`
    refreshToken = jsonContext.read("$['refresh_token']");

    log.info("Access Token: {}", accessToken);
    log.info("Refresh Token: {}", refreshToken);
    saveRefreshTokenToFile();
    log.debug("Decoded access token:");
    String[] jwtParts = accessToken.split("[.]");
    String header = new String(Base64.getDecoder().decode(jwtParts[0]), StandardCharsets.UTF_8);
    ObjectMapper mapper = new ObjectMapper();
    log.debug(" header: {}", mapper.readTree(header).toPrettyString());
    String payload = new String(Base64.getDecoder().decode(jwtParts[1]), StandardCharsets.UTF_8);
    log.debug(" payload: {}", mapper.readTree(payload).toPrettyString());
    log.info("*********************");
  }

  private void saveRefreshTokenToFile() throws IOException {
    Files.writeString(Paths.get("refresh.txt"), refreshToken, StandardCharsets.UTF_8);
  }

  private HttpPost prepareTokensRequest() {
    HttpPost getTokensRequest = new HttpPost(authorizationServerTokenUrl);
    getTokensRequest.setHeader("Content-Type", "application/x-www-form-urlencoded");

    List<NameValuePair> getTokensRequest_bodyParameters = new ArrayList<>();
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("grant_type", "authorization_code"));
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("redirect_uri", redirectUrl));
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("code", authCode));
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("code_verifier", verifier));
    getTokensRequest_bodyParameters.add(new BasicNameValuePair("client_id", clientId));
    getTokensRequest.setEntity(new UrlEncodedFormEntity(getTokensRequest_bodyParameters));
    return getTokensRequest;
  }

  public String getAccessToken() throws Exception {
    if(!isAutnenticated())
      authenticate();

    return accessToken;
  }

  public boolean isAutnenticated() {
    return accessToken != null && isValidAccessToken();
  }

  private boolean isValidAccessToken() {
    DecodedJWT decodedJWT = JWT.decode(accessToken);
    Date expires = decodedJWT.getExpiresAt();

    return expires.after(Date.from(Instant.now().plus(30, ChronoUnit.SECONDS)));
  }

  public static class PKCEClientAppBuilder {

    private String authorizationServerUrl;
    private String realm;
    private String clientId;
    private String redirectUrl;

    public OAtuh2AuthorizationFlowPKCEClient build() {
      assertNotNull(authorizationServerUrl, "authorizationServerUrl");
      assertNotNull(realm, "realm");
      assertNotNull(clientId, "clientId");

      OAtuh2AuthorizationFlowPKCEClient pkceClient = new OAtuh2AuthorizationFlowPKCEClient(authorizationServerUrl,
          realm, clientId);
      return pkceClient;
    }

    public PKCEClientAppBuilder clientId(String clientId) {
      this.clientId = clientId;
      return this;

    }

    public PKCEClientAppBuilder realm(String realm) {
      this.realm = realm;
      return this;
    }

    private void assertNotNull(Object value, String name) {
      if (value == null)
        throw new IllegalStateException(name + " can not be null!");
    }

    public PKCEClientAppBuilder authorizationServerUrl(String authorizationServerUrl) {
      this.authorizationServerUrl = authorizationServerUrl;
      return this;
    }

  }

}
