package hr.fer.tel.server.rest;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import hr.fer.tel.server.rest.service.KeyService;
import hr.fer.tel.server.rest.service.SceneService;


//Ovo je obican init dummy vrijednostima za testiranje


@SpringBootApplication
public class RestServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestServerApplication.class, args);
	}

	
	//U SceneService je .generate metoda
	//Ona zove Scene static metodu koja napravi cijelu scenu
	//Htio bih da osposobite static metodu da uspijesno doda scenu u bazu podataka
	//Za sada keyService zanemarimo
	@Bean
//	@Profile("dev")
	public CommandLineRunner init(SceneService sceneService, KeyService keyService){
		sceneService.generate();
//		keyService.generate();
		return null;
	}
}
