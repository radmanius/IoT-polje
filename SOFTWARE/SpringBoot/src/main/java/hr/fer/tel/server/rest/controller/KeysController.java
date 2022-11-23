package hr.fer.tel.server.rest.controller;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.model.ShortKeyDTO;
import hr.fer.tel.server.rest.service.KeyService;

@RestController
@RequestMapping("/rest2")
public class KeysController {

  private final KeyService keyService;

  public KeysController(KeyService keyService) {
    this.keyService = keyService;
  }

  @RolesAllowed("iot-read")
  @GetMapping("/keys")
  public ResponseEntity<Collection<ShortKeyDTO>> getKeys() {
    Set<ShortKeyDTO> result = keyService.getAll().stream()
      .map(k -> k.toDTO())
      .collect(Collectors.toSet());

    return ResponseEntity.ok(result);
  }

}
