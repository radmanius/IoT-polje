import 'package:dio/dio.dart';

import 'scene_repository.dart';

class SceneRepositoryImpl implements SceneRepository {
  SceneRepositoryImpl(this._dio);

  final Dio _dio;

  @override
  Future<List> getScenes() async {
    final response = await _dio.get('/scenes???');

    // TODO: implement getScenes
    throw UnimplementedError();
  }
}