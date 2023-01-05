package hr.fer.tel.server.rest.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.repository.dao.KeyRepository;

@Service
public class KeyService {

	@Autowired
	private KeyRepository keyRepository;

	@Autowired
	private SceneService sceneService;

	public Optional<Key> findById(Long value) {
		return keyRepository.findById(value);
	}

	public boolean checkIfExists(String token) {
		List<Key> keys = keyRepository.findAll();

		for (Key key : keys) {
			if (key.getName().equals(token)) {
				return true;
			}
		}

		return false;

	}

	public Set<Key> getAll() {
		return keyRepository.findAll().stream().collect(Collectors.toSet());
	}

	public List<String> getAllKeyNames() {
		return keyRepository.findAll().stream().map(key -> key.getName()).toList();
	}

	public boolean ProbaDeleteKeyById(String token) {

		List<Key> keys = keyRepository.findAll();
		String keyName = null;

		for (Key key : keys) {
			if (key.getValue().equals(token)) {
				keyName = key.getName();

				for (Scene scene : sceneService.getAllScenes()) {
					if (scene.getKeyNames().contains(keyName)) {
						scene.getKeyNames().remove(keyName);
//						sceneService.editSceneAuthorize(scene.getId(), scene);
						sceneService.probaEditScene(scene.getId(), scene);
					}
				}

				keyRepository.delete(key);
			}
		}

		return keys != null;
	}

	public Key ProbaAdd(Key key) {

		keyRepository.save(key);

		return key;
	}

	public boolean editKey(String oldToken, String newToken) {

		List<Key> keys = keyRepository.findAll();

		for (Key key : keys) {
			if (key.getName().equals(oldToken)) {
				key.setValue(newToken);
				keyRepository.save(key);
			}
		}

		return keys != null;

	}

}
