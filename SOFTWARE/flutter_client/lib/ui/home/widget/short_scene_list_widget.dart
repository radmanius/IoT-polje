import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/ui/home/provider/home_screen_presenter.dart';
import 'package:pdp2022/ui/home/widget/short_scene_card.dart';

class ShortSceneListWidget extends ConsumerWidget {
  const ShortSceneListWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ref.watch(homeScreenPresenter).when(
          initial: () => Center(child: SizedBox(width: 70, height: 70, child: CircularProgressIndicator())),
          loading: () => Center(child: SizedBox(width: 70, height: 70, child: CircularProgressIndicator())),
          failure: (error) => Text(error.toString()),
          success: (viewState) => ListView.separated(
            itemCount: viewState.shortScenes.length,
            itemBuilder: (context, index) => ShortSceneCard(viewState.shortScenes[index]),
            separatorBuilder: (BuildContext context, int index) => const Divider(),
          ),
        );
  }
}
