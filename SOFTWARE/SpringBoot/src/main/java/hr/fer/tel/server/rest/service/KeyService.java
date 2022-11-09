package hr.fer.tel.server.rest.service;

import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.repository.dao.KeyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public class KeyService {
	
	@Autowired
    private final KeyRepository keyRepository;
	
	@Autowired
    private final SceneService sceneService;

    @Autowired
    public KeyService(KeyRepository keyRepository, SceneService sceneService) {
        this.keyRepository = keyRepository;
        this.sceneService = sceneService;
    }

    
    
    
    
    
    
    
    
    
    
}
