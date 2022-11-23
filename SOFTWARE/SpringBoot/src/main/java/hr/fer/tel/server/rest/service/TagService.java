package hr.fer.tel.server.rest.service;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import hr.fer.tel.server.rest.model.Tag;

@Service
public class TagService {

  private final SceneService sceneService;

  public TagService(SceneService sceneService) {
    this.sceneService = sceneService;
  }

  public Set<Tag> getAll() {

    Set<Tag> set = new LinkedHashSet<>();
    var scenes = sceneService.getAllScenes();
    for (var scene : scenes)
      set.addAll(scene.getTags());

    return set;
  }
}
