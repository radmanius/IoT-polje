package hr.fer.tel.server.rest.repository;

import hr.fer.tel.server.rest.model.Scene;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SceneRepository extends MongoRepository<Scene, String> {


    //index po tagovima i rolama-DODATI
    @Query(value = "{$and: [{tags:{$in : ?0 }},{roles:{$in : ?1 }}]}")
    List<Scene> findByTags(String[] tags, String[] roles);

    //index po rolama-DODATI
    @Query(value = "{roles:{$in : ?0 }}")
    List<Scene> getByRoles(String[] roles);



}
