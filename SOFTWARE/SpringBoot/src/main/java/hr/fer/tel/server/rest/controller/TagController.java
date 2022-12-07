package hr.fer.tel.server.rest.controller;

import java.util.Collection;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.security.RolesAllowed;

import hr.fer.tel.server.rest.repository.dao.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.service.TagService;

@RestController
@RequestMapping("/rest2")
public class TagController {

  private final TagService tagService;

  @Autowired
  private TagRepository tr;

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
     return ResponseEntity.ok(tr.getAllTags());
  }

}
