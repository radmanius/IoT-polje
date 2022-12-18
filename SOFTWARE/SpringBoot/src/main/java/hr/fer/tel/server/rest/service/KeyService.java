package hr.fer.tel.server.rest.service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.repository.dao.KeyRepository;

@Service
public class KeyService {

  @Autowired
  private KeyRepository keyRepository;

  @SuppressWarnings("unused")
  @Autowired
  private  SceneService sceneService;

  
  public Optional<Key> findById(String value) {
      return keyRepository.findById(value);
  }
  
  public boolean checkIfExists(String value) {
  	return findById(value).isPresent();
  }
  
  public Set<Key> getAll() {
    return keyRepository.findAll().stream()
      .collect(Collectors.toSet());
  }

public Key ProbaDeleteKeyById(String value) {
	
	Key key = this.findById(value).get();
	
	keyRepository.delete(key);
	
	return key;
}

public Key ProbaAdd(Key key) {
		
	keyRepository.save(key);
	
	return key;
}
  
  

}
