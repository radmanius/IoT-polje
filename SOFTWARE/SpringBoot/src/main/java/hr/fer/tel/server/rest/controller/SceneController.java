package hr.fer.tel.server.rest.controller;

import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.SceneDTO;
import hr.fer.tel.server.rest.model.ShortScene;
import hr.fer.tel.server.rest.service.SceneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
public class SceneController {

    private final SceneService sceneService;

    @Autowired
    public SceneController(SceneService sceneService) {
        this.sceneService = sceneService;
    }

    @RolesAllowed( "iot-write")
    @PostMapping("/scene/add")
    public ResponseEntity<Scene> sceneAdd(@RequestBody Scene scene){
        return ResponseEntity.status(201).body(sceneService.addScene(scene));
    }

    @RolesAllowed( "iot-write")
    @PostMapping("/scene/edit")
    public ResponseEntity<Scene> sceneEdit(@RequestBody Scene scene){
        return ResponseEntity.ok(sceneService.editScene(scene));
    }

    @RolesAllowed( "iot-read")
    @GetMapping("/scene")
    public ResponseEntity<List<ShortScene>> getScenes(){

        List<ShortScene> scenes = sceneService.getAllScenes().stream()
            .map(ShortScene::from)
            .toList();
        return ResponseEntity.ok(scenes);
    }

    @RolesAllowed( "iot-read")
    @PostMapping("/scene")
    public ResponseEntity<List<ShortScene>> getSceneByTags(@RequestBody List<String> tags){

      return ResponseEntity.ok(sceneService.getByTags(tags).stream()
          .map(ShortScene::from)
          .toList());
    }

    @RolesAllowed( "iot-read")
    @GetMapping("/scene/{id}")
    public ResponseEntity<SceneDTO> getSceneById(@PathVariable String id){

        return ResponseEntity.ok(sceneService.getById(id));

    }
}
