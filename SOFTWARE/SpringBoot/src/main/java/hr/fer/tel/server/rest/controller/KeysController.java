package hr.fer.tel.server.rest.controller;

import java.util.Collection;
import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.model.ShortKeyDTO;
import hr.fer.tel.server.rest.service.KeyService;

@RestController
public class KeysController {

  private final KeyService keyService;

  public KeysController(KeyService keyService) {
    this.keyService = keyService;
  }

  @RolesAllowed("iot-read")
  @GetMapping("/keys")
  public ResponseEntity<Collection<ShortKeyDTO>> getKeys() {
    List<ShortKeyDTO> list = keyService.getAll().stream()
        .map(k -> k.toDTO())
        .toList();
    return ResponseEntity.ok(list);
  }

}
