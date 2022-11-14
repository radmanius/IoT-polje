package hr.fer.tel.server.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.tel.server.rest.model.Tag;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class TagService {

//	@Autowired
//    private final SceneService sceneService;
//
//    @Autowired
//    public TagService(SceneService sceneService) {
//        this.sceneService = sceneService;
//    }
//
//    public Set<Tag> getAll() {
//
//        Set<Tag> set = new LinkedHashSet<>();
//        var scenes = sceneService.getAllScenes();
//        for(var scene : scenes)
//            set.addAll(scene.getTags());
//
//        return set;
//    }
}
