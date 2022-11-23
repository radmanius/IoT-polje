import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';
import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';

import 'scene_repository.dart';

class SceneRepositoryImpl implements SceneRepository {
  SceneRepositoryImpl(this._dio);

  final Dio _dio;

  @override
  Future<List<ShortScene>> getScenes() async {
    final response = await _dio.get(ApiEndpoints.scenes);

    return (response.data as List<dynamic>).map((e) => ShortScene.fromJson(e)).toList();
  }

  @override
  Future<Scene> getSceneDetails(String id) async {
    final response = await _dio.get(ApiEndpoints.scene(id));

    throw UnimplementedError();
  }
}
