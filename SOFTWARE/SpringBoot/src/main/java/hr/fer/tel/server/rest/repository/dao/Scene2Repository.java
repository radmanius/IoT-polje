package hr.fer.tel.server.rest.repository.dao;

import hr.fer.tel.server.rest.model.Scene2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Scene2Repository extends JpaRepository<Scene2, Long> {


}
