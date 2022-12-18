package hr.fer.tel.server.rest.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.service.TagService;

@RestController
@RequestMapping("/rest2")
public class TagController {

  @Autowired
  private TagService tagService;


  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  //@RolesAllowed("iot-read")
  /*@GetMapping("/tags")
  public ResponseEntity<Set<Tag>> getTags() {
    Set<Tag> result = new TreeSet<>((o1, o2) -> o1.getName().compareTo(o2.getName()));
    tagService.getAll().stream()
      .forEach(t -> result.add(t));

    return ResponseEntity.ok(result);
  }*/

  @GetMapping("/tags")
  public ResponseEntity<Collection<Tag>> getTags() {
     return ResponseEntity.ok(tagService.getAllTags());
  }

}
