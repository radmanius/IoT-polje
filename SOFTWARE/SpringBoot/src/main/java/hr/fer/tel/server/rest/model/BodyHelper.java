package hr.fer.tel.server.rest.model;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "BodyHelper")
public class BodyHelper {
	
    @Id
    @GeneratedValue
    private long id;
	
	@Convert(converter = BodyHelperJson.class)
    private Map<String, String> properties = new HashMap<>();

    public BodyHelper() {
    }

	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}
	
    public BodyHelper addProperty(String key, String value) {
        properties.put(key, value);
        return this;
    }
  
   
}
