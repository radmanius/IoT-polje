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
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SceneService {

    private final SceneRepository sceneRepository;

    @Autowired
    public SceneService(SceneRepository sceneRepository) {
        this.sceneRepository = sceneRepository;
    }

    public List<SceneDTO> getAllScenes(){

        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toArray(String[]::new);
        if(roles.length < 1)
            throw new NoSuchElement("No roles at all");

        return sceneRepository.getByRoles(roles).stream().map(SceneDTO::from).collect(Collectors.toList());
    }

    public List<Scene> generate() {
        var scenes = Scene.generateScenes();
        for(var scene : scenes){
            sceneRepository.save(scene);
        }
        return sceneRepository.findAll();
    }

    public SceneDTO getById(String id) {
        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toArray(String[]::new);
        if(roles.length < 1)
            throw new NoSuchElement("No roles at all");

        var scene = sceneRepository.getByRoles(roles).stream().filter(sc -> sc.getId().equals(id)).findAny().orElseThrow(()->
             new NoSuchElement("Access denied, no required roles for given scene id: " + id)
        );
        return new SceneDTO(scene.getId(), scene.getTitle(), scene.getSubtitle(),scene.getPictureLink(), scene.getLayout(),scene.getTags(), scene.getViews());
    }

    public List<SceneDTO> getByTags(List<String> tags) {

        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toArray(String[]::new);
        if(roles.length < 1)
            throw new NoSuchElement("No roles at all");

        return sceneRepository.findByTags(tags.toArray(String[]::new), roles)
                .stream()
                .map(SceneDTO::from)
                .collect(Collectors.toList());
    }

    public Set<KeyDTO> getAllKeys(){
        String[] roles = KeycloakSecurityConfig.getRoles().stream().map(role -> role.toString().split("_")[1]).toArray(String[]::new);
        if(roles.length < 1)
            throw new NoSuchElement("No roles at all");

        Set<KeyDTO> keys = new LinkedHashSet<>();
        for(var l1 : sceneRepository.getByRoles(roles)){
            keys.addAll(l1.getKeys().stream().map(KeyDTO::from).collect(Collectors.toList()));
        }
        return keys;
    }


    public Scene addScene(Scene scene){
        if(!sceneRepository.existsById(scene.getId())){
            return sceneRepository.save(scene);
        }

        throw new NoSuchElement("Scene "+ scene.getId() + " already exists!");
    }

    public Scene editScene(Scene scene){
        if(sceneRepository.existsById(scene.getId())){
            return sceneRepository.save(scene);
        }
        throw new NoSuchElement("Scene " + scene.getId() + " does not exists!");
    }
}
