package hr.fer.tel.server.rest.model;

import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
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

	@Convert(converter = BodyHelperJson.class)
    private Map<String, String> body;
    
	@Column(columnDefinition = "varchar(max)")
    private String payload;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene scene;
    

    public View() {
    }

    public View(String title, Map<String, String> query, String payload) {
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

    public Map<String, String> getBody() {
        return body;
    }

    public void setBody(Map<String, String> body) {
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
