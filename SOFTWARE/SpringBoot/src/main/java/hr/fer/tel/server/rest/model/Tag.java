package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import org.springframework.data.annotation.Id;

@Entity
@Table(name = "Tag")
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;

    public Tag(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}
