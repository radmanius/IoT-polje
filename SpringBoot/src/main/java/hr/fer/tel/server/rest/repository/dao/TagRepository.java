package hr.fer.tel.server.rest.repository.dao;

import hr.fer.tel.server.rest.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
	
    @Query(value = "SELECT name, id, scene_id FROM (SELECT *, row_number() OVER (PARTITION BY name ORDER BY id) row_number FROM tag) rows where row_number = 1", nativeQuery = true)
    List<Tag> getAllTags();
}
