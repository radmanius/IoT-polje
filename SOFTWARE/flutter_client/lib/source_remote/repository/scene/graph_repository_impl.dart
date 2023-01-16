import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:intl/intl.dart';
import 'package:pdp2022/source_remote/dio/dio_database.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';

import 'graph_repository.dart';
import 'model/request.dart';

class GraphRepositoryImpl implements GraphRepository {
  GraphRepositoryImpl();

  @override
  Future<List<Graph>> getGraphDetails(Request? query) async {
    final dio = createDioDatabase();

    if (query != null) {
      String ferURI = "https://iotat.tel.fer.hr:57786/api/v2/query?org=fer";
      String feritURI = "https://iotat.tel.fer.hr:57786/api/v2/query?org=ferit";
      String influxKey = "Token bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==";
      if(query.uri == feritURI){
          influxKey = "Token kFNlNvr3KSAgZ0fyhY_I56bGn9HfbK6e2pu-ENx9dqltBAK38H1KySoFe27V2ri2xk3UQhO_sjP6Use0sg8q6Q==";
          ferURI = feritURI;
      }

      String data = query.payload;
      String window = "2h";

      DateTime today = DateTime.now();
      String endDate = DateFormat("yyyy-MM-dd;HH:mm:ss/").format(today);

      endDate = endDate.replaceAll(';', 'T');
      endDate = endDate.replaceAll('/', 'Z');
      data = data.replaceAll('{{endTimeISO}}', endDate);

      DateTime oneday = today.subtract(const Duration(days: 1));
      DateTime week = today.subtract(const Duration(days: 7));
      DateTime month = today.subtract(const Duration(days: 30));
      DateTime day = query.startDate!;

      if (oneday.difference(day) < const Duration(minutes: 1)) {
        window = "1h";
      } else if (week.difference(day) < const Duration(minutes: 1)) {
        window = "8h";
      } else if (month.difference(day) < const Duration(minutes: 1)) {
        window = "24h";
      }

      data = data.replaceAll('{{aggregationWindow}}', window);
      String startDate = DateFormat("yyyy-MM-dd;HH:mm:ss/").format(day);
      startDate = startDate.replaceAll(';', 'T');
      startDate = startDate.replaceAll('/', 'Z');
      data = data.replaceAll('{{startTimeISO}}', startDate);

      final response = await dio.post(ferURI,
          data: data,
          options: Options(headers: {
            "Authorization":
                influxKey,
            "Accept": "application/json",
            "Content-type": "application/vnd.flux",
            // "Token":   GetIt.I.get<AuthTokenPersistenceManager>().accessToken
          }
              //query.headers
              ));
      // print(jsonEncode(pl));
   //print(response.data);
//print(response.data.runtimeType);
      LineSplitter ls = new LineSplitter();
      List<String> l = ls.convert(response.data);
      var grafovi = <Graph>[];

      l.removeAt(0);
      for (String s in l) {
        if (s.length > 0) {
          s = s.substring(1);
          List<String> p = s.split(",");
          Graph g;
          if(p.length == 6) {
             g = Graph(
                p.elementAt(0), int.parse(p.elementAt(1)), p.elementAt(2),
                p.elementAt(3),
                double.parse(p.elementAt(4)), DateTime.parse(p.elementAt(5)));
          }else{
            g = Graph(
                p.elementAt(0), int.parse(p.elementAt(1)), p.elementAt(2), null,
                double.parse(p.elementAt(3)), DateTime.parse(p.elementAt(4)));
          }

          grafovi.add(g);
        }
      }

      return grafovi;
    }
    // ignore: null_argument_to_non_null_type
    return Future<List<Graph>>.value();
  }
}
