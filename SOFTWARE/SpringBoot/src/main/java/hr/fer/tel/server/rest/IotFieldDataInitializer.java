package hr.fer.tel.server.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import hr.fer.tel.server.rest.model.ActuationForm;
import hr.fer.tel.server.rest.model.ActuationView;
import hr.fer.tel.server.rest.model.BooleanInput;
import hr.fer.tel.server.rest.model.DataExtractor;
import hr.fer.tel.server.rest.model.DateInput;
import hr.fer.tel.server.rest.model.DecimalInput;
import hr.fer.tel.server.rest.model.IntegerInput;
import hr.fer.tel.server.rest.model.Key;
import hr.fer.tel.server.rest.model.Layout;
import hr.fer.tel.server.rest.model.MeasurmentSelectForm;
import hr.fer.tel.server.rest.model.MesurmentView;
import hr.fer.tel.server.rest.model.Request;
import hr.fer.tel.server.rest.model.Role;
import hr.fer.tel.server.rest.model.Scene;
import hr.fer.tel.server.rest.model.StringInput;
import hr.fer.tel.server.rest.model.SubmitButton;
import hr.fer.tel.server.rest.model.Tag;
import hr.fer.tel.server.rest.model.TimeInput;
import hr.fer.tel.server.rest.model.View;
import hr.fer.tel.server.rest.repository.dao.SceneRepository;
import hr.fer.tel.server.rest.service.KeyService;

@Component
@Profile("dev")
public class IotFieldDataInitializer implements CommandLineRunner {
	protected final Log logger = LogFactory.getLog(getClass());

	@Autowired
	private KeyService keyService;

	@Autowired
	private SceneRepository sceneRepository;

