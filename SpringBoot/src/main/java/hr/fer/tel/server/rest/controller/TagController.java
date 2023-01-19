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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.tel.server.rest.dto.TagDTO;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.service.TagService;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/rest2")
public class TagController {

  @Autowired
  private TagService tagService;


  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  @GetMapping("/tags")
  @RolesAllowed("iot-read")
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
