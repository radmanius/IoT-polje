import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';
import 'package:pdp2022/source_remote/dio/dio_database.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_token_persistence_manager.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';

import 'model/request.dart';
import 'model/view/view.dart';
import 'graph_repository.dart';
import  'package:intl/intl.dart';

class GraphRepositoryImpl implements GraphRepository {
  GraphRepositoryImpl();



  @override
  Future<List<Graph>> getGraphDetails(Request? query) async {
    final dio=createDioDatabase();

if(query!=null){
  String data = query.payload;
  String window = "2h";
  data = data.replaceAll('{{aggregationWindow}}', window);

  DateTime today = DateTime.now();
  String endDate = DateFormat("yyyy-MM-dd;HH:mm:ss/").format(today);
  endDate= endDate.replaceAll(';', 'T');
  endDate= endDate.replaceAll('/', 'Z');
  data = data.replaceAll('{{endTimeISO}}', endDate);

  DateTime day = today.subtract(const Duration(days:1));
  DateTime week = today.subtract(const Duration(days:7));
  DateTime month = today.subtract(const Duration(days:30));
  String startDate = DateFormat("yyyy-MM-dd;HH:mm:ss/").format(day);
  startDate= startDate.replaceAll(';', 'T');
  startDate= startDate.replaceAll('/', 'Z');
  data = data.replaceAll('{{startTimeISO}}', startDate);

    final response = await dio.post('', data:data,
          options: Options(headers: {
          "Authorization": "Token bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
           "Accept": "application/json" ,
           "Content-type": "application/vnd.flux",
          // "Token":   GetIt.I.get<AuthTokenPersistenceManager>().accessToken
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
}
}

    return grafovi;
  }
  // ignore: null_argument_to_non_null_type
  return Future<List<Graph>>.value();
  }

}