	@Override
	public void run(String... args) throws Exception {
		logger.info("Starting CommandLineRunner Init DatabBase!!");

		try {
			Key keyFerit = new Key("influxFerit",
					"kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==", true);
			Key keyFer = new Key("influxFer",
					"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);

			keyService.ProbaAdd(keyFer);
			keyService.ProbaAdd(keyFerit);

			generateAndSaveScenes();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Scene generate FAILD");
		}
	}

    private void generateAndSaveScenes() {
        var scenes = generateScenes();
        for (var scene : scenes) {
          sceneRepository.save(scene);
        }
    }

    private static List<Scene> generateScenes() {
      // http://52.16.186.190/downloads/documentation/data_frame_guide.pdf
      Key key1 = new Key("influxFer",
              "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);
      String key = "influxFer";
      String keyTwo = "influxFerit";

      Scene sceneFerPaprika = new Scene("FER paprika", "sva mjerenja", new Layout("LIST"),
              "https://www.biobio.hr/upload/catalog/product/20433/10513.jpg",
              List.of(new Tag("fer"), new Tag("paprika"), new Tag("svi senzori")),
              List.of(sap01TcView(), sap01HumView(), sap01ParView(), sap01SoiltcView(), sap01SoilcView(), sap01LwView(), sap01PresView(),
                  sap01BatView(), createActView()),
              List.of(new Role("fer")), List.of(key, keyTwo));

      Scene sceneFerRajcica = new Scene("FER rajčica", "sva mjerenja", new Layout("LIST"),
              "https://cdn.agroklub.com/upload/images/plant-specie/thumb/rajcica32-300x300.jpg",
              List.of(new Tag("fer"), new Tag("rajčica"), new Tag("svi senzori")),
              List.of(sap02TcView(), sap02HumView(), sap02SoiltcView(), sap02SoilbView(), sap02SoilcView(), sap02LwView(), sap02PresView(),
                  sap02AneView(), sap02Plv1View(), sap02Plv2View(), sap02Plv3View(), sap02WvView(),
                  sap02BatView(), createActView1()),
              List.of(new Role("fer")), List.of(key));

      Key key2 = new Key("influxFer",
              "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);

      Key key3 = new Key("influxFer",
              "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);

      Scene sceneFerTlo = new Scene("FER-ov vrt - tlo", "mjerenja tla", new Layout("LIST"),
              "https://d177d01a9shl9j.cloudfront.net/online-soil/main-page-images/_859xAUTO_crop_center-center_none/what-is-topsoil.jpg",
              List.of(new Tag("fer"), new Tag("tlo")),
              List.of(sap01SoiltcView(), sap01SoilcView(),
                  sap02SoiltcView(), sap02SoilbView(), sap02SoilcView(), createActView2()),
              List.of(new Role("fer")), List.of(key));

      Scene sceneFerZrak = new Scene("FER-ov vrt - zrak", "mjerenja zraka", new Layout("LIST"),
              "https://www.ccacoalition.org/sites/default/files/styles/full_content_width/public/fields/event_mainimage/cloud2.jpg?itok=XV1BpKIw&timestamp=1587998743",
              List.of(new Tag("fer"), new Tag("zrak")),
              List.of(sap01TcView(), sap01HumView(), sap01ParView(), sap01PresView(),
                  sap02TcView(), sap02HumView(), sap02PresView(),
                  sap02AneView(), sap02WvView(), sap02Plv1View(), sap02Plv2View(), sap02Plv3View(),
                      createActView3()),
              List.of(new Role("fer")), List.of(key));

      Key key4 = new Key("influxFer",
              "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);

      Scene sceneFerTempTlo = new Scene("FER-ov vrt - temp. tla", "mjerenja temperature tla", new Layout("LIST"),
              "https://www.gardeningknowhow.com/wp-content/uploads/2012/05/spring-temperatures-1024x768.jpg",
              List.of(new Tag("fer"), new Tag("tlo"), new Tag("temperatura")),
              List.of(sap01TcView(), sap02TcView(), createActView4()), List.of(new Role("fer")), List.of(key));

      Key key5 = new Key("influxFer",
              "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==", true);

      Scene sceneFerit1 = new Scene("FERIT - 1", "sva mjerenja", new Layout("LIST"),
              "https://www.no-tillfarmer.com/ext/resources/images/2009/02/Corn_DT_3211396_soft.jpg",
              List.of(new Tag("ferit")),
              List.of(ferit1airTemperature(), ferit1RelativeHumidity(), ferit1Irradiation(), ferit1atmosphericPressure(),
                  ferit1BatteryVolatage(), createActView5()),
              List.of(new Role("ferit")), List.of(keyTwo));

      Key key6 = new Key("influxFerit",
              "kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==", true);

      Scene sceneFerit2 = new Scene("FERIT - 2", "sva mjerenja", new Layout("LIST"),
              "https://www.no-tillfarmer.com/ext/resources/images/2009/02/Corn_DT_3211396_soft.jpg",
              List.of(new Tag("ferit")),
              List.of(ferit2temperature(), ferit2Humidity(), ferit2Illumination(),
                  ferit2lightIntensityR(), ferit2lightIntensityS(), ferit2lightIntensityT(),
                  ferit2lightIntensityU(), ferit2lightIntensityV(), ferit2lightIntensityW(),
                  ferit2WhiteIllumination(), ferit2airPressure(),
                  ferit2BateryLevel(), createActView6()),
              List.of(new Role("ferit")), List.of(keyTwo));

      Key key7 = new Key("influxFerit",
              "kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==", true);

      Scene gddFerit = new Scene(
            "FERIT - GDD",
            "GDD na FERIT-ovim stranicama",
            new Layout("LIST"),
            "https://assets-global.website-files.com/6022ede4a244183c63eed50b/6032f3f0569821be08437652_GDD.png",
            List.of(new Tag("ferit")),
            List.of(gddFerit1()),
            List.of(new Role("ferit")),
            List.of());

      return List.of(sceneFerPaprika, sceneFerRajcica, sceneFerTlo, sceneFerZrak, sceneFerTempTlo, sceneFerit1,
              sceneFerit2, gddFerit);
  }

  private static View gddFerit1() {
    return new MesurmentView(
        "GDD test",
        """
        [akcija]: GDU
        prskanje: 200
        žetva: 500",
        """,
        "series",
        "GDU",
        new MeasurmentSelectForm(
            null, // submitSelectionRequest
            List.of(
                new DateInput("Početak", "startDate", "Datum početka grafa", null),
                new DateInput("Kraj", "endDate", "Datum kraja grafa", null)
            )
        ),
        new Request(
            "POST", //method
            "https://iotat.tel.fer.hr:58443/gdd/search", //uri
            Map.of( //Map<String, String> headers,
                "Authorization", "bearer {{accessToken}}",
                "Accept", "application/json",
                "Content-type", "application/json"
                ),
            String.format("""
            {
              "sensorId": "0004A30B0021EF31",
              "plantingDate": "2022-08-01",
              "startDate": "{{startDate}}",
              "endDate": "{{endDate}}",
              "minTemp": 10,
              "maxTemp": 30,
              "cumulative": true
            }
            """) //payload
        ),
        new DataExtractor("json", "$[*].date", "$[*].value")
     );

  }


  private static View ferit2WhiteIllumination() {
      return createFeritView("Bijela iluminacija", "", "lm*m−2", "whiteIllumination", "BE7A00000000304A");
  }

  private static View ferit2temperature() {
      return createFeritView("Temperatura zraka", "", "C", "temperature", "BE7A00000000304A");
  }

  private static View ferit2lightIntensityW() {
      return createFeritView("Intenzitet svjetla W", "", "", "lightIntensityW", "BE7A00000000304A");
  }

  private static View ferit2lightIntensityV() {
      return createFeritView("Intenzitet svjetla V", "", "", "lightIntensityV", "BE7A00000000304A");
  }

  private static View ferit2lightIntensityU() {
      return createFeritView("Intenzitet svjetla U", "", "", "lightIntensityU", "BE7A00000000304A");
  }

  private static View ferit2lightIntensityT() {
      return createFeritView("Intenzitet svjetla T", "", "", "lightIntensityT", "BE7A00000000304A");
  }

  private static View ferit2lightIntensityS() {
      return createFeritView("Intenzitet svjetla S", "", "", "lightIntensityS", "BE7A00000000304A");
  }

  private static View ferit2lightIntensityR() {
      return createFeritView("Intenzitet svjetla R", "", "", "lightIntensityR", "BE7A00000000304A");
  }

  private static View ferit2Illumination() {
      return createFeritView("Iluminacija", "", "lm*m−2", "illumination", "BE7A00000000304A");
  }

  private static View ferit2Humidity() {
      return createFeritView("Vlaga zraka", "", "%", "humidity", "BE7A00000000304A");
  }

  private static View ferit2BateryLevel() {
      return createFeritView("Baterija", "", "%", "batteryLevel", "BE7A00000000304A");
  }

  private static View ferit2airPressure() {
      return createFeritView("Tlak zraka", "", "Pa", "airPressure", "BE7A00000000304A");
  }

  private static View ferit1RelativeHumidity() {
      return createFeritView("Vlaga zraka", "", "%", "relativeHumidit", "0004A30B0021EF31");
  }

  private static View ferit1Irradiation() {
      return createFeritView("Solarna radijacija", "", "μmol*m-2*s-1", "irridation", "0004A30B0021EF31");
  }

  private static View ferit1BatteryVolatage() {
      return createFeritView("Baterijaa", "", "%", "batteryVoltage", "0004A30B0021EF31");
  }

  private static View ferit1atmosphericPressure() {
      return createFeritView("Vlaga zraka", "", "%", "atmosphericPressure", "0004A30B0021EF31");
  }

  private static View ferit1airTemperature() {
      return createFeritView("Temperatura zraka", "", "C", "airTemperature", "0004A30B0021EF31");
  }

  private static View createFeritView(String viewTitle, String description, String measurementUnit, String measurementType,
          String sensorId) {
      return new MesurmentView(viewTitle, description, "series", measurementUnit, new MeasurmentSelectForm(new Request("POST", // method
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
      ), // submitSelectionRequest
          List.of(new StringInput(
                      "string", "period", "Period", "period u kojem se prikazuje graf", "\"24h\", \"7d\", \"30d\""))),
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
      return createFerView("Smjer vjetra", "", "smjer (0 - sjever)", "WV", "SAP02");
  }

  private static View sap02TcView() {
      return createFerView("Temperatura zraka", "", "C", "TC", "SAP02");
  }

  private static View sap02SoilcView() {
      return createFerView("Vlaga tla (C)", "", "Frequency", "SOIL_C", "SAP02");
  }

  private static View sap02SoilbView() {
      return createFerView("Vlaga tla (B)", "", "Frequency", "SOIL_B", "SAP02");
  }

  private static View sap02SoiltcView() {
      return createFerView("Temperatura tla", "", "C", "SOILTC", "SAP02");
  }

  private static View sap02PresView() {
      return createFerView("Tlak zraka", "", "Pa", "PRES", "SAP02");
  }

  private static View sap02Plv3View() {
      return createFerView("Količina kiše u danu", "", "mm/day", "PLV3", "SAP02");
  }

  private static View sap02Plv2View() {
      return createFerView("Količina kiše u prošlom satu", "", "mm/h", "PLV2", "SAP02");
  }

  private static View sap02Plv1View() {
      return createFerView("Količina kiše u trenutnom satu", "", "mm", "PLV1", "SAP02");
  }

  private static View sap02LwView() {
      return createFerView("Vlaga lista", "", "V", "LW", "SAP02");
  }

  private static View sap02HumView() {
      return createFerView("Vlaga zraka", "", "%", "HUM", "SAP02");
  }

  private static View sap02BatView() {
      return createFerView("Baterija", "", "%", "BAT", "SAP02");
  }

  private static View sap02AneView() {
      return createFerView("Jačina vjetra", "", "km/h", "ANE", "SAP02");
  }

  private static View sap01TcView() {
      return createFerView("Temperatura zraka", "", "C", "TC", "SAP01");
  }

  private static View sap01SoilcView() {
      return createFerView("Vlaga tla", "Frequency", "", "SOIL_C", "SAP01");
  }

  private static View sap01SoiltcView() {
      return createFerView("Temperatura tla", "", "C", "SOILTC", "SAP01");
  }

  private static View sap01PresView() {
      return createFerView("Tlak zraka", "", "Pa", "PRES", "SAP01");
  }

  private static View sap01ParView() {
      return createFerView("Solarna radijacija", "", "μmol*m-2*s-1", "PAR", "SAP01");
  }

  private static View sap01LwView() {
      return createFerView("Vlaga lista", "", "V", "LW", "SAP01");
  }

  private static View sap01HumView() {
      return createFerView("Vlaga zraka", "", "%", "HUM", "SAP01");
  }

  private static View sap01BatView() {
      return createFerView("Baterija", "", "%", "BAT", "SAP01");
  }

  private static View createFerView(String viewTitle, String description, String measurementUnit, String measurementType,
          String sensorId) {
      return new MesurmentView(viewTitle, description, "series", measurementUnit, new MeasurmentSelectForm(new Request("POST", // method
              "https://iotat.tel.fer.hr:57786/api/v2/query?org=fer", // uri
              Map.of( // Map<String, String> headers,
                      "Authorization", "Token {{influxFer}}", "Accept", "application/csv", "Content-type",
                      "application/vnd.flux"),
              String.format("""
                      from(bucket:"telegraf")
                      |> range(start: {{startTimeISO}}, stop: {{endTimeISO}})
                      |> filter(fn: (r) => r._measurement == "%s" and r.id_wasp == "%s" and r._field == "value")
                      |> drop(columns: ["_start", "_stop", "_field", "host", "id"])
                      |> window(every: {{aggregationWindow}})
                      |> mean()
                      |> duplicate(column: "_stop", as: "_time")
                      |> drop(columns: ["_start", "_stop"])
                      """, measurementType, sensorId) // payload
      ), // submitSelectionRequest
      List.of(new StringInput(
                      "string", "period", "Period", "period u kojem se prikazuje graf", "\"24h\", \"7d\", \"30d\""))),
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

  private static View createActuationView(String title, String description, String viewType, ActuationForm form) {
      return new ActuationView(title, description, viewType, form);
  }

  public static View createView() {
      Random rand = new Random();
      int number = rand.nextInt(3);

      if (number == 0) {
          View view1 = new MesurmentView("view title1", "description", "single", "C", createMeasurementForm(), createRequestQuery(),
                  createDataExtractor());
          return view1;
      } else {
          View view2 = new ActuationView("view title2", "description", "actuation", createActuationForm());
          return view2;
      }
  }

  public static MeasurmentSelectForm createMeasurementForm() {
      MeasurmentSelectForm selectForm1 = new MeasurmentSelectForm(createRequestQuery(),
          List.of(new StringInput("string", "period", "Period", "period u kojem se prikazuje graf", "\"24h\", \"7d\", \"30d\"")));
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
  private static View createActView() {
      View view2 = new ActuationView("view title", "description", "actuation", createActuationForm());
      return view2;
  }

  private static View createActView1() {
      View view2 = new ActuationView("view title1", "description", "actuation", createActuationForm1());
      return view2;
  }

  private static View createActView2() {
      View view2 = new ActuationView("view title2", "description", "actuation", createActuationForm2());
      return view2;
  }

  private static View createActView3() {
      View view2 = new ActuationView("view title3", "description", "actuation", createActuationForm3());
      return view2;
  }

  private static View createActView4() {
      View view2 = new ActuationView("view title4", "description", "actuation", createActuationForm4());
      return view2;
  }

  private static View createActView5() {
      View view2 = new ActuationView("view title5", "description", "actuation", createActuationForm5());
      return view2;
  }

  private static View createActView6() {
      View view2 = new ActuationView("view title6", "description", "actuation", createActuationForm6());
      return view2;
  }

  // actuation forme
  private static ActuationForm createActuationForm() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
              List.of(new BooleanInput("biti ili ne biti", "Hamlet", "Mišolovka", true)));
      return actForm1;
  }

  private static ActuationForm createActuationForm1() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
          List.of(new DateInput("datum", "rođendan", "petak", "1.1.2023.")));
      return actForm1;
  }

  private static ActuationForm createActuationForm2() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
          List.of(new DecimalInput("decimal", "float", "realni broj", 0.5, 0.0, 100.0)));
      return actForm1;
  }

  private static ActuationForm createActuationForm3() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
          List.of(new IntegerInput("int", "integer", "brojač", 5, 0, 1000)));
      return actForm1;
  }

  private static ActuationForm createActuationForm4() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
          List.of(new StringInput("string", "str", "text", "lala", "......")));
      return actForm1;
  }

  private static ActuationForm createActuationForm5() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
          List.of(new SubmitButton("samouništenje", "veliki crveni gumb")));
      return actForm1;
  }

  private static ActuationForm createActuationForm6() {
      ActuationForm actForm1 = new ActuationForm(createRequestQuery(), createRequestQuery(),
          List.of(new TimeInput("vrijeme", "podne", "sredina dana", "12:00")));
      return actForm1;
  }

}
