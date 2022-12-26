package hr.fer.tel.server.rest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.lang.model.element.Element;

import hr.fer.tel.server.rest.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import hr.fer.tel.server.rest.dto.*;
import hr.fer.tel.server.rest.service.KeyService;
import hr.fer.tel.server.rest.service.SceneService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/rest2")
public class SceneController {
	
	@Autowired
	private SceneService service;
	
	  @Autowired
	  private KeyService keyService;
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	
	@PutMapping("/scene/{id}")
	public ResponseEntity<SceneDTO> sceneEdit(@RequestBody String model, @PathVariable("id") Long id) throws JsonMappingException, JsonProcessingException {
		
		//Check if scene exists
		if(service.checkIfExists(id) == false) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();
		
		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		}catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
		Scene scene= new Scene(sceneDTO);
		scene.setKeys(null);
		
		Map<String, KeyDTO> result = keyService.getAll().stream()
			      .map(k -> k.tokeyDTO())
			      .collect(Collectors.toMap( (KeyDTO variable) ->  variable.getName(), (KeyDTO variable) -> variable));
		
		
		///////////////////////////////////
		
		for(String keyDto: sceneDTO.getKeys()) {
			KeyDTO key = result.get(keyDto);
			if(key == null) {
				//key does not exists
				continue;
			}
			
			
			
		}
		
		service.ProbaAddScene(scene);

		return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);
	}
	
	@PostMapping("/scene")
	public ResponseEntity<SceneDTO> addEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {
		
		
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();
		
		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		}catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
		//Check if scene exists
		if(service.checkIfExists(sceneDTO.getId()) == true) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
		Scene scene= new Scene(sceneDTO);
		
		service.ProbaAddScene(scene);

		return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);
	}
	
	@GetMapping("/scene")
	public ResponseEntity<List<ShortSceneDTO>> getScenes(){
		
		List<Scene> list = service.getAllScenes();
		
		List<ShortSceneDTO> shortScenes = new ArrayList<>();
		
		for(Scene scene: list) {
			shortScenes.add(ShortSceneDTO.of(scene));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(shortScenes);
	}
	
	@RolesAllowed("iot-read")
	@GetMapping("/scene2")
	public ResponseEntity<List<ShortSceneDTO>> getScenes2(){
		
		List<Scene> list = service.getAllScenesAuthorize2();
		
		List<ShortSceneDTO> shortScenes = new ArrayList<>();
		
		for(Scene scene: list) {
			shortScenes.add(ShortSceneDTO.of(scene));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(shortScenes);
	}
	
	@GetMapping("/scene/{id}")
	public ResponseEntity<SceneDTO> getScene(@PathVariable("id") Long id){
		
		Scene scene = service.probaGetById(id);

		SceneDTO sceneDTO = SceneDTO.of(scene);

		return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);
	}
	
	@DeleteMapping("/scene/{id}")
	public ResponseEntity<String> deleteScene(@PathVariable("id") Long id){
		
		if(service.checkIfExists(id) == false) {
			ResponseEntity.status(HttpStatus.NOT_FOUND);
		}
		
		Scene scene = service.ProbaDeleteSceneById(id);
		
		//Check if deleted
		if(scene == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
		return ResponseEntity.status(HttpStatus.OK).body("deleted scene with id: " + id);

	}
	

}
