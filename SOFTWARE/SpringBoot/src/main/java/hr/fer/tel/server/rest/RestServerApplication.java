package hr.fer.tel.server.rest;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


//Ovo je obican init dummy vrijednostima za testiranje


@SpringBootApplication
public class RestServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestServerApplication.class, args);
	}

//	@Bean @Profile("dev")
//	public CommandLineRunner init(SceneService sceneService, KeyService keyService){
//		sceneService.generate();
//		keyService.generate();
//		return null;
//	}
}
