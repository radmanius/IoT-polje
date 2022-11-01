package hr.fer.tel.server.rest.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "View")
public class View {
	
    @Id
    @GeneratedValue
	private long id;
    
    private String title;
    
    @OneToOne
    private Query query;
    
    private String payload;

    @ManyToOne(fetch = FetchType.LAZY)
    private Scene scene;
    
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
    


    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
