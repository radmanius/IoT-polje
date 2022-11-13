package hr.fer.tel.server.rest.service;

import hr.fer.tel.server.rest.dto.SceneDTO;
import hr.fer.tel.server.rest.model.*;
import hr.fer.tel.server.rest.repository.dao.Scene2Repository;
import hr.fer.tel.server.rest.utils.KeycloakSecurityConfig;
import hr.fer.tel.server.rest.utils.NoSuchElement;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class Scene2Service {

    @Autowired
    private Scene2Repository sceneRepository;

    //Find and return scene by id without roles
    public Scene2 fetch(Long id) {
        return findById(id).orElseThrow(() -> new EntityMissingException(Scene2.class, id));
    }

    //Find and return scene by id
    public Optional<Scene2> findById(Long id) {
        return sceneRepository.findById(id);
    }

    //get all scenesDTO - OK - OK

    //get scene by id defined by roles - OK - OK
    public Scene2 getById(String id) {

        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
                .toArray(String[]::new);

        if (roles.length < 1)
            throw new NoSuchElement("No roles at all");

        List<String> ouput = List.of(roles);

//        Scene2 scene = sceneRepository.getByRoles(ouput).stream().filter(sc -> Long.valueOf(sc.getId()).equals(id)).findAny()
//                .orElseThrow(() -> new NoSuchElement("Access denied, no required roles for given scene id: " + id));

        return null;
    }

    public Scene2 probaGetById(Long id) {
        Optional<Scene2> scene = sceneRepository.findById(id);

        return scene.orElse(null);
    }

    //add scene - OK - OK


    public Scene2 ProbaAddScene(Scene2 scene) {
//        System.err.println(scene);
//        System.err.println(scene.getId());

//        if (!sceneRepository.existsById(scene.getId())) {
            return sceneRepository.save(scene);
//        }

//        throw new NoSuchElement("Scene " + scene.getId() + " already exists!");
    }


    //edit scene - OK - OK
    public Scene2 editScene(Long id, Scene2 scene) {

        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
                .toArray(String[]::new);

        if (roles.length < 1)
            throw new NoSuchElement("No roles at all");

        if (sceneRepository.existsById(id)) {
            return sceneRepository.save(scene);
        }

        throw new NoSuchElement("Scene " + id + " does not exists!");
    }

    public Scene2 probaEditScene(Long id, Scene2 scene) {

        if (sceneRepository.existsById(id)) {
            return sceneRepository.save(scene);
        }

        throw new NoSuchElement("Scene " + id + " does not exists!");
    }


    //delete scene - OK - OK
    public Scene2 deleteSceneById(Long id) {

        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1])
                .toArray(String[]::new);

        if (roles.length < 1)
            throw new NoSuchElement("No roles at all");

        Scene2 scene = this.fetch(id);

        sceneRepository.delete(scene);

        return scene;
    }

    public Scene2 ProbaDeleteSceneById(Long id) {

        Scene2 scene = this.fetch(id);

        sceneRepository.delete(scene);

        return scene;
    }













    //ini dummy scenes for testing
    public List<Scene2> generate() {
//		Scene.test();
        var scenes = Scene2.generateScenes();
        for (var scene : scenes) {
            sceneRepository.save(scene);
        }
        return sceneRepository.findAll();
    }




    //get tags


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
