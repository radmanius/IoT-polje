import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';

import 'model/scene.dart';

abstract class SceneRepository {
  //TODO: add scene model instead of dynamic
  Future<List<ShortScene>> getScenes();

  Future<Scene> getSceneDetails(int id);
}
