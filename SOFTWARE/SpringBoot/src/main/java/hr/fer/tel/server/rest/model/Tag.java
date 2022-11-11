package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    private Scene2 scene;
    
    public Tag() {
    	
    }

    public Tag(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

	public void setScene(Scene2 sc) {
		this.scene=sc;
	}


}
