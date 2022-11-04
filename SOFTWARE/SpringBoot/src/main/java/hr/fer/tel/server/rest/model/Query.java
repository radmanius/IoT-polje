package hr.fer.tel.server.rest.model;

import javax.persistence.*;

import org.springframework.http.*;
import java.net.URI;

@Entity
public class Query {
	
    @Id
    @GeneratedValue
    private long id;
	
    @Column(columnDefinition = "varchar(255)")
    private String URI;
    
    @Column(columnDefinition = "varchar(255)")
    private String method;

    @Column(columnDefinition = "varchar(max)")
    private String headers;

    public Query() {
    }

    public String getURI() {
        return URI;
    }

    public void setURI(String URI) {
        this.URI = URI;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getHeaders() {
        return headers;
    }

    public void setHeaders(HttpHeaders headers) {
        this.headers = headers.toString();
    }

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Query(String URI, String method, HttpHeaders headers) {
        this.URI = URI;
        this.method = method;
        this.headers = headers.toString();
    }

    @Override
    public String toString() {
        return "Query{" +
                "URI=" + URI +
                ", method=" + method +
                ", headers=" + headers +
                '}';
    }
}
