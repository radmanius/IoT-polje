package hr.fer.oauth.command.line;

import java.net.URLEncoder;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import hr.fer.oauth.OAtuh2AuthorizationFlowPKCEClient;

public class Main {
  private static Logger log = LoggerFactory.getLogger(Main.class);

  public static void main(String[] args) throws Exception {
    String authorizationServerUrl = "https://iotat.tel.fer.hr:58443/auth";
    String realm = "spring";
    String clientId = "mobile-keycloak";

    OAtuh2AuthorizationFlowPKCEClient oauthClient = new OAtuh2AuthorizationFlowPKCEClient(
        authorizationServerUrl,
        realm,
        clientId);


     //callLocalRestServer(oauthClient);
     
     
    callIoTLabRestServer(oauthClient); //-zove server od ztela
  }

  private static void callLocalRestServer(OAtuh2AuthorizationFlowPKCEClient oauthClient) throws Exception {
	  // call service on local server
	  String localRestUrl = "http://localhost:8080";
	  // Anonymous calls
	  System.out.println("****** Anonymous *******");
	  invokeService(localRestUrl + "/scene/" +  URLEncoder.encode("{1}", "UTF-8"), null);
//	  invokeService(localRestUrl + "/a", null);
//	  invokeService(localRestUrl + "/read", null);
//	  invokeService(localRestUrl + "/write", null);
	  
	  // Authenticated call
	  System.out.println("****** Authenticated *******");
//	  invokeService(localRestUrl + "/info", oauthClient);
//	  invokeService(localRestUrl + "/a", oauthClient);
//	  invokeService(localRestUrl + "/read", oauthClient);
//	  invokeService(localRestUrl + "/write", oauthClient);
  }
  
  private static void callIoTLabRestServer(OAtuh2AuthorizationFlowPKCEClient oauthClient) throws Exception {
    // call service on IoT lab server
    String restUrl = "https://iotat.tel.fer.hr:58443/rest";
    invokeService(restUrl + "/keys", oauthClient);
    invokeService(restUrl + "/keys", oauthClient);
  }


  private static void invokeService(String restUrl, OAtuh2AuthorizationFlowPKCEClient oauthClient) throws Exception {
    CloseableHttpClient httpClient = HttpClientBuilder
      .create()
      .disableRedirectHandling()
      .build();

    HttpGet restRequest = new HttpGet(restUrl);

    if(oauthClient != null) {
      String accessToken = oauthClient.getAccessToken();
      restRequest.setHeader("Authorization", "bearer " + accessToken);
    }

    CloseableHttpResponse restResponse = httpClient.execute(restRequest);
    String restResponse_content = EntityUtils.toString(restResponse.getEntity());

    log.info("REST response content: {}", restResponse_content);
  }
}
