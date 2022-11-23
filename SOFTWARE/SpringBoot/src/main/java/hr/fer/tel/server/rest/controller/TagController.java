package hr.fer.tel.server.rest.controller;

import java.util.Set;

import javax.annotation.security.RolesAllowed;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.service.TagService;

@RestController
public class TagController {

  private final TagService tagService;

  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  @RolesAllowed("iot-read")
  @GetMapping("/tags")
  public ResponseEntity<Set<Tag>> getTags() {
    return ResponseEntity.ok(tagService.getAll());

  }

}
