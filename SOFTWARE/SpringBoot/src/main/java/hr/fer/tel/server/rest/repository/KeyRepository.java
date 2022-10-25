package hr.fer.tel.server.rest.repository;

import hr.fer.tel.server.rest.model.Key;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyRepository extends MongoRepository<Key, String> {
}
