package hr.fer.tel.server.rest;

import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.service.KeyService;
import hr.fer.tel.server.rest.service.SceneService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartupRunner implements CommandLineRunner {
	protected final Log logger = LogFactory.getLog(getClass());

	@Autowired
	SceneService sceneService;

	@Autowired
	KeyService keyService;

	@Override
	public void run(String... args) throws Exception {
		logger.info("Starting CommandLineRunner Init DatabBase!!");

		try {
			Key keyFerit = new Key("influxFerit",
					"kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==", true);
			Key keyFer = new Key("influxFer",
					"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);
			
			keyService.ProbaAdd(keyFer);
			keyService.ProbaAdd(keyFerit);

			sceneService.generate();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Scene generate FAILD");
		}
	}

}
