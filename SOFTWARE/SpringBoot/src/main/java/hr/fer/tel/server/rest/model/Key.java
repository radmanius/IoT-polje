package hr.fer.tel.server.rest.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import hr.fer.tel.server.rest.dto.KeyDTO;

@Entity
@Table(name = "Key")
public class Key {

    @Id
    @GeneratedValue
    private long id;
    
    private String name;
    
    private String value;
    
    private boolean canDelete;
	
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene2 scene;
    
    public Key(String name, String value, boolean canDelete) {
		super();
		this.name = name;
		this.value = value;
		this.canDelete = canDelete;
	}
    

	public Key() {
		
	}
	
	public Key(KeyDTO dto) {
		this.name = dto.getName();
		this.value = dto.getValue();
		this.canDelete = dto.isCanDelete();
	}

	public void setScene(Scene2 scene) {
		this.scene = scene;
	}
    
    public Scene2 getScene() {
		return this.scene;
	}
    
//	public void setScene(Scene scene) {
//		this.scene = scene;
//	}
//    
//    public Scene getScene() {
//		return this.scene;
//	}


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


	public String getValue() {
		return value;
	}


	public void setValue(String value) {
		this.value = value;
	}


	public boolean isCanDelete() {
		return canDelete;
	}


	public void setCanDelete(boolean canDelete) {
		this.canDelete = canDelete;
	}
    
    

}
