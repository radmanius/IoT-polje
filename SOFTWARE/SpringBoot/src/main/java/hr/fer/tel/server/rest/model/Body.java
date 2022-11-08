package hr.fer.tel.server.rest.model;


import org.hibernate.Session;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonRawValue;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Entity
public class Body {
	
    @Id
    @GeneratedValue
    private long id;
	
    @Column(name = "params", columnDefinition = "json")
    @JsonRawValue
    private String text;
    
	@Convert(converter = JpaConverterJson.class)
    private Map<String, String> properties = new HashMap<>();

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

	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}
	
    public Body addProperty(String key, String value) {
        properties.put(key, value);
        return this;
    }
  
   
}
