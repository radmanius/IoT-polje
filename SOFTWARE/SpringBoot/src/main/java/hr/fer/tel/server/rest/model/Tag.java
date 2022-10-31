package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;
import javax.persistence.*;


@Entity
@Table(name = "Tag")
public class Tag {

    @Id
    @GeneratedValue
    private long id;
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private Scene scene;
    
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

}
