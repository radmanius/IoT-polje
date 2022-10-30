package hr.fer.oauth;

import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import org.apache.hc.core5.http.NameValuePair;
import org.apache.hc.core5.net.URIBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RedirectServer {
  private Logger log = LoggerFactory.getLogger(getClass());

  private ServerSocket serverSocket;
  private Optional<Thread> thread;
  private String authorizationCode;

  private int port;

  public void startServer() {
    try {
      serverSocket = new ServerSocket(0);
      port = serverSocket.getLocalPort();
      thread = Optional.of(new Thread(() -> {
        try (Socket socket = serverSocket.accept()) {
          extractAuthorizationCode(socket);
          generateSuccesfullResponse(socket);
        } catch (IOException e) {
          log.error("Can not accept requests in OAuth2 server", e);
        } catch (URISyntaxException e) {
          log.error("can not extract authorizartion code", e);
        }
        thread = Optional.empty();
      }));

      thread.get().start();
    } catch (IOException e) {
      log.error("Can not start OAuth2 server", e);
    }
  }

  private void generateSuccesfullResponse(Socket socket) {
    try (PrintWriter writer = new PrintWriter(new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8), true)) {
      writer.print("HTTP/1.1 200 OK\r\n");
      writer.print("Content-Type: text/html\r\n");
      writer.print("\r\n");
      writer.print("""
      	<html>
      	<body>
      	<p>Sucessfull login! You can now close browser.</p>
      	<script>
              window.close();
        </script>
      	</body>
      	</html>
      	""");
    } catch (IOException e) {
     log.error("Can not generate response", e);
    }
  }

  private void extractAuthorizationCode(Socket socket) throws URISyntaxException {
    try {
      BufferedReader reader = new BufferedReader(
            new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8));
      String httpLine = reader.readLine();
      log.debug("httpLine: {}", httpLine);
      if (httpLine != null) {

        // extract URI
        URI redirectUri = extractUriFromParseHttpLine(httpLine);

        // extract authorization code
        List<NameValuePair> query = new URIBuilder(redirectUri).getQueryParams();
        query.stream().filter(p -> p.getName().equals("code")).map(p -> p.getValue()).findFirst().ifPresent(c -> authorizationCode = c);
      }
      log.debug("{}[\\r][\\n]", httpLine);
      httpLine = reader.readLine();
      while(httpLine != null && !httpLine.equals("")) {
        log.debug("{}[\\r][\\n]", httpLine);
        httpLine = reader.readLine();
      }
    } catch (IOException e) {
      log.error("Ca not get input stream from socket", e);
    }
  }

  private URI extractUriFromParseHttpLine(String httpLine) throws URISyntaxException {
    String[] lineElements = httpLine.split(" ");
    return new URI(lineElements[1]);
  }

  public void startBrowser(String generatedLoginPageUrl) throws IOException, URISyntaxException {
    log.debug("Browser URL: {}", generatedLoginPageUrl);
    if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
      Desktop.getDesktop().browse(new URI(generatedLoginPageUrl));
    } else {
      log.info("Can not start browser!");
    }

  }

  public String getAuthCode() {
    return authorizationCode;
  }

  public void waitOrStopServer() {
    thread.ifPresent(t -> {
      try {
        t.join(5*60*1000); // wait for max 5 mins
      } catch (InterruptedException e) {
        log.error("Thread interrupted while waiting to finish", e);
      }
    });

    try {
      serverSocket.close();
      thread.ifPresent(t -> {
        thread = Optional.empty();
        t.interrupt();
      });
    } catch (IOException e) {
      log.error("Can not close socket server", e);
    }
  }

  public String getPort() {
    return Integer.toString(port);
  }

}
