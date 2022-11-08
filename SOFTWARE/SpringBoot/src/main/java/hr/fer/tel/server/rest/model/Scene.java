package hr.fer.tel.server.rest.model;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.persistence.*;
import javax.persistence.*;

import org.springframework.http.*;
import java.net.URI;


import org.springframework.http.HttpMethod;
import org.springframework.util.MimeType;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@OneToOne(cascade = CascadeType.ALL)
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
        
        Scene scene1 = new Scene(0, "HUM_sap01AG", "dohvaca AVG vrijednost podataka HUM za sap01 senzor ", new Layout("LIST"), "https://freesvg.org/img/1588765770Luftfeuchte.png", List.of(new Tag("sap01"), new Tag("sap02")), List.of(createView(), createView())
        , List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
        
        Scene scene2 = new Scene(0, "sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of(new Tag("sap01")), List.of(createView())
        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
      
        Scene scene3 = new Scene(0, "sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of(new Tag("sap01")), List.of(createView())
        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
       
        return List.of(scene1, scene2, scene3);
    }
    
    public static Body createBody() {
    	Body body = new Body();
    	
    	
    	body.setText("{"
    			+ "id: 9,"
    			+ "method: POST,"
    			+ "headers: [Authorization: \"Token {{token1}}\", Accept: application/csv\", Content-Type:\"application/vnd.flux\"]\","
    			+ "uri: https://iotat.tel.fer.hr:57786/api/v2/query?org=fer"
    			+ "}");
    	
    	body.addProperty("id", "9")
        	.addProperty("method", "POST")
        	.addProperty("headers", "[Authorization: \"Token {{token1}}\", Accept: application/csv\", Content-Type:\"application/vnd.flux\"]")
        	.addProperty("uri", "https://iotat.tel.fer.hr:57786/api/v2/query?org=fer");
        return body;
    }
    
    public static View createView() {
    	Random rand = new Random();
    	int number = rand.nextInt(3);
    	
    	if(number == 0) {
    		View view1 = new View("sap01_TC:min", createBody(), """
                    from(bucket:"telegraf")        
                    |> range(start: {{startTimeISO}})      
                    |> filter(fn: (r) => r._measurement == "TC" and r.id_wasp == "SAP01" and r._field =="value")
                    |> window(every: {{agregationRange}})
                           |> min()
                           |> duplicate(column: "_stop", as: "_time")
                           |> drop(columns: ["_start", "_stop"])
                    """);
    		return view1;
    	}else if(number == 1) {
            View view2 = new View("HUM_sap01_agregatedAVG", createBody(), """
            		from(bucket:"telegraf")
            		|> range(start: {{startTimeISO}})
            		|> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
            		|> drop(columns: ["_start", "_stop", "_field", "host", "id"])
            		|> window(every: {{agregationRange}})
            		|> mean()
            		|> duplicate(column: "_stop", as: "_time")
            		|> drop(columns: ["_start", "_stop"])
            		""");
            return view2;
    	}
        View view3 = new View("HUM_sap01_agregatedAVG", createBody(), """
        		from(bucket:"telegraf")
        		|> range(start: {{startTimeISO}})
        		|> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
        		|> drop(columns: ["_start", "_stop", "_field", "host", "id"])
        		|> window(every: {{agregationRange}})
        		|> mean()
        		|> duplicate(column: "_stop", as: "_time")
        		|> drop(columns: ["_start", "_stop"])
        		""");
        return view3;
    }
}
