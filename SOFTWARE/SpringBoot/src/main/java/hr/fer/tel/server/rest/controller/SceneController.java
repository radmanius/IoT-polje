package hr.fer.tel.server.rest.controller;

import hr.fer.tel.server.rest.dto.*;
import hr.fer.tel.server.rest.model.ActuationView;
import hr.fer.tel.server.rest.model.MeasurmentSelectForm;
import hr.fer.tel.server.rest.model.MesurmentView;
import hr.fer.tel.server.rest.model.Request;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.ShortScene;
import hr.fer.tel.server.rest.model.View2;
import hr.fer.tel.server.rest.service.SceneService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@CrossOrigin(origins = "http://localhost:8080")
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

//	@PostMapping("/scene")
//	public ResponseEntity<Scene> sceneAdd(@RequestBody Scene scene) {
//		Scene saved = sceneService.ProbaAddScene(scene);
//		return ResponseEntity.status(HttpStatus.OK).body(saved);
//	}
	
	@PostMapping("/scene")
	public BodyBuilder sceneAdd2(@RequestBody String model) {
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);
//		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

		ActuationView view2 = new ActuationView();
		 try {
			 view2 = objectMapper.readValue(model, ActuationView.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

//		
////		ObjectMapper 
		DocumentContext jsonContext = JsonPath.parse(model);
		
////		String accessToken = jsonContext.read("$['access_token']");
//		
//		var a = jsonContext.read("$['layout']");
//		
//		var b = jsonContext.read("$['title']");
//		
////		Map<String,Object> output = model.asMap();
//		
////		Map<String,String> output = model.getProperties();
////		var keys = output.keySet();
////		
////		System.out.println(Arrays.toString(keys.toArray()));
////		
		return ResponseEntity.status(HttpStatus.OK);
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
//	@PutMapping("/scene/{id}")
//	public ResponseEntity<Scene> sceneEdit(@PathVariable("id") Long id, @RequestBody Scene scene) {
//		Scene saved = sceneService.probaEditScene(id, scene);
//		return ResponseEntity.status(HttpStatus.OK).body(saved);
//	}
	
//	@PutMapping("/scene")
//	public BodyBuilder sceneEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {
//		ObjectMapper objectMapper = new ObjectMapper();
//		objectMapper.setSerializationInclusion(Include.NON_NULL);
//		
//		MesurmentView view1 = new MesurmentView();
//		
//		Map<String, String> mapper = new HashMap<>();
//		try {
//			view1 = objectMapper.readValue(model, MesurmentView.class);
//		}catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		
//		return ResponseEntity.status(HttpStatus.OK);
//	}
	
//	@PutMapping("/scene")
//	public BodyBuilder sceneEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {
//		ObjectMapper objectMapper = new ObjectMapper();
//		objectMapper.setSerializationInclusion(Include.NON_NULL);
//		
//		View2DTO neki = new View2DTO();
//		MesurmentViewDTO view1 = new MesurmentViewDTO();
//		ActuationViewDTO view2 = new ActuationViewDTO();
//		
//		List<View2DTO> views = List.of(view1, view2);
//		
//		Map<String, String> mapper = new HashMap<>();
//		try {
//			neki = objectMapper.readValue(model, neki.getClass());
//		}catch (Exception e) {
//			e.printStackTrace();
//		}
//		
//		if (neki instanceof MesurmentViewDTO) {
//			view1 = (MesurmentViewDTO) neki;
//		}
//
//		
//		return ResponseEntity.status(HttpStatus.OK);
//	}
	
	@PutMapping("/scene")
	public BodyBuilder sceneEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);
		
		Scene2DTO scena = new Scene2DTO();
		
		
		try {
			scena = objectMapper.readValue(model, scena.getClass());
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
		

		
		return ResponseEntity.status(HttpStatus.OK);
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
