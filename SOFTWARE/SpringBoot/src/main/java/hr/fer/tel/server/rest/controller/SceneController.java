package hr.fer.tel.server.rest.controller;

import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.ShortScene;
import hr.fer.tel.server.rest.service.SceneService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SceneController {

	@Autowired
	private SceneService sceneService;

	// returns list of all scenes - OK - OK
//	@GetMapping("/scene")
//	public ResponseEntity<List<ShortScene>> getScenes() { // vraca sve scene
//
//		List<ShortScene> scenes = sceneService.getAllScenes().stream().map(s -> ShortScene.from(s)).toList();
//		// ili ShortScene::from
//		return ResponseEntity.ok(scenes);
//	}

	@GetMapping("/scene")
	public ResponseEntity<List<ShortScene>> getScenes() { // vraca sve scene

		List<ShortScene> scenes = sceneService.ProbaGetAllScenes().stream().map(s -> ShortScene.from(s)).toList();
		return ResponseEntity.status(HttpStatus.OK).body(scenes);
	}

	// create new scene - OK - OK
//	@RolesAllowed("iot-write")
//	@PostMapping("/scene")
//	public ResponseEntity<Scene> sceneAdd(@RequestBody Scene scene) {
//		Scene saved = sceneService.addScene(scene);
//		return ResponseEntity.status(201).body(saved);
//	}

	@PostMapping("/scene")
	public ResponseEntity<Scene> sceneAdd(@RequestBody Scene scene) {
		Scene saved = sceneService.ProbaAddScene(scene);
		return ResponseEntity.status(HttpStatus.OK).body(saved);
	}

	// get one scene - OK - OK
//	@GetMapping("/scene/{id}")
//	public ResponseEntity<Scene> getSceneById(@PathVariable("id") String id) {
//		Scene scene = sceneService.getById(id);
//		return ResponseEntity.ok(scene);
//	}

	@GetMapping("/scene/{id}")
	public ResponseEntity<Scene> getSceneById(@PathVariable("id") Long id) {
		Scene scene = sceneService.probaGetById(id);
		return ResponseEntity.status(HttpStatus.OK).body(scene);
	}

	// update one scene - OK - OK
//	@RolesAllowed("iot-write")
//	@PutMapping("/scene/{id}")
//	public ResponseEntity<Scene> sceneEdit(@PathVariable("id") String id, @RequestBody Scene scene) {
//		Scene saved = sceneService.editScene(id, scene);
//		return ResponseEntity.ok(saved);
//	}
	@PutMapping("/scene/{id}")
	public ResponseEntity<Scene> sceneEdit(@PathVariable("id") Long id, @RequestBody Scene scene) {
		Scene saved = sceneService.probaEditScene(id, scene);
		return ResponseEntity.status(HttpStatus.OK).body(saved);
	}

	// delete scene - OK - OK
//	@RolesAllowed("iot-write")
//	@DeleteMapping("/scene/{id}")
//	public ResponseEntity<Scene> deleteSceneById(@PathVariable("id") String id) {
//		Scene scene = sceneService.deleteSceneById(id);
//		return ResponseEntity.ok(scene);
//	}
	@DeleteMapping("/scene/{id}")
	public ResponseEntity<Scene> deleteSceneById(@PathVariable("id") Long id) {
		Scene scene = sceneService.ProbaDeleteSceneById(id);
		return ResponseEntity.status(HttpStatus.OK).body(scene);

	}
}
