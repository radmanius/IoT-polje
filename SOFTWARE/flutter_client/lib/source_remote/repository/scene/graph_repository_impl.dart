import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';

import 'model/view/view.dart';
import 'graph_repository.dart';

class GraphRepositoryImpl implements GraphRepository {
  GraphRepositoryImpl(this._dio,this.view);

  final Dio _dio;
final View view;
  @override
  Future<List<Graph>> getGraph() async {
    _dio.options.baseUrl=ApiEndpoints.databaseUrl;

    final response = await _dio.post(ApiEndpoints.graph, data:jsonEncode(view.query.payload),
          options: Options(headers: 
           view.query.headers
          ) );
print(response.data);
    return (response.data as List<dynamic>).map((e) => Graph.fromJson(e)).toList();
  }

}
