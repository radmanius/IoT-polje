package hr.fer.tel.server.rest.controller;

import hr.fer.tel.server.rest.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.Set;

@RestController
public class TagController {
	
	@Autowired
    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @RolesAllowed( "iot-read")
    @GetMapping("/tags")
    public ResponseEntity<Set<String>> getTags(){
        return ResponseEntity.ok(tagService.getAll());

    }

}
