package hr.fer.tel.server.rest.repository.dao;

import hr.fer.tel.server.rest.model.Scene;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface SceneRepository extends JpaRepository<Scene, Long> {
    @Query(value="SELECT scene.* FROM ROLE INNER JOIN scene ON role.scene_id = scene.id WHERE role.name IN :roles", nativeQuery = true)
    Collection<Scene> dobijSceneSOvimRolama(@Param("roles") Collection<String> roles);
    
    
    @Query(value="SELECT scene.* FROM ROLE INNER JOIN scene ON role.scene_id = scene.id WHERE role.name IN ?1 AND scene.id = ?2", nativeQuery = true)
    Scene dobijSceneSOvimRolamaiID(Collection<String> roles, Long findID);
    
    
}
