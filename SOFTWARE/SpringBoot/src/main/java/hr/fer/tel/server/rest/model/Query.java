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
    private URI URI;
    
    @Column(columnDefinition = "varchar(255)")
    private HttpMethod method;

    @Column(columnDefinition = "varchar(255)")
    private HttpHeaders headers;

    public Query() {
    }

    public java.net.URI getURI() {
        return URI;
    }

    public void setURI(java.net.URI URI) {
        this.URI = URI;
    }

    public HttpMethod getMethod() {
        return method;
    }

    public void setMethod(HttpMethod method) {
        this.method = method;
    }

    public HttpHeaders getHeaders() {
        return headers;
    }

    public void setHeaders(HttpHeaders headers) {
        this.headers = headers;
    }

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Query(java.net.URI URI, HttpMethod method, HttpHeaders headers) {
        this.URI = URI;
        this.method = method;
        this.headers = headers;
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
