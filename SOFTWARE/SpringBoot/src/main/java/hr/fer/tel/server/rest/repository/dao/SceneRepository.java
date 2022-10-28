package hr.fer.tel.server.rest.repository.dao;

import hr.fer.tel.server.rest.model.Scene;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SceneRepository extends JpaRepository<Scene, String> {

	//----------------Naprvit SQL Query
	
    //index po tagovima i rolama-DODATI
    //@Query(value = "{$and: [{tags:{$in : ?0 }},{roles:{$in : ?1 }}]}")
    @Query(value = "SELECT * FROM Scene AS s WHERE s.tags IN :tags_input AND s.roles IN :roles_input")
    List<Scene> findbyTags(@Param("tags_input") String[] tags, @Param("roles_input") String[] roles);
    //List<Scene> findByTags(String[] tags, String[] roles);

    
    @Query(value = "SELECT * FROM Scene AS s WHERE s.roles IN :roles_input")
    List<Scene> getByRoles(@Param("roles_input") String[] roles);

    
//    @Query("SELECT g FROM SGROUP g WHERE :s MEMBER OF g.members")
//    Optional<Group> findByMember(@Param("s") Student student);
 
}
