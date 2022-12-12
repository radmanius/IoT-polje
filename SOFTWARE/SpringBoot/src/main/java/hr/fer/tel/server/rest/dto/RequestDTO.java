package hr.fer.tel.server.rest.dto;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import hr.fer.tel.server.rest.model.Request;

public class RequestDTO {
	
	private long id;
    
    private String method;
    
    private String uri;
    
    private Map<String, String> headers;
    
    private String payload;

	public RequestDTO(long id, String method, String uri, Map<String, String> headers, String payload) {
		super();
		this.id = id;
		this.method = method;
		this.uri = uri;
		this.headers = headers;
		this.payload = payload;
	}

	public RequestDTO() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	@JsonProperty("URI")
	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}

	public String getPayload() {
		return payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}
	
	public static RequestDTO of(Request request) {
		long id = request.getId();
		String metoda = request.getMethod();

		return new RequestDTO(id, metoda, request.getUri(), request.getHeaders(), request.getPayload());
	}
	
}
