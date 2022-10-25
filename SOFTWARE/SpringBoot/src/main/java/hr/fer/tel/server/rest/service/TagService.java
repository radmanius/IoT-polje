package hr.fer.tel.server.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class TagService {

    private final SceneService sceneService;

    @Autowired
    public TagService(SceneService sceneService) {
        this.sceneService = sceneService;
    }

    public Set<String> getAll() {

        Set<String> set = new LinkedHashSet<>();
        var scenes = sceneService.getAllScenes();
        for(var scene : scenes)
            set.addAll(scene.getTags());

        return set;
    }
}
