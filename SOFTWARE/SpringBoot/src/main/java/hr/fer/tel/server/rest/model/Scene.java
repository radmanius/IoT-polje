package hr.fer.tel.server.rest.model;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import javax.persistence.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.MimeType;



@Entity
@Table(name = "Scene")
public class Scene {

    @Id
    @GeneratedValue
    private long id;
	
    private String title;
    private String subtitle;
    private Layout layout;
    private String pictureLink;
    @OneToMany
    private List<String> tags;
    @OneToMany
    private List<View> views;
    @OneToMany
    private List<Role> roles; //roles required for specific scene
    @OneToMany
    private List<Key> keys; // keys required for specific scene

    public Scene(){
    	
    }

    public Scene(long id, String title, String subtitle, Layout layout, String pictureLink, List<String> tags, List<View> views, List<Role> roles, List<Key> keys) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.layout = layout;
        this.pictureLink = pictureLink;
        this.tags = tags;
        this.views = views;
        this.roles = roles;
        this.keys = keys;
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

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
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

//    public static List<Scene> generateScenes(){
//        Scene scene = new Scene();
//        scene.setId("scena1");
//        scene.setTitle("SOILTC:min_TC:min_SAP01");
//        scene.setSubtitle("dohvaca min temperaturu zemlje i zraka za senzor SAP01");
//        scene.setLayout(new Layout("LIST"));
//        scene.setTags(List.of("fer", "sap01"));
////        scene.setRoles(List.of(UserRole.ferit, UserRole.fer, UserRole.admin));
//        scene.setRoles(List.of(new Role("ferit"), new Role("fer"), new Role("admin")));
//
//        scene.setKeys(List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
//        scene.setPictureLink("https://freesvg.org/img/Lavori-in-corso.png");
//
//        Query query = new Query();
//        query.setURI(URI.create("https://iotat.tel.fer.hr:57786/api/v2/query?org=fer"));
//        query.setMethod(HttpMethod.POST);
//
//
//        HttpHeaders header = new HttpHeaders();
//        header.set(HttpHeaders.AUTHORIZATION, "Token {{token1}}");
//        header.setAccept(List.of(MediaType.asMediaType(MimeType.valueOf("application/csv"))));
//        header.setContentType(MediaType.asMediaType(MimeType.valueOf("application/vnd.flux")));
//        query.setHeaders(header);
//
//
//        View view = new View("sap01_SOILTC:min", query, """
//                from(bucket:"telegraf")       
//                |> range(start: {{startTimeISO}})      
//                |> filter(fn: (r) => r._measurement == "SOILTC" and r.id_wasp == "SAP01" and r._field == "value")
//                |> window(every: {{agregationRange}})
//                       |> min()
//                       |> duplicate(column: "_stop", as: "_time")
//                       |> drop(columns: ["_start", "_stop"])
//                """);
//        View view6 = new View("sap01_SOILTC:mean", query, """
//                from(bucket:"telegraf")       
//                |> range(start: {{startTimeISO}})      
//                |> filter(fn: (r) => r._measurement == "SOILTC" and r.id_wasp == "SAP01" and r._field =="value")
//                |> window(every: {{agregationRange}})
//                       |> mean()
//                       |> duplicate(column: "_stop", as: "_time")
//                       |> drop(columns: ["_start", "_stop"])
//                """);
//
//        View view5 = new View("sap01_TC:min", query, """
//                from(bucket:"telegraf")        
//                |> range(start: {{startTimeISO}})      
//                |> filter(fn: (r) => r._measurement == "TC" and r.id_wasp == "SAP01" and r._field =="value")
//                |> window(every: {{agregationRange}})
//                       |> min()
//                       |> duplicate(column: "_stop", as: "_time")
//                       |> drop(columns: ["_start", "_stop"])
//                """);
//
//        View view2 = new View("HUM_sap02_max", query, """
//                from(bucket:"telegraf")
//                       |> range(start: {{startTimeISO}})
//                       |> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP02" and r._field =="value")
//                       |> window(every: {{agregationRange}})
//                       |> max()
//                       |> duplicate(column: "_stop", as: "_time")
//                       |> drop(columns: ["_start", "_stop"])
//                """);
//
//        View view3 = new View("LW_sap02_max", query, """
//                       from(bucket:"telegraf")
//                       |> range(start: {{startTimeISO}})
//                       |> filter(fn: (r) => r._measurement == "LW" and r.id_wasp == "SAP02" and r._field =="value")
//                       |> window(every: {{agregationRange}})
//                       |> max()
//                       |> duplicate(column: "_stop", as: "_time")
//                       |> drop(columns: ["_start", "_stop"])
//                """);
//
//        View view4 = new View("HUM_sap01_agregatedAVG", query, """
//                from(bucket:"telegraf")
//                        |> range(start: {{startTimeISO}})
//                        |> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
//                        |> drop(columns: ["_start", "_stop", "_field", "host", "id"])
//                        |> window(every: {{agregationRange}})
//                        |> mean()
//                        |> duplicate(column: "_stop", as: "_time")
//                        |> drop(columns: ["_start", "_stop"])
//                """);
//
//        scene.setViews(List.of(view, view5));
//
//        Scene scene1 = new Scene("scena2", "HUM_sap01AG", "dohvaca AVG vrijednost podataka HUM za sap01 senzor ", new Layout("LIST"), "https://freesvg.org/img/1588765770Luftfeuchte.png", List.of("sap01"), List.of(view4)
//        , List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
//        Scene scene2 = new Scene("scena3", "sap01 SOILTC:mean", "dohvaca SOILTC:mean mjerenja za sap01 senzor",  new Layout("GRID"), "https://freesvg.org/img/Ramiras-Earth-small-icon.png", List.of("sap01"), List.of(view6)
//        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
//        Scene scene3 = new Scene("scena4", "HUM:max_LW:max_sap02_FER", "dohvaca HUM:max i LW:max mjerenja za sap02 senzor",   new Layout("LIST"),"https://freesvg.org/img/taking-shelter-from-the-rain.png", List.of("sap02"), List.of(view2, view3)
//        ,List.of(new Role("fer"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
//
//        Scene scene4 = new Scene("scena5", "HUM:max_LW:max_sap02_FERIT", "dohvaca HUM:max i LW:max mjerenja za sap02 senzor",   new Layout("LIST"),"https://freesvg.org/img/taking-shelter-from-the-rain.png", List.of("sap02", "ferit"), List.of(view2, view3)
//                ,List.of(new Role("ferit"), new Role("admin")), List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "")));
//
//        return List.of(scene, scene1, scene2, scene3, scene4);
//    }
}
