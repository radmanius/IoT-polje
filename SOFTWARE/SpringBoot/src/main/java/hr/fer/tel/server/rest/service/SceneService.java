package hr.fer.tel.server.rest.service;

import hr.fer.tel.server.rest.dto.KeyDTO;
import hr.fer.tel.server.rest.dto.SceneDTO;
import hr.fer.tel.server.rest.model.*;
import hr.fer.tel.server.rest.repository.dao.SceneRepository;
import hr.fer.tel.server.rest.utils.KeycloakSecurityConfig;
import hr.fer.tel.server.rest.utils.NoSuchElement;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SceneService {

	private final SceneRepository sceneRepository;

	@Autowired
	public SceneService(SceneRepository sceneRepository) {
		this.sceneRepository = sceneRepository;
	}
	
	//Find and return scene by id without roles
	public Scene fetch(String id) {
		return findById(id).orElseThrow(() -> new EntityMissingException(Scene.class, id));
	}
	
	//Find and return scene by id
	public Optional<Scene> findById(String id) {
		return sceneRepository.findById(id);
	}
		
	//get all scenesDTO - OK - OK
	public List<SceneDTO> getAllScenes() {

		String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toArray(String[]::new);
		
		
		if (roles.length < 1)
			throw new NoSuchElement("No roles at all");

		List<String> ouput = List.of(roles);

		return sceneRepository.getByRoles(ouput).stream().map(SceneDTO::from).collect(Collectors.toList());
	}

	//get scene by id defined by roles - OK - OK
	public Scene getById(String id) {
		
		String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
				.toArray(String[]::new);
		
		if (roles.length < 1)
			throw new NoSuchElement("No roles at all");
		
		List<String> ouput = List.of(roles);

		Scene scene = sceneRepository.getByRoles(ouput).stream().filter(sc -> Long.valueOf(sc.getId()).equals(id)).findAny()
				.orElseThrow(() -> new NoSuchElement("Access denied, no required roles for given scene id: " + id));
	
		return scene;
	}

	//add scene - OK - OK
	public Scene addScene(Scene scene) {
		if (!sceneRepository.existsById(Long.valueOf(scene.getId()).toString())) {
			return sceneRepository.save(scene);
		}

		throw new NoSuchElement("Scene " + scene.getId() + " already exists!");
	}

	//edit scene - OK - OK
	public Scene editScene(String id, Scene scene) {
		
		String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
				.toArray(String[]::new);
		
		if (roles.length < 1)
			throw new NoSuchElement("No roles at all");
		
		if (sceneRepository.existsById(id)) {
			return sceneRepository.save(scene);
		}
		
		throw new NoSuchElement("Scene " + id + " does not exists!");
	}

	
	//delete scene - OK - OK
	public Scene deleteSceneById(String id) {
		
		String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
				.toArray(String[]::new);
		
		if (roles.length < 1)
			throw new NoSuchElement("No roles at all");
		
		Scene scene = this.fetch(id);
		
		sceneRepository.delete(scene);
		
		return scene;
	}
	
	
	
	
	
	
	
	
	
	

	
	//ini dummy scenes for testing
	public List<Scene> generate() {
		var scenes = Scene.generateScenes();
		for (var scene : scenes) {
			sceneRepository.save(scene);
		}
		return sceneRepository.findAll();
	}
	
	
	
	
	//get tags
	public List<SceneDTO> getByTags(List<String> tags) {

		String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
				.toArray(String[]::new);
		if (roles.length < 1)
			throw new NoSuchElement("No roles at all");

		return sceneRepository.findByTags(tags.toArray(String[]::new), roles).stream().map(SceneDTO::from)
				.collect(Collectors.toList());
	}
	
	//get keys
	public Set<KeyDTO> getAllKeys() {
//		String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
//				.toArray(String[]::new);
//		if (roles.length < 1)
//			throw new NoSuchElement("No roles at all");
//
//		Set<KeyDTO> keys = new LinkedHashSet<>();
//		for (var l1 : sceneRepository.getByRoles(roles)) {
//			keys.addAll(l1.getKeys().stream().map(KeyDTO::from).collect(Collectors.toList()));
//		}
//		return keys;
		
		return null;
	}

}
