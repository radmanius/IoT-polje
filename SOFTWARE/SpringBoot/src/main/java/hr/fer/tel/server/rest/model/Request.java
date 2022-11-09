package hr.fer.tel.server.rest.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Request")
public class Request {
	
    @Id
    @GeneratedValue
	private long id;
    
    private String URI;
    
    private String method;
    
    @OneToOne(cascade = CascadeType.ALL)
    private BodyHelper headers;
    
    private String payload;

	public Request(String uRI, String method, BodyHelper headers, String payload) {
		super();
		URI = uRI;
		this.method = method;
		this.headers = headers;
		this.payload = payload;
	}

	public Request() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getURI() {
		return URI;
	}

	public void setURI(String uRI) {
		URI = uRI;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public BodyHelper getHeaders() {
		return headers;
	}

	public void setHeaders(BodyHelper headers) {
		this.headers = headers;
	}

	public String getPayload() {
		return payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}
	

}
