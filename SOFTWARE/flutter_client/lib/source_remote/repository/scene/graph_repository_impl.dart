import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';
import 'package:pdp2022/source_remote/dio/dio_database.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';

import 'model/request.dart';
import 'model/view/view.dart';
import 'graph_repository.dart';

class GraphRepositoryImpl implements GraphRepository {
  GraphRepositoryImpl();



  @override
  Future<List<Graph>> getGraphDetails(Request? query) async {
    final dio=createDioDatabase();

if(query!=null){
  String pl = "from(bucket:\"telegraf\")\n|> range(start: 2021-12-01T00:00:00Z, stop:2023-01-01T00:00:00Z)\n|> filter(fn: (r) => r._measurement == \"HUM\" and r.id_wasp == \"SAP01\" and r._field == \"value\")\n|> drop(columns: [\"_start\", \"_stop\", \"_field\", \"host\", \"id\"])\n|> window(every: 3h)\n|> mean()\n|> duplicate(column: \"_stop\", as: \"_time\")\n|> drop(columns: [\"_start\", \"_stop\"])\n";

    final response = await dio.post('', data:pl,
          options: Options(headers: {
          "Authorization": "Token bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
           "Accept": "application/json" ,
           "Content-type": "application/vnd.flux" 


          }
           //query.headers
          ) );
         // print(jsonEncode(pl));
//print(response.data);
//print(response.data.runtimeType);
LineSplitter ls = new LineSplitter();
List <String> l = ls.convert(response.data);
var grafovi = <Graph>[];

l.removeAt(0);
for(String s in l){
if(s.length>0){
s = s.substring(1);
List<String> p = s.split(",");

Graph g = Graph(p.elementAt(0), int.parse(p.elementAt(1)), p.elementAt(2), p.elementAt(3), double.parse(p.elementAt(4)), DateTime.parse(p.elementAt(5)));
grafovi.add(g);
print(g.value);
}
}

    return grafovi;
  }
  // ignore: null_argument_to_non_null_type
  return Future<List<Graph>>.value();
  }

}
