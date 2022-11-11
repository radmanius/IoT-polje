package hr.fer.tel.server.rest.model;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

@Entity
@Table(name = "Scene")
public class Scene {

    @Id
    @GeneratedValue
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
	@JsonManagedReference
    private List<Tag> tags = new ArrayList<>();
    
    
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<View> views = new ArrayList<>();
    
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Role> roles = new ArrayList<>(); //roles required for specific scene
    
	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Key> keys = new ArrayList<>(); // keys required for specific scene

    public Scene(){
    	
    }

    public Scene(String title, String subtitle, Layout layout, String pictureLink, List<Tag> tags, List<View> views, List<Role> roles, List<Key> keys) {
    	this.title = title;
        this.subtitle = subtitle;
        this.layout = layout;
        this.pictureLink = pictureLink;
        this.tags = tags;
        this.views = views;
        this.roles = roles;
        this.keys = keys;
        
//        for (Tag tag : tags) {
//        	tag.setScene(this);
//		}
//        for (View view : views) {
//        	view.setScene(this);
//		}
//        for (Role role : roles) {
//        	role.setScene(this);
//		}
//        for (Key key : keys) {
//        	key.setScene(this);
//		}
//        
    }

    public String getPictureLink() {
        return pictureLink;
    }

    public void setPictureLink(String pictureLink) {
        this.pictureLink = pictureLink;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
    
//    public void addTag(Tag tag) {
//    	this.tags.add(tag);
//    	//tag.setScene(this);
//    }
    
    @Override
	public String toString() {
		return "Scene [id=" + id + ", title=" + title + ", subtitle=" + subtitle + ", layout=" + layout
				+ ", pictureLink=" + pictureLink + ", tags=" + tags + ", views=" + views + ", roles=" + roles
				+ ", keys=" + keys + "]";
	}

	public static List<Scene> generateScenes(){       
        
        Scene scene1 = new Scene("HUM_sap01AG", "dohvaca AVG vrijednost podataka HUM za sap01 senzor ", new Layout("LIST"), "https://freesvg.org/img/1588765770Luftfeuchte.png", List.of(new Tag("sap01"), new Tag("sap02")), List.of(createView(), createView())
        , List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "", true)));
        
        Scene scene2 = new Scene("sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of(new Tag("sap01")), List.of(createView())
        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "", false)));
      
        Scene scene3 = new Scene("sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of(new Tag("sap01")), List.of(createView())
        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "", true)));
       
        return List.of(scene1, scene2, scene3);
    }
    
    public static Map<String, String> createBody() {
    	Map<String, String> map = new LinkedHashMap<>();
    	    	
    	map.put("id", "9");
    	map.put("method", "POST");
    	map.put("headers", "[Authorization: \"Token {{token1}}\", Accept: application/csv\", Content-Type:\"application/vnd.flux\"]");
    	map.put("uri", "https://iotat.tel.fer.hr:57786/api/v2/query?org=fer");
        return map;
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
    
    
    public static void test() {
    	ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		
		String temp = "\"title\": \"view title\","
				+ "      \"viewType\": \"single\","
				+ "      \"measurementUnit\": \"C\","
				+ "      \"selectForm\": {"
				+ "        \"submitSelectionRequest\": {"
				+ "          \"URI\": \"http://localhost:80/some/path/{{var1}}\","
				+ "          \"method\": \"GET\","
				+ "          \"headers\": {"
				+ "            \"Authorization\": \"{{accessToken}} {{token1}} ...\","
				+ "            \"Content-Type\": \"application/csv\","
				+ "          },"
				+ "          \"payload\": \"template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}\""
				+ "        },"
				+ "        \"inputs\": {"
				+ "          \"inputType\": \"boolean\","
				+ "          \"name\": \"string\","
				+ "          \"title\": \"string\","
				+ "          \"description\": \"string\","
				+ "          \"defaultValue\": true"
				+ "        }"
				+ "      },"
				+ "      \"query\": {"
				+ "        \"URI\": \"http://localhost:80/some/path/{{var1}}\","
				+ "        \"method\": \"GET\","
				+ "        \"headers\": {"
				+ "          \"Authorization\": \"{{accessToken}} {{token1}}\","
				+ "          \"Content-Type\": \"application/csv\","
				+ "          \"...\": null"
				+ "        },"
				+ "        \"payload\": \"template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}\""
				+ "      },"
				+ "      \"responseExtracting\": {"
				+ "        \"dataFormat\": \"csv\","
				+ "        \"timeColumn\": \"_time\","
				+ "        \"valueColumn\": \"_value\""
				+ "      }"
				+ "    }";
		
		DocumentContext jsonContext = JsonPath.parse(temp);
		MesurmentView view1 = new MesurmentView();
		try {
			view1 = objectMapper.readValue(temp, MesurmentView.class);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
