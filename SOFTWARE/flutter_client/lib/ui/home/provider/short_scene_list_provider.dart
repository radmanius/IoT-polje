import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';
import 'package:pdp2022/source_remote/repository/scene/scene_repository.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_notifier.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_state.dart';

final shortSceneListProvider =
    StateNotifierProvider.autoDispose<ShortSceneListProvider, RequestState<List<ShortScene>>>(
  (ref) => ShortSceneListProvider(
    GetIt.I.get(),
  ),
);

class ShortSceneListProvider extends RequestNotifier<List<ShortScene>> {
  ShortSceneListProvider(this._sceneRepository) {
    getScenes();
  }

  late List<ShortScene> allScenes;

  final SceneRepository _sceneRepository;

  void getScenes() async {
    executeRequest(requestBuilder: () async {
      allScenes = await _sceneRepository.getScenes();

      return allScenes;
    });
  }

  void onSearch(String query) {
    if (query.isEmpty) {
      state = RequestState.success(allScenes);
      return;
    }

    state = RequestState.success(allScenes.where((scene) => _searchFilter(scene, query)).toList());
  }

  bool _searchFilter(ShortScene scene, String query) {
    return scene.title.toLowerCase().contains(query.toLowerCase()) ||
        scene.subtitle.toLowerCase().contains(query.toLowerCase());
  }
}
