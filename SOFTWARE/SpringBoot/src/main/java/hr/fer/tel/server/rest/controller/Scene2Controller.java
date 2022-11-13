package hr.fer.tel.server.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import hr.fer.tel.server.rest.dto.Scene2DTO;
import hr.fer.tel.server.rest.model.Scene2;
import hr.fer.tel.server.rest.service.Scene2Service;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/scene2")
public class Scene2Controller {
	
	@Autowired
	private Scene2Service service;
	
	@PutMapping("/scene")
	public ResponseEntity<Scene2> sceneEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);
		
		Scene2DTO scena = new Scene2DTO();
		
		
		try {
			scena = objectMapper.readValue(model, scena.getClass());
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		Scene2 scena2 = new Scene2(scena);
		service.ProbaAddScene(scena2);

		
		return ResponseEntity.status(HttpStatus.OK).body(scena2);
	}

}
