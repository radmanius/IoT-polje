package hr.fer.tel.server.rest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import hr.fer.tel.server.rest.service.Scene2Service;
import hr.fer.tel.server.rest.service.SceneService;

@Component
public class ApplicationStartupRunner implements CommandLineRunner {
	protected final Log logger = LogFactory.getLog(getClass());
	
	@Autowired
	SceneService sceneService;
	
	@Autowired 
	Scene2Service scene2Service;

	@Override
	public void run(String... args) throws Exception {
		logger.info("Starting CommandLineRunner Init DatabBase!!");
		
		try{
			//sceneService.generate();
			
			
			
		}catch(Exception e){
			e.printStackTrace();
			System.err.println("Scene generate FAILD");
		}
	}


}