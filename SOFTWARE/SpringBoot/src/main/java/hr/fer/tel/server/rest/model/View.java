package hr.fer.tel.server.rest.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "View")
public class View {
	
    @Id
    @GeneratedValue
	private long id;
    
    private String title;

    @OneToOne(cascade = CascadeType.ALL)
    private BodyHelper body;
    
	@Column(columnDefinition = "varchar(max)")
    private String payload;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene scene;
    

    public View() {
    }

    public View(String title, BodyHelper query, String payload) {
    	this.title = title;
    	this.body = query;
    	this.payload = payload;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BodyHelper getBody() {
        return body;
    }

    public void setBody(BodyHelper body) {
        this.body = body;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Scene getScene() {
		return scene;
	}
	
	public void setScene(Scene scene) {
		this.scene = scene;
	}

}
