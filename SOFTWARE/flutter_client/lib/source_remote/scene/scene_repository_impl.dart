import 'package:dio/dio.dart';
import 'package:pdp2022/source_remote/scene/scene_repository.dart';

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
