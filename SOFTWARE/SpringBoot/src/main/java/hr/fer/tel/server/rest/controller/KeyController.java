package hr.fer.tel.server.rest.controller;

import hr.fer.tel.server.rest.dto.KeyDTO;
import hr.fer.tel.server.rest.service.KeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.Set;

@RestController
public class KeyController {

    private final KeyService keyService;

    @Autowired
    public KeyController(KeyService keyService) {
        this.keyService = keyService;
    }

    @RolesAllowed("iot-read")
    @GetMapping("/keys")
    public ResponseEntity<Set<KeyDTO>> getKeys(){
        return ResponseEntity.ok(keyService.getAll());
    }
}
