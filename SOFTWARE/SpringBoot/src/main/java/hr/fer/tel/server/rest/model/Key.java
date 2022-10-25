package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import org.springframework.data.annotation.Id;

@Entity
@Table(name = "Key")
public class Key {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String token1;
    private String token2;

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

    @Override
    public String toString() {
        return "Key{" +
                "id='" + id + '\'' +
                ", token1='" + token1 + '\'' +
                ", token2='" + token2 + '\'' +
                '}';
    }


}
