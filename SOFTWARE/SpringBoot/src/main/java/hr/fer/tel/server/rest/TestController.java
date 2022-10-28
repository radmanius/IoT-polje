package hr.fer.tel.server.rest;

import java.security.Principal;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.utils.KeycloakSecurityConfig;


@RestController
@RequestMapping("/")
public class TestController {

  @GetMapping("/a")
  public ResponseEntity<String> getAnonymous() {
    return ResponseEntity.ok("Anonymous response");
  }

  @RolesAllowed("iot-read")
  @GetMapping("/read")
  public ResponseEntity<String> getUser() {
      return ResponseEntity.ok("Reading response");
  }

  @RolesAllowed("iot-write")
  @GetMapping("/write")
  public ResponseEntity<String> getAdmin() {
      return ResponseEntity.ok("Writing response");
  }

  @RolesAllowed({"iot-write", "iot-read"})
  @GetMapping("/info")
  public ResponseEntity<String> getInfo(Principal principal) {
    StringBuilder sb = new StringBuilder();

    sb.append("Principal: ");
    sb.append(principal.getName());
    sb.append("\nAuthorities:\n");

    sb.append(KeycloakSecurityConfig.getRoles().stream()
      .map(ga -> ga.getAuthority())
      .collect(Collectors.joining("\n  ", "  ", "\n")));

    return ResponseEntity.ok("Info response\n" + sb.toString());
  }
}
