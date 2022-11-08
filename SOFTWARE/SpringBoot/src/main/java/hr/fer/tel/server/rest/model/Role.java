package hr.fer.tel.server.rest.model;

import javax.persistence.*;

import org.checkerframework.checker.nullness.qual.NonNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Role")
public class Role {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Scene scene;

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
    
//    @JsonIgnore
    public void setScene(Scene scene) {
		this.scene = scene;
	}
    
//    @JsonIgnore
    public Scene getScene() {
    	return this.scene;
    }

    @Override
    public String toString() {
        return getName();
    }
}
