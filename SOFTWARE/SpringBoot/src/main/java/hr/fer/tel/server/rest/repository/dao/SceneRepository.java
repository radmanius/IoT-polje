package hr.fer.tel.server.rest.repository.dao;

import hr.fer.tel.server.rest.model.Scene;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SceneRepository extends JpaRepository<Scene, String> {

	//----------------Naprvit SQL Query
	
    //index po tagovima i rolama-DODATI
    @Query(value = "{$and: [{tags:{$in : ?0 }},{roles:{$in : ?1 }}]}")
    List<Scene> findByTags(String[] tags, String[] roles);

    
	//----------------Naprvit SQL Query

    //index po rolama-DODATI
    @Query(value = "{roles:{$in : ?0 }}")
    List<Scene> getByRoles(String[] roles);

 
}
