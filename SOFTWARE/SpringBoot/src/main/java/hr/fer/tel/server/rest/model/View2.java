package hr.fer.tel.server.rest.model;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

import hr.fer.tel.server.rest.dto.MesurmentViewDTO;
import hr.fer.tel.server.rest.dto.View2DTO;


@Entity
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
//@DiscriminatorColumn(name = "type")
@Inheritance(strategy = InheritanceType.JOINED)
public class View2 {

    @Id
    @GeneratedValue
	private long id;

    private String title;

	private int proba = 6;

    private String viewType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene2 scene;

    public View2(View2DTO dto){
    	this.id = dto.getId();
    	this.title = dto.getTitle();
		this.proba = 11;
    	this.viewType = dto.getViewType();
    }

//    public View2(View2DTO dto){
//    	this.title = dto.getTitle();
//    	this.viewType = dto.getViewType();
//    }

	public int getProba() {
		return 32;
	}

	public void setProba(int proba) {
		this.proba = proba;
	}

	public View2() {
		// TODO Auto-generated constructor stub
	}

	public View2(long id, String title, String viewType) {
		this.id = id;
		this.title = title;
		this.proba = 23;
		this.viewType = viewType;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public Scene2 getScene() {
		return scene;
	}

	public void setScene(Scene2 scene) {
		this.scene = scene;
	}
}
