package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import hr.fer.tel.server.rest.dto.TagDTO;

import javax.persistence.*;

@Entity
@Table(name = "Tag")
public class Tag {

    @Id
    @GeneratedValue
    private long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene scene;

    public Tag() {

    }

    public Tag(String name) {
        this.name = name;
    }

    public Tag(TagDTO dto) {
        this.name = dto.getName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

//	public void setScene(Scene sc) {
//		this.scene=sc;
//	}

	public void setScene(Scene sc) {
		this.scene=sc;
	}


}
