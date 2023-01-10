package hr.fer.tel.server.rest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.security.RolesAllowed;

import hr.fer.tel.server.rest.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

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

	@PutMapping("/scene/{id}")
	public ResponseEntity<?> sceneEdit(@RequestBody String model, @PathVariable("id") Long id)
			throws JsonMappingException, JsonProcessingException {

		// Check if scene exists
		if (service.checkIfExists(id) == false) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();

		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		} catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		Scene scene = new Scene(sceneDTO);
		scene.setId(id);

		List<String> keyNames = keyService.getAllKeyNames();

		if (keyNames.containsAll(scene.getKeyNames())) {
			service.probaEditScene(id, scene);

			return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);

		} else {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("given key does not exist in database");

		}


	}

	@PutMapping("/scene2/{id}")
	@RolesAllowed("iot-read")
	public ResponseEntity<?> sceneEdit2(@RequestBody String model, @PathVariable("id") Long id)
			throws JsonMappingException, JsonProcessingException {

		// Check if scene exists
		if (service.checkIfExists(id) == false) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();

		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		} catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		Scene scene = new Scene(sceneDTO);
		scene.setId(id);

		List<String> keyNames = keyService.getAllKeyNames();

		if (keyNames.containsAll(scene.getKeyNames())) {
			service.editSceneAuthorize(id, scene);

			return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);

		} else {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("given key does not exist in database");

		}

	}

	@PostMapping("/scene")
	public ResponseEntity<?> addEdit(@RequestBody String model) throws JsonMappingException, JsonProcessingException {

		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();

		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		} catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		// Check if scene exists
		if (service.checkIfExists(sceneDTO.getId()) == true) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		Scene scene = new Scene(sceneDTO);

		List<String> keyNames = keyService.getAllKeyNames();

		if (keyNames.containsAll(scene.getKeyNames())) {
			service.ProbaAddScene(scene);

			return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);

		} else {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("given key does not exist in database");

		}
	}

	@PostMapping("/check/scene")
	public ResponseEntity<String> checkPayload(@RequestBody String model) throws RestClientException {

		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();

		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		} catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		Scene scene = new Scene(sceneDTO);
		
		ResponseEntity<String> httpResponse = null;

		for (View tmp : scene.getViews()) {
			if (tmp instanceof ActuationView) {
				tmp = (ActuationView) tmp;
				ActuationForm form = ((ActuationView) tmp).getForm();

//	             "headers": {
//	                    "Accept": "application/csv",
//	                    "Content-type": "application/vnd.flux",
//	                    "Authorization": "Token {{influxFerit}}"
//	                },
				// influxFerit je key, trebaš ga dohvatit iz keyservica

				Request req1 = form.getDefaultValuesRequest();
				Map<String, String> headers1 = req1.getHeaders();
				String payload1 = req1.getPayload();
				String uri1 = req1.getUri();

				RestTemplate template = new RestTemplate();
				HttpHeaders headers = new HttpHeaders();
				
				for(Entry<String, String> ent : headers1.entrySet()) {
					headers.set(ent.getKey(), ent.getValue());
				}
				HttpEntity<String> request = new HttpEntity<>(payload1, headers);
				try {
					httpResponse = template.exchange(uri1, HttpMethod.POST, request, String.class);
				} catch (RestClientException e) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
				}
				
				if (httpResponse.getStatusCode() != HttpStatus.OK) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
				}
				
				
				

				// Provjeri je li valid, poslat upit kao u postmanu, ako vrati podatke onda radi

				

				// Provjeri je li valid
			}

			if (tmp instanceof MesurmentView) {
				tmp = (MesurmentView) tmp;
				MeasurmentSelectForm form2 = ((MesurmentView) tmp).getSelectForm();

				Request req1 = form2.getSubmitSelectionRequest();
				Map<String, String> headers1 = req1.getHeaders();
				String payload1 = req1.getPayload();
				String uri1 = req1.getUri();

				RestTemplate template = new RestTemplate();
				HttpHeaders headers = new HttpHeaders();
				
				for(Entry<String, String> ent : headers1.entrySet()) {
					headers.set(ent.getKey(), ent.getValue());
				}
				HttpEntity<String> request = new HttpEntity<>(payload1, headers);
				try {
					httpResponse = template.exchange(uri1, HttpMethod.POST, request, String.class);
				} catch (RestClientException e) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
					
				}
				
				if (httpResponse.getStatusCode() != HttpStatus.OK) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("false");
				}

				// Provjeri je li valid, poslat upit kao u postmanu, ako vrati podatke onda radi

				// Provjeri je li valid

			}

		}
		return ResponseEntity.status(HttpStatus.OK).body("true");

	}

	@PostMapping("/scene2")
	@RolesAllowed("iot-read")
	public ResponseEntity<?> addEdit2(@RequestBody String model) throws JsonMappingException, JsonProcessingException {

		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);

		SceneDTO sceneDTO = new SceneDTO();

		try {
			sceneDTO = objectMapper.readValue(model, sceneDTO.getClass());
		} catch (Exception igornable) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		// Check if scene exists
		if (service.checkIfExists(sceneDTO.getId()) == true) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		Scene scene = new Scene(sceneDTO);

		List<String> keyNames = keyService.getAllKeyNames();

		if (keyNames.containsAll(scene.getKeyNames())) {
			service.AddSceneAuthorize(scene);

			return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);

		} else {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("given key does not exist in database");

		}
	}

	@GetMapping("/scene")
	public ResponseEntity<List<ShortSceneDTO>> getScenes() {

		List<Scene> list = service.getAllScenes();

		List<ShortSceneDTO> shortScenes = new ArrayList<>();

		for (Scene scene : list) {
			shortScenes.add(ShortSceneDTO.of(scene));
		}

		return ResponseEntity.status(HttpStatus.OK).body(shortScenes);
	}

	@RolesAllowed("iot-read")
	@GetMapping("/scene2")
	public ResponseEntity<List<ShortSceneDTO>> getScenes2() {

		List<Scene> list = service.getAllScenesAuthorize2();

		List<ShortSceneDTO> shortScenes = new ArrayList<>();

		for (Scene scene : list) {
			shortScenes.add(ShortSceneDTO.of(scene));
		}

		return ResponseEntity.status(HttpStatus.OK).body(shortScenes);
	}

	@GetMapping("/scene/{id}")
	public ResponseEntity<SceneDTO> getScene(@PathVariable("id") Long id) {

		Scene scene = service.probaGetById(id);

		if (scene == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		SceneDTO sceneDTO = SceneDTO.of(scene);

		return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);
	}

	@GetMapping("/scene2/{id}")
	@RolesAllowed("iot-read")
	public ResponseEntity<SceneDTO> getScene2(@PathVariable("id") Long id) {

		Scene scene = service.getByIdAuthorize(id);

		if (scene == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		SceneDTO sceneDTO = SceneDTO.of(scene);

		return ResponseEntity.status(HttpStatus.OK).body(sceneDTO);
	}

	@DeleteMapping("/scene/{id}")
	public ResponseEntity<String> deleteScene(@PathVariable("id") Long id) {

		if (service.checkIfExists(id) == false) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		Scene scene = service.ProbaDeleteSceneById(id);

		// Check if deleted
		if (scene == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		return ResponseEntity.status(HttpStatus.OK).body("deleted scene with id: " + id);

	}

	@DeleteMapping("/scene2/{id}")
	@RolesAllowed("iot-read")
	public ResponseEntity<String> deleteScene2(@PathVariable("id") Long id) {

		if (service.checkIfExists(id) == false) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		Scene scene = service.deleteSceneByIdAuthorize(id);

		// Check if deleted
		if (scene == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		return ResponseEntity.status(HttpStatus.OK).body("deleted scene with id: " + id);

	}

}
