package hr.fer.tel.server.rest.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import hr.fer.tel.server.rest.dto.*;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.service.SceneService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/")
public class SceneController {
	
	@Autowired
	private SceneService service;
	
	@PutMapping("/scene")
	public ResponseEntity<Scene> sceneEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);
		
		SceneDTO scena = new SceneDTO();
		
		
		try {
			scena = objectMapper.readValue(model, scena.getClass());
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		Scene scena2 = new Scene(scena);
		service.ProbaAddScene(scena2);

		
		return ResponseEntity.status(HttpStatus.OK).body(scena2);
	}
	
	@GetMapping("/scene")
	public ResponseEntity<List<ShortSceneDTO>> getScenes(){
		List<Scene> lista = service.getAllScenes();
//		List<ShortSceneDTO> shortScenes = service.getAllScenes().stream().map(s -> ShortSceneDTO.of(s)).toList();
		List<ShortSceneDTO> shortScenes = new ArrayList<>();
		
		for(Scene scene: lista) {
			shortScenes.add(ShortSceneDTO.of(scene));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(shortScenes);
	}
	
	@GetMapping("/scene/{id}")
	public ResponseEntity<Scene> getScene(@PathVariable("id") Long id){

		Scene scene = service.probaGetById(id);
		
		return ResponseEntity.status(HttpStatus.OK).body(scene);
	}
	

}
