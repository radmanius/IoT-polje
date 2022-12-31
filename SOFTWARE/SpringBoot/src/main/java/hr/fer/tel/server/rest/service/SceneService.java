package hr.fer.tel.server.rest.service;

import hr.fer.tel.server.rest.model.*;
import hr.fer.tel.server.rest.repository.dao.SceneRepository;
import hr.fer.tel.server.rest.utils.KeycloakSecurityConfig;
import hr.fer.tel.server.rest.utils.NoSuchElement;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class SceneService {

    @Autowired
    private SceneRepository sceneRepository;

    //Find and return scene by id without roles
    public Scene fetch(Long id) {
        return findById(id).orElseThrow(() -> new EntityMissingException(Scene.class, id));
    }

    //Find and return scene by id
    public Optional<Scene> findById(Long id) {
        return sceneRepository.findById(id);
    }
    
    public boolean checkIfExists(Long id) {
    	return findById(id).isPresent();
    }


    public Scene getByIdAuthorize(Long id) {

  	  HashSet<String> rolesKeyCloak = new HashSet<>(KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toList());


  	  if (rolesKeyCloak.size() < 1)
  		  return null;

        Scene output = sceneRepository.dobijSceneSOvimRolamaiID(rolesKeyCloak, id);

//        Scene2 scene = sceneRepository.getByRoles(ouput).stream().filter(sc -> Long.valueOf(sc.getId()).equals(id)).findAny()
//                .orElseThrow(() -> new NoSuchElement("Access denied, no required roles for given scene id: " + id));

        return output;
    }

    public Scene probaGetById(Long id) {
        Optional<Scene> scene = sceneRepository.findById(id);

        return scene.orElse(null);
    }

    
    public Scene AddSceneAuthorize(Scene scene) {
    	
    	  HashSet<String> rolesKeyCloak = new HashSet<>(KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toList());

      	  if (rolesKeyCloak.size() < 1) {
      		throw new NoSuchElement("Non authorized");     		  
      	  }
      	  
	       if (!sceneRepository.existsById(scene.getId())) {
	           return sceneRepository.save(scene);
	       }

	        throw new NoSuchElement("Scene " + scene.getId() + " does alreday exists!");
	        
    }



    public Scene ProbaAddScene(Scene scene) {
        if (!sceneRepository.existsById(scene.getId())) {
            return sceneRepository.save(scene);
        }

        throw new NoSuchElement("Scene " + scene.getId() + " does alreday exists!");
    }


    public Scene editSceneAuthorize(Long id, Scene scene) {

        HashSet<String> rolesKeyCloak = new HashSet<>(KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toList());

        if (rolesKeyCloak.size() < 1)
      		throw new NoSuchElement("Non authorized");     		  

        if (sceneRepository.existsById(id)) {
            return sceneRepository.save(scene);
        }

        throw new NoSuchElement("Scene " + id + " does not exists!");
    }

    public Scene probaEditScene(Long id, Scene scene) {

        if (sceneRepository.existsById(id)) {
            return sceneRepository.save(scene);
        }

        throw new NoSuchElement("Scene " + id + " does not exists!");
    }

    public Scene deleteSceneByIdAuthorize(Long id) {

        HashSet<String> rolesKeyCloak = new HashSet<>(KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toList());

        if (rolesKeyCloak.size() < 1)
      		throw new NoSuchElement("Non authorized");     		  

        Scene scene = this.fetch(id);

        sceneRepository.delete(scene);

        return scene;
    }

    public Scene ProbaDeleteSceneById(Long id) {

        Scene scene = this.fetch(id);

        sceneRepository.delete(scene);

        return scene;
    }
    
    public List<Scene> getAllScenes(){
    	return sceneRepository.findAll();
    }

  public List<Scene> getAllScenesAuthorize() {

	  HashSet<String> rolesKeyCloak = new HashSet<>(KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toList());
      
      if (rolesKeyCloak.size() < 1)
         return new ArrayList<>();

      List<Scene> list = new ArrayList<>();
      
      for(Scene scene : sceneRepository.findAll()) {
    	  List<String> sceneRoles = scene.getRoles().stream().map((role) -> role.getName()).toList();
    	  
    	  if(containsElement(sceneRoles, rolesKeyCloak) == true) {
    		  list.add(scene);
    	  }
      }
      
      return list;
  }
  
  private boolean containsElement(List<String> sceneRoles, HashSet<String> rolesKeyCloak) {
	  for(String role: sceneRoles) {
		  if(rolesKeyCloak.contains(role)) {
			  return true;
		  }
	  }
	  return false;
  }


  public List<Scene> getAllScenesAuthorize2() {
      HashSet<String> rolesKeyCloak = new HashSet<>(KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toList());

      if (rolesKeyCloak.size() < 1)
          return new ArrayList<>();

      List<Scene> list = sceneRepository.dobijSceneSOvimRolama(rolesKeyCloak).stream().toList();

      return list;
  }
  
  





    //ini dummy scenes for testing
    public List<Scene> generate() {
        var scenes = Scene.generateScenes();
        for (var scene : scenes) {
            sceneRepository.save(scene);
        }
        return sceneRepository.findAll();
    }

    //get keys
//	public Set<KeyDTO> getAllKeys() {
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
//
//		return null;
//	}

}
