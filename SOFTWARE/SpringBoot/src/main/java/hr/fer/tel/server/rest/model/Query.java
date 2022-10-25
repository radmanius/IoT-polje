package hr.fer.tel.server.rest.model;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.net.URI;

public class Query {
    private URI URI;
    private HttpMethod method;
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
