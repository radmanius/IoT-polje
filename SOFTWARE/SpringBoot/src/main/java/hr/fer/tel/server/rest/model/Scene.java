package hr.fer.tel.server.rest.model;

import java.util.*;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import hr.fer.tel.server.rest.dto.ActuationViewDTO;
import hr.fer.tel.server.rest.dto.MesurmentViewDTO;
import hr.fer.tel.server.rest.dto.SceneDTO;

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
	private List<View2> views = new ArrayList<>();

	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Role> roles = new ArrayList<>(); // roles required for specific scene

	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Key> keys = new ArrayList<>(); // keys required for specific scene

	public Scene() {

	}

	public Scene(String title, String subtitle, Layout layout, String pictureLink, List<Tag> tags, List<View2> views,
			List<Role> roles, List<Key> keys) {
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
        for (View2 view : views) {
        	view.setScene(this);
		}
        for (Role role : roles) {
        	role.setScene(this);
		}
        for (Key key : keys) {
        	key.setScene(this);
		}

	}

	public Scene(SceneDTO dto) {
		this.id = dto.getId();
		this.keys = dto.getKeys().stream().map(key -> new Key(key)).toList();

		this.layout = new Layout(dto.getLayout());

		this.pictureLink = dto.getPictureLink();

		this.roles = dto.getRoles().stream().map(role -> new Role(role)).toList();

		this.subtitle = dto.getSubtitle();

		this.tags = dto.getTags().stream().map(tag -> new Tag(tag)).toList();

		this.title = dto.getTitle();

//		this.views = dto.getViews().stream().map(view -> new View2(view)).toList();

		for (var temp : dto.getViews()) {

			if (temp instanceof ActuationViewDTO) {

				ActuationViewDTO a = (ActuationViewDTO) temp;
				ActuationView view1 = new ActuationView(a);
				this.views.add(view1);

			}

//			if (temp instanceof MesurmentViewDTO) {
//
//				MesurmentViewDTO a = (MesurmentViewDTO) temp;
//				MesurmentView view1 = new MesurmentView(a);
//				this.views.add(view1);
//
//			}

		}

		for (Tag tag : tags) {
			tag.setScene(this);
		}
		for (View2 view : views) {
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

	public List<View2> getViews() {
		return views;
	}

	public void setViews(List<View2> views) {
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
//    	tag.setScene(this);
//    }

	@Override
	public String toString() {
		return "Scene [id=" + id + ", title=" + title + ", subtitle=" + subtitle + ", layout=" + layout
				+ ", pictureLink=" + pictureLink + ", tags=" + tags + ", views=" + views + ", roles=" + roles
				+ ", keys=" + keys + "]";
	}

	public static List<Scene> generateScenes(){
        Scene scene1 = new Scene("FER SAP01", "uz zid", new Layout("LIST"), "http://example.com/some.png", List.of(new Tag("sap01"), new Tag("sap02")),
                List.of(createView(), createView()), List.of(new Role("fer"), new Role("admin")),
                List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "", true)));

        Scene scene2 = new Scene("HUM_sap01AG", "nesto", new Layout("GRID"), "http://example.com/some123.png", List.of(new Tag("sap01ag"), new Tag("tag123")),
                List.of(createView(), createView()), List.of(new Role("ferit"), new Role("admin")),
                List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "", true)));

        Scene scene3 = new Scene("HUM_sap01AG", "nesto", new Layout("GRID"), "http://example.com/some123.png", List.of(new Tag("sap01ag"), new Tag("tag123")),
                List.of(createView(), createView()), List.of(new Role("ferit"), new Role("admin")),
                List.of(new Key("bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", "", true)));


        return List.of(scene1, scene2, scene3);
    }

    public static View2 createView() {
    	Random rand = new Random();
    	int number = rand.nextInt(3);

    	if(number == 0) {
            View2 view1 = new MesurmentView("view title1", "single", "C", createMeasurementForm(), createRequestQuery(), createDataExtractor());
            return view1;
        }
        else {
            View2 view2 = new ActuationView("view title2", "actuation", createActuationForm());
            return view2;
        }
    }

    public static MeasurmentSelectForm createMeasurementForm() {
        MeasurmentSelectForm selectForm1 = new MeasurmentSelectForm(createRequestQuery(), createFormInputs());
        return selectForm1;
    }

    public static Request createRequestQuery() {
        Request req = new Request("GET", "http://localhost:80/some/path/{{var1}}", createHeaders(),
                "template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}");
        return req;
    }

    public static Map<String, String> createHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("{{accessToken}} {{token1}}", "application/csv");
        return headers;
    }

    public static DataExtractor createDataExtractor() {
        DataExtractor dataExt = new DataExtractor("csv", "_time", "_value");
        return dataExt;
    }

    public static Map<String, String> createFormInputs() {
        Map<String, String> input = new HashMap<>();
        input.put("string", "integer");
        return input;
    }

    public static ActuationForm createActuationForm() {
        ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(), createFormInputs());
        return actForm1;
    }

}
