package hr.fer.tel.server.rest.service;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.repository.dao.TagRepository;

@Service
public class TagService {

	@Autowired
	private SceneService sceneService;
	
	@Autowired
	private TagRepository tagRepository;


  public Set<Tag> getAll() {
    Set<Tag> set = new LinkedHashSet<>();
    var scenes = sceneService.getAllScenes();
    for (var scene : scenes)
      set.addAll(scene.getTags());
    return set;
  }
  
  public Collection<Tag> getAllTags(){
	  return tagRepository.getAllTags();
  }
  
  
}
