package hr.fer.tel.server.rest.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Key")
public class Key {

    @Id
    @GeneratedValue
    private long id;
	
    private String token1;
    private String token2;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Scene scene;
    
    public Key() {
    	
    }

    public Key(String token1, String token2) {
        this.token1 = token1;
        this.token2 = token2;
    }

    public Key(String token1){
        this.token1 = token1;
        this.token2 = null;
    }
    
    
    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getToken1() {
        return token1;
    }

    public void setToken1(String token1) {
        this.token1 = token1;
    }

    public String getToken2() {
        return token2;
    }

    public void setToken2(String token2) {
        this.token2 = token2;
    }
    
    public void setScene(Scene scene) {
		this.scene = scene;
	}
    
    public Scene getScene() {
		return this.scene;
	}
    @Override
    public String toString() {
        return "Key{" +
                "id='" + id + '\'' +
                ", token1='" + token1 + '\'' +
                ", token2='" + token2 + '\'' +
                '}';
    }


}
