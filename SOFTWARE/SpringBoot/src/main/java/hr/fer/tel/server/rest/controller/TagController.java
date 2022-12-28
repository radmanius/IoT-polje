package hr.fer.tel.server.rest.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.metrics.StartupStep.Tags;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.dto.TagDTO;
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
//  @GetMapping("/tags22")
//  public ResponseEntity<Set<Tag>> getTags2() {
//    Set<Tag> result = new TreeSet<>((o1, o2) -> o1.getName().compareTo(o2.getName()));
//    tagService.getAll().stream()
//      .forEach(t -> result.add(t));
//
//    return ResponseEntity.ok(result);
//  }

  @GetMapping("/tags")
  public ResponseEntity<Collection<Tag>> getTags() {
     return ResponseEntity.ok(tagService.getAllTags());
  }
  
  @GetMapping("/tags2")
  @RolesAllowed("iot-read")
  public ResponseEntity<List<String>> getTags2() {
     List<Tag> tags =  tagService.getAllTags();
     
     List<String> tagNames = new ArrayList<>();
     
     tags.stream().forEach(tag -> tagNames.add(tag.getName()));
     
	return ResponseEntity.ok(tagNames);
  }

}
