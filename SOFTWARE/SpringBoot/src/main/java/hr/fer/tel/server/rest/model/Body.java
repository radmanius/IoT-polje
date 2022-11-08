package hr.fer.tel.server.rest.model;

import javax.persistence.*;

import org.springframework.http.*;

import com.fasterxml.jackson.annotation.JsonRawValue;

import java.net.URI;

@Entity
public class Body {
	
    @Id
    @GeneratedValue
    private long id;
	
    @Column(name = "params", columnDefinition = "json")
    @JsonRawValue
    private String text;

    public Body() {
    }

	public Body(long id, String text) {
		super();
		this.id = id;
		this.text = text;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

   
}
