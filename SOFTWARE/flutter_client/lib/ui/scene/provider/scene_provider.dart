import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/scene/model/scene.dart';
import 'package:pdp2022/source_remote/repository/scene/scene_repository.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_notifier.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_state.dart';

final sceneProvider = StateNotifierProvider.autoDispose.family<SceneProvider, RequestState<Scene>, int>(
  (ref, sceneId) => SceneProvider(
    sceneId,
    GetIt.I.get(),
  ),
);

class SceneProvider extends RequestNotifier<Scene> {
  SceneProvider(this.sceneId, this._sceneRepository) {
    _getScene();
  }

  final int sceneId;
  final SceneRepository _sceneRepository;

  void _getScene() {
    executeRequest(requestBuilder: () => _sceneRepository.getSceneDetails(sceneId));
  }
}
