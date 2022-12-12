package hr.fer.tel.server.rest.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import hr.fer.tel.server.rest.dto.ActuationViewDTO;
import hr.fer.tel.server.rest.dto.KeyDTO;
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
	private List<View> views = new ArrayList<>();

	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Role> roles = new ArrayList<>(); // roles required for specific scene

	@OneToMany(mappedBy = "scene", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Key> keys = new ArrayList<>(); // keys required for specific scene

	public Scene() {

	}

	public Scene(String title, String subtitle, Layout layout, String pictureLink, List<Tag> tags, List<View> views,
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

	public Scene(SceneDTO dto) {
		this.id = dto.getId();
		this.keys = dto.getKeys().stream().map(key -> new Key(new KeyDTO(key))).toList();

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

			if (temp instanceof MesurmentViewDTO) {

				MesurmentViewDTO a = (MesurmentViewDTO) temp;
				MesurmentView view1 = new MesurmentView(a);
				this.views.add(view1);

			}

		}

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
//    	tag.setScene(this);
//    }

	@Override
	public String toString() {
		return "Scene [id=" + id + ", title=" + title + ", subtitle=" + subtitle + ", layout=" + layout
				+ ", pictureLink=" + pictureLink + ", tags=" + tags + ", views=" + views + ", roles=" + roles
				+ ", keys=" + keys + "]";
	}

	public static List<Scene> generateScenes() {
		// http://52.16.186.190/downloads/documentation/data_frame_guide.pdf
		Scene sceneFerPaprika = new Scene("FER paprika", "sva mjerenja", new Layout("LIST"),
				"https://www.biobio.hr/upload/catalog/product/20433/10513.jpg",
				List.of(new Tag("fer"), new Tag("paprika"), new Tag("svi senzori")),
				List.of(sap01BatView(), sap01HumView(), sap01LwView(), sap01ParView(), sap01PresView(),
						sap01SoiltcView(), sap01SoilcView(), sap01TcView(), 
						createActView()),
				List.of(new Role("fer")),
				List.of(new Key("influxFer",
						"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
						true)));

		Scene sceneFerRajcica = new Scene("FER rajčica", "sva mjerenja", new Layout("LIST"),
				"https://cdn.agroklub.com/upload/images/plant-specie/thumb/rajcica32-300x300.jpg",
				List.of(new Tag("fer"), new Tag("rajčica"), new Tag("svi senzori")),
				List.of(sap02AneView(), sap02BatView(), sap02HumView(), sap02LwView(), sap02Plv1View(), sap02Plv2View(),
						sap02Plv3View(), sap02PresView(), sap02SoiltcView(), sap02SoilbView(), sap02SoilcView(),
						sap02TcView(), sap02WvView(),
						createActView1()),
				List.of(new Role("fer")),
				List.of(new Key("influxFer",
						"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
						true)));

		Scene sceneFerTlo = new Scene("FER-ov vrt - tlo", "mjerenja tla", new Layout("LIST"),
				"https://d177d01a9shl9j.cloudfront.net/online-soil/main-page-images/_859xAUTO_crop_center-center_none/what-is-topsoil.jpg",
				List.of(new Tag("fer"), new Tag("tlo")),
				List.of(sap01SoiltcView(), sap01SoilcView(), sap02SoiltcView(), sap02SoilbView(), sap02SoilcView(),
						createActView2()),
				List.of(new Role("fer")),
				List.of(new Key("influxFer",
						"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
						true)));

		Scene sceneFerZrak = new Scene("FER-ov vrt - zrak", "mjerenja zraka", new Layout("LIST"),
				"https://www.ccacoalition.org/sites/default/files/styles/full_content_width/public/fields/event_mainimage/cloud2.jpg?itok=XV1BpKIw&timestamp=1587998743",
				List.of(new Tag("fer"), new Tag("zrak")),
				List.of(sap01HumView(), sap01ParView(), sap01PresView(), sap01TcView(), sap02AneView(), sap02HumView(),
						sap02Plv1View(), sap02Plv2View(), sap02Plv3View(), sap02PresView(), sap02TcView(),
						sap02WvView(),
						createActView3()),
				List.of(new Role("fer")),
				List.of(new Key("influxFer",
						"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
						true)));

		Scene sceneFerTempTlo = new Scene("FER-ov vrt - temp. tla", "mjerenja temperature tla", new Layout("LIST"),
				"https://www.gardeningknowhow.com/wp-content/uploads/2012/05/spring-temperatures-1024x768.jpg",
				List.of(new Tag("fer"), new Tag("tlo"), new Tag("temperatura")), 
				List.of(sap01TcView(), sap02TcView(),
						createActView4()),
				List.of(new Role("fer")),
				List.of(new Key("influxFer",
						"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
						true)));

		Scene sceneFerit1 = new Scene("FERIT - 1", "sva mjerenja", new Layout("LIST"),
				"https://www.no-tillfarmer.com/ext/resources/images/2009/02/Corn_DT_3211396_soft.jpg",
				List.of(new Tag("ferit")), List.of(ferit1airTemperature(), ferit1atmosphericPressure(),
						ferit1BatteryVolatage(), ferit1Irradiation(), ferit1RelativeHumidity(),
						createActView5()),
				List.of(new Role("ferit")),
				List.of(new Key("influxFerit",
						"kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==",
						true)));

		Scene sceneFerit2 = new Scene("FERIT - 2", "sva mjerenja", new Layout("LIST"),
				"https://www.no-tillfarmer.com/ext/resources/images/2009/02/Corn_DT_3211396_soft.jpg",
				List.of(new Tag("ferit")),
				List.of(ferit2airPressure(), ferit2BateryLevel(), ferit2Humidity(), ferit2Illumination(),
						ferit2lightIntensityR(), ferit2lightIntensityS(), ferit2lightIntensityT(),
						ferit2lightIntensityU(), ferit2lightIntensityV(), ferit2lightIntensityW(), ferit2temperature(),
						ferit2WhiteIllumination(),
						createActView6()),
				List.of(new Role("ferit")),
				List.of(new Key("influxFerit",
						"kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==",
						true)));

		return List.of(sceneFerPaprika, sceneFerRajcica, sceneFerTlo, sceneFerZrak, sceneFerTempTlo, sceneFerit1,
				sceneFerit2);
	}

	private static View ferit2WhiteIllumination() {
		return createFeritView("Bijela iluminacija", "lm*m−2", "whiteIllumination", "BE7A00000000304A");
	}

	private static View ferit2temperature() {
		return createFeritView("Temperatura zraka", "C", "temperature", "BE7A00000000304A");
	}

	private static View ferit2lightIntensityW() {
		return createFeritView("Intenzitet svjetla W", "", "lightIntensityW", "BE7A00000000304A");
	}

	private static View ferit2lightIntensityV() {
		return createFeritView("Intenzitet svjetla V", "", "lightIntensityV", "BE7A00000000304A");
	}

	private static View ferit2lightIntensityU() {
		return createFeritView("Intenzitet svjetla U", "", "lightIntensityU", "BE7A00000000304A");
	}

	private static View ferit2lightIntensityT() {
		return createFeritView("Intenzitet svjetla T", "", "lightIntensityT", "BE7A00000000304A");
	}

	private static View ferit2lightIntensityS() {
		return createFeritView("Intenzitet svjetla S", "", "lightIntensityS", "BE7A00000000304A");
	}

	private static View ferit2lightIntensityR() {
		return createFeritView("Intenzitet svjetla R", "", "lightIntensityR", "BE7A00000000304A");
	}

	private static View ferit2Illumination() {
		return createFeritView("Iluminacija", "lm*m−2", "illumination", "BE7A00000000304A");
	}

	private static View ferit2Humidity() {
		return createFeritView("Vlaga zraka", "%", "humidity", "BE7A00000000304A");
	}

	private static View ferit2BateryLevel() {
		return createFeritView("Baterija", "%", "batteryLevel", "BE7A00000000304A");
	}

	private static View ferit2airPressure() {
		return createFeritView("Tlak zraka", "Pa", "airPressure", "BE7A00000000304A");
	}

	private static View ferit1RelativeHumidity() {
		return createFeritView("Vlažnost zraka", "%", "relativeHumidit", "0004A30B0021EF31");
	}

	private static View ferit1Irradiation() {
		return createFeritView("Solarna radijacija", "μmol*m-2*s-1", "irridation", "0004A30B0021EF31");
	}

	private static View ferit1BatteryVolatage() {
		return createFeritView("Baterijaa", "%", "batteryVoltage", "0004A30B0021EF31");
	}

	private static View ferit1atmosphericPressure() {
		return createFeritView("Vlaga zraka", "%", "atmosphericPressure", "0004A30B0021EF31");
	}

	private static View ferit1airTemperature() {
		return createFeritView("Temperatura zraka", "C", "airTemperature", "0004A30B0021EF31");
	}

	private static View createFeritView(String viewTitle, String measurementUnit, String measurementType,
			String sensorId) {
		return new MesurmentView(viewTitle, "series", measurementUnit, new MeasurmentSelectForm(null, // submitSelectionRequest
				new StringInput("string", "period", "Period", "period u kojem se prikazuje graf", "\"24h\", \"7d\", \"30d\"")				
				),
				new Request("POST", // method
						"https://iotat.tel.fer.hr:57786/api/v2/query?org=ferit", // uri
						Map.of( // Map<String, String> headers,
								"Authorization", "Token {{influxFerit}}", "Accept", "application/csv", "Content-type",
								"application/vnd.flux"),
						String.format(
								"""
										from(bucket:"pio")
										|> range(start: {{startTimeISO}}, stop: {{endTimeISO}})
										|> filter(fn: (r) => r._measurement == "%s" and r.device_id == "%s" and r._field == "_value")
										|> drop(columns: ["_start", "_stop", "_field", "host", "id"])
										|> window(every: {{aggregationWindow}})
										|> mean()
										|> duplicate(column: "_stop", as: "_time")
										|> drop(columns: ["_start", "_stop", "device_id"])
										""",
								measurementType, sensorId) // payload
				), new DataExtractor("csv", "_time", "_value"));
	}

	private static View sap02WvView() {
		return createFerView("Smjer vjetra", "smjer (0 - sjever)", "WV", "SAP02");
	}

	private static View sap02TcView() {
		return createFerView("Temperatura zraka", "C", "TC", "SAP02");
	}

	private static View sap02SoilcView() {
		return createFerView("Vlaga tla (C)", "Frequency", "SOIL_C", "SAP02");
	}

	private static View sap02SoilbView() {
		return createFerView("Vlaga tla (B)", "Frequency", "SOIL_B", "SAP02");
	}

	private static View sap02SoiltcView() {
		return createFerView("Temperatura tla", "C", "SOILTC", "SAP02");
	}

	private static View sap02PresView() {
		return createFerView("Tlak zraka", "Pa", "PRES", "SAP02");
	}

	private static View sap02Plv3View() {
		return createFerView("Količina kiše u danu", "mm/day", "PLV3", "SAP02");
	}

	private static View sap02Plv2View() {
		return createFerView("Količina kiše u prošlom satu", "mm/h", "PLV2", "SAP02");
	}

	private static View sap02Plv1View() {
		return createFerView("Količina kiše u trenutnom satu", "mm", "PLV1", "SAP02");
	}

	private static View sap02LwView() {
		return createFerView("Vlaga lista", "V", "LW", "SAP02");
	}

	private static View sap02HumView() {
		return createFerView("Vlaga zraka", "%", "HUM", "SAP02");
	}

	private static View sap02BatView() {
		return createFerView("Baterija", "%", "BAT", "SAP02");
	}

	private static View sap02AneView() {
		return createFerView("Jačina vjetra", "km/h", "ANE", "SAP02");
	}

	private static View sap01TcView() {
		return createFerView("Temperatura zraka", "C", "TC", "SAP01");
	}

	private static View sap01SoilcView() {
		return createFerView("Vlažnost tla", "Frequency", "SOIL_C", "SAP01");
	}

	private static View sap01SoiltcView() {
		return createFerView("Temperatura zemlje", "C", "SOILTC", "SAP01");
	}

	private static View sap01PresView() {
		return createFerView("Tlak zraka", "Pa", "PRES", "SAP01");
	}

	private static View sap01ParView() {
		return createFerView("Solarna radijacija", "μmol*m-2*s-1", "PAR", "SAP01");
	}

	private static View sap01LwView() {
		return createFerView("Vlaga lista", "V", "LW", "SAP01");
	}

	private static View sap01HumView() {
		return createFerView("Vlaga sraka", "%", "HUM", "SAP01");
	}

	private static View sap01BatView() {
		return createFerView("Baterija", "%", "BAT", "SAP01");
	}

	private static View createFerView(String viewTitle, String measurementUnit, String measurementType,
			String sensorId) {
		return new MesurmentView(viewTitle, "series", measurementUnit, new MeasurmentSelectForm(null, // submitSelectionRequest
				new StringInput("string", "period", "Period", "period u kojem se prikazuje graf", "\"24h\", \"7d\", \"30d\"")				
				),
				new Request("POST", // method
						"https://iotat.tel.fer.hr:57786/api/v2/query?org=fer", // uri
						Map.of( // Map<String, String> headers,
								"Authorization", "Token {{influxFer}}", "Accept", "application/csv", "Content-type",
								"application/vnd.flux"),
						String.format(
								"""
										from(bucket:"telegraf")
										|> range(start: {{startTimeISO}}, stop: {{endTimeISO}})
										|> filter(fn: (r) => r._measurement == "%s" and r.id_wasp == "%s" and r._field == "value")
										|> drop(columns: ["_start", "_stop", "_field", "host", "id"])
										|> window(every: {{aggregationWindow}})
										|> mean()
										|> duplicate(column: "_stop", as: "_time")
										|> drop(columns: ["_start", "_stop"])
										""",
								measurementType, sensorId) // payload
				), new DataExtractor("csv", "_time", "_value"));
	}

	private static View createActuationView(String title, String viewType, ActuationForm form) {
		return new ActuationView(title, viewType, form);
	}

	public static View createView() {
		Random rand = new Random();
		int number = rand.nextInt(3);

		if (number == 0) {
			View view1 = new MesurmentView("view title1", "single", "C", createMeasurementForm(), createRequestQuery(),
					createDataExtractor());
			return view1;
		} else {
			View view2 = new ActuationView("view title2", "actuation", createActuationForm());
			return view2;
		}
	}

	public static MeasurmentSelectForm createMeasurementForm() {
		MeasurmentSelectForm selectForm1 = new MeasurmentSelectForm(createRequestQuery(), 
				new StringInput("string", "period", "Period", "period u kojem se prikazuje graf", "\"24h\", \"7d\", \"30d\""));
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

	// actuation views
	public static View createActView() {
		View view2 = new ActuationView("view title", "actuation", createActuationForm());
		return view2;
	}

	public static View createActView1() {
		View view2 = new ActuationView("view title1", "actuation", createActuationForm1());
		return view2;
	}

	public static View createActView2() {
		View view2 = new ActuationView("view title2", "actuation", createActuationForm2());
		return view2;
	}

	public static View createActView3() {
		View view2 = new ActuationView("view title3", "actuation", createActuationForm3());
		return view2;
	}

	public static View createActView4() {
		View view2 = new ActuationView("view title4", "actuation", createActuationForm4());
		return view2;
	}

	public static View createActView5() {
		View view2 = new ActuationView("view title5", "actuation", createActuationForm5());
		return view2;
	}

	public static View createActView6() {
		View view2 = new ActuationView("view title6", "actuation", createActuationForm6());
		return view2;
	}

	
	// actuation forme
	public static ActuationForm createActuationForm() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
				new BooleanInput("biti ili ne biti", "Hamlet", "Mišolovka", true));
		return actForm1;
	}

	public static ActuationForm createActuationForm1() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
				new DateInput("datum", "rođendan", "petak", "1.1.2023."));
		return actForm1;
	}

	public static ActuationForm createActuationForm2() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
				new DecimalInput("decimal", "float", "realni broj", 0.5, 0.0, 100.0));
		return actForm1;
	}

	public static ActuationForm createActuationForm3() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(), 
				new IntegerInput("int", "integer", "brojač", 5, 0, 1000));
		return actForm1;
	}

	public static ActuationForm createActuationForm4() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(), 
				new StringInput("string", "str", "text", "lala", "......"));
		return actForm1;
	}

	public static ActuationForm createActuationForm5() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(), 
				new SubmitButton("samouništenje", "veliki crveni gumb"));
		return actForm1;
	}

	public static ActuationForm createActuationForm6() {
		ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(), 
				new TimeInput("vrijeme", "podne", "sredina dana", "12:00"));
		return actForm1;
	}



}
