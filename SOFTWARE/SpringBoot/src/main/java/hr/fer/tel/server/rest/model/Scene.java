package hr.fer.tel.server.rest.model;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.persistence.*;

import org.springframework.http.*;
import java.net.URI;


import org.springframework.http.HttpMethod;
import org.springframework.util.MimeType;

@Entity
@Table(name = "scene")
public class Scene {

    @Id
    @GeneratedValue
    //private String id;
    private long id;
    
	@Column
    private String title;
	
	@Column
    private String subtitle;
	
	@OneToOne(cascade = {CascadeType.ALL})
    private Layout layout;
	
	@Column
    private String pictureLink;
	
	
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tag> tags = new ArrayList<>();
    
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
	//@OneToMany(mappedBy = "scene")
    private List<View> views = new ArrayList<>();
    
    
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Role> roles = new ArrayList<>(); //roles required for specific scene
    
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Key> keys = new ArrayList<>(); // keys required for specific scene

    public Scene(){
    	
    }

    public Scene(int i, String title, String subtitle, Layout layout, String pictureLink, List<Tag> tags, List<View> views, List<Role> roles, List<Key> keys) {
    //public Scene(String id, String title, String subtitle, Layout layout, String pictureLink, List<Tag> tags, List<View> views, List<Role> roles, List<Key> keys) {
    	this.id = i;
    	this.title = title;
        this.subtitle = subtitle;
        this.layout = layout;
        this.pictureLink = pictureLink;
        this.tags = tags;
        this.views = views;
        this.roles = roles;
        this.keys = keys;
        
        for (Tag tag : tags) {
        	tag.setScene(this);
		}
        for (View view : views) {
        	view.setScene(this);
		}
        for (Role role : roles) {
        	role.setScene(this);
		}
        for (Key key : keys) {
        	key.setScene(this);
		}
        
    }

    public String getPictureLink() {
        return pictureLink;
    }

    public void setPictureLink(String pictureLink) {
        this.pictureLink = pictureLink;
    }

    public long getId() {
    //public String getId() {
        return id;
    }

    public void setId(long id) {
    //public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public Layout getLayout() {
        return layout;
    }

    public void setLayout(Layout layout) {
        this.layout = layout;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<View> getViews() {
        return views;
    }

    public void setViews(List<View> views) {
        this.views = views;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Key> getKeys() {
        return keys;
    }

    public void setKeys(List<Key> keys) {
        this.keys = keys;
    }
    
    public void addTag(Tag tag) {
    	this.tags.add(tag);
    	tag.setScene(this);
    }
    
    
    public static List<Scene> generateScenes(){       
        
        Query query2 = new Query();
        query2.setURI(URI.create("https://iotat.tel.fer.hr:57786/api/v2/query?org=fer"));
        query2.setMethod(HttpMethod.POST);

        HttpHeaders header2 = new HttpHeaders();
        header2.set(HttpHeaders.AUTHORIZATION, "Token {{token1}}");
        header2.setAccept(List.of(MediaType.asMediaType(MimeType.valueOf("application/csv"))));
        header2.setContentType(MediaType.asMediaType(MimeType.valueOf("application/vnd.flux")));
        query2.setHeaders(header2);

        View view1 = new View("sap01_TC:min", createQuery(), """
                from(bucket:"telegraf")        
                |> range(start: {{startTimeISO}})      
                |> filter(fn: (r) => r._measurement == "TC" and r.id_wasp == "SAP01" and r._field =="value")
                |> window(every: {{agregationRange}})
                       |> min()
                       |> duplicate(column: "_stop", as: "_time")
                       |> drop(columns: ["_start", "_stop"])
                """);
        
        View view2 = new View("HUM_sap01_agregatedAVG", createQuery(), """
        		from(bucket:"telegraf")
        		|> range(start: {{startTimeISO}})
        		|> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
        		|> drop(columns: ["_start", "_stop", "_field", "host", "id"])
        		|> window(every: {{agregationRange}})
        		|> mean()
        		|> duplicate(column: "_stop", as: "_time")
        		|> drop(columns: ["_start", "_stop"])
        		""");
        
        View view3 = new View("HUM_sap01_agregatedAVG", createQuery(), """
        		from(bucket:"telegraf")
        		|> range(start: {{startTimeISO}})
        		|> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
        		|> drop(columns: ["_start", "_stop", "_field", "host", "id"])
        		|> window(every: {{agregationRange}})
        		|> mean()
        		|> duplicate(column: "_stop", as: "_time")
        		|> drop(columns: ["_start", "_stop"])
        		""");

        Scene scene1 = new Scene(0, "HUM_sap01AG", "dohvaca AVG vrijednost podataka HUM za sap01 senzor ", new Layout("LIST"), "https://freesvg.org/img/1588765770Luftfeuchte.png", List.of(new Tag("sap01")), List.of(view1, view2)
        , List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
        
        Scene scene2 = new Scene(0, "sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of(new Tag("sap01")), List.of(view2)
        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
      
        Scene scene3 = new Scene(0, "sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of(new Tag("sap01")), List.of(view3)
        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
       
        return List.of(scene1, scene2, scene3);
    }
    
    public static Query createQuery() {
    	Query query = new Query();
        query.setURI(URI.create("https://iotat.tel.fer.hr:57786/api/v2/query?org=fer"));
        query.setMethod(HttpMethod.POST);

        HttpHeaders header = new HttpHeaders();
        header.set(HttpHeaders.AUTHORIZATION, "Token {{token1}}");
        header.setAccept(List.of(MediaType.asMediaType(MimeType.valueOf("application/csv"))));
        header.setContentType(MediaType.asMediaType(MimeType.valueOf("application/vnd.flux")));
        query.setHeaders(header);
        return query;
    }
}
