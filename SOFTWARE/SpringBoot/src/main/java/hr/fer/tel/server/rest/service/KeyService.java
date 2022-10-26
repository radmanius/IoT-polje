package hr.fer.tel.server.rest.service;

import hr.fer.tel.server.rest.dto.KeyDTO;
import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.repository.dao.KeyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public class KeyService {

    private final KeyRepository keyRepository;
    private final SceneService sceneService;

    @Autowired
    public KeyService(KeyRepository keyRepository, SceneService sceneService) {
        this.keyRepository = keyRepository;
        this.sceneService = sceneService;
    }

    public List<Key> generate() {
        Key influxDbToken = new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "");
        return keyRepository.saveAll(List.of(influxDbToken));
    }

    public Set<KeyDTO> getAll(){
        return sceneService.getAllKeys();
    }
}
