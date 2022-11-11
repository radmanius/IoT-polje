package hr.fer.tel.server.rest.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Role")
public class Role {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene2 scene;

    public Role() {

    }

    public Role(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public void setScene(Scene2 scene) {
		this.scene = scene;
	}
    
    public Scene2 getScene() {
    	return this.scene;
    }

    @Override
    public String toString() {
        return getName();
    }
}
