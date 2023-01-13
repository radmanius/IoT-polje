import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';
import 'package:pdp2022/source_remote/repository/scene/scene_repository.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_notifier.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_state.dart';

final homeScreenPresenter = StateNotifierProvider.autoDispose<HomeScreenPresenter, RequestState<HomeScreenViewState>>(
  (ref) => HomeScreenPresenter(
    GetIt.I.get(),
  ),
);

class HomeScreenPresenter extends RequestNotifier<HomeScreenViewState> {
  HomeScreenPresenter(this._sceneRepository) {
    getScenes();
  }

  late List<ShortScene> allScenes;

  final SceneRepository _sceneRepository;

  void getScenes() async {
    executeRequest(requestBuilder: () async {
      allScenes = await _sceneRepository.getScenes();

      final Set<String> tags = {};

      for (var e in allScenes) {
        tags.addAll(e.tags.map((e) => e.name));
      }

      return HomeScreenViewState(tags: tags.toList(), shortScenes: allScenes, selectedTags: tags.toList());
    });
  }

  void onSearch(String query) {
    if (query.isEmpty) {
      state = RequestState.success(HomeScreenViewState(
        tags: state.value!.tags,
        shortScenes: allScenes,
        selectedTags: state.value!.selectedTags,
      ));
      return;
    }

    final newScenes = allScenes.where((scene) => _searchFilter(scene, query)).toList();

    final Set<String> selectedTags = {};

    for (var e in newScenes) {
      selectedTags.addAll(e.tags.map((e) => e.name));
    }

    state = RequestState.success(HomeScreenViewState(
      tags: state.value!.tags,
      shortScenes: newScenes,
      selectedTags: selectedTags.toList(),
    ));
  }

  bool _searchFilter(ShortScene scene, String query) {
    return scene.title.toLowerCase().contains(query.toLowerCase()) ||
        scene.subtitle.toLowerCase().contains(query.toLowerCase());
  }

  void onTagPressed(String tag, bool selected) {
    final selectedTags = state.value!.selectedTags;

    if (selected) {
      selectedTags.add(tag);
    } else {
      selectedTags.remove(tag);
    }

    final newScenes = allScenes.where((scene) => scene.tags.any((tag) => selectedTags.contains(tag.name))).toList();

    state = RequestState.success(HomeScreenViewState(
      tags: state.value!.tags,
      shortScenes: newScenes,
      selectedTags: selectedTags,
    ));
  }
}

class HomeScreenViewState {
  HomeScreenViewState({
    required this.tags,
    required this.shortScenes,
    required this.selectedTags,
  });

  final List<String> tags;
  final List<ShortScene> shortScenes;
  final List<String> selectedTags;
}
