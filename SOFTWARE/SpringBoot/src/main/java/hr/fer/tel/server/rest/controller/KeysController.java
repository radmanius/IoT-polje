package hr.fer.tel.server.rest.controller;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.model.ShortKeyDTO;
import hr.fer.tel.server.rest.service.KeyService;

@RestController
@RequestMapping("/rest2")
public class KeysController {

  @Autowired
  private KeyService keyService;


//  @RolesAllowed("iot-read")
  @GetMapping("/keys")
  public ResponseEntity<Collection<ShortKeyDTO>> getKeys() {
    Set<ShortKeyDTO> result = keyService.getAll().stream()
      .map(k -> k.toShortKeyDTO())
      .collect(Collectors.toSet());

    return ResponseEntity.ok(result);
  }
  
	@DeleteMapping("/key/{token}")
	public ResponseEntity<String> deleteKey(@PathVariable("token") String token){
		
		if(keyService.checkIfExists(token) == false) {
			ResponseEntity.status(HttpStatus.NOT_FOUND);
		}
		
		boolean isDeleted = keyService.ProbaDeleteKeyById(token);
		
		//Check if deleted
		if(isDeleted == false) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(token);

	}
	
	@PutMapping("/key/{token}")
	public ResponseEntity<String> editKey(@RequestBody String newToken, @PathVariable("token") String oldToken){
		
		//Check if scene exists
		if(keyService.checkIfExists(oldToken) == false) {
			ResponseEntity.status(HttpStatus.NOT_FOUND);
		}
		
		boolean isEdited = keyService.editKey(oldToken, newToken);
		
		if(isEdited == false) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.status(HttpStatus.OK).body(newToken);
	}
	
	@PostMapping("/keys")
	public ResponseEntity<String> addKey(@RequestBody Key key){
		
		//Check if scene exists
		if(keyService.checkIfExists(key.getValue()) == true) {
			ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("key already exists");
		}
				
		keyService.ProbaAdd(key);

		return ResponseEntity.status(HttpStatus.OK).body(key.getValue());
	}
	
	

}
