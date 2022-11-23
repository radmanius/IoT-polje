package hr.fer.tel.server.rest.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.repository.dao.KeyRepository;

@Service
public class KeyService {

  private final KeyRepository keyRepository;

  private final SceneService sceneService;

  @Autowired
  public KeyService(KeyRepository keyRepository, SceneService sceneService) {
    this.keyRepository = keyRepository;
    this.sceneService = sceneService;
  }

  public Set<Key> getAll() {
    return keyRepository.findAll().stream()
      .collect(Collectors.toSet());
  }

}
