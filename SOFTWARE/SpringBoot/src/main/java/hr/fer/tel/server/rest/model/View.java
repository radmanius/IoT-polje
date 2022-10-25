package hr.fer.tel.server.rest.model;


public class View {
    private String title;
    private Query query;
    private String payload;

    public View() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Query getQuery() {
        return query;
    }

    public void setQuery(Query query) {
        this.query = query;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public View(String title, Query query, String payload) {
        this.title = title;
        this.query = query;
        this.payload = payload;
    }

    @Override
    public String toString() {
        return "View{" +
                "title='" + title + '\'' +
                ", query=" + query +
                ", payload='" + payload + '\'' +
                '}';
    }
}
