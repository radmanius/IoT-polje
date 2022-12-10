import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/ui/home/provider/short_scene_list_provider.dart';
import 'package:pdp2022/ui/home/widget/short_scene_card.dart';

class ShortSceneListWidget extends ConsumerWidget {
  const ShortSceneListWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ref.watch(shortSceneListProvider).when(
          initial: () => const CircularProgressIndicator(),
          loading: () => const CircularProgressIndicator(),
          failure: (error) => Text(error.toString()),
          success: (scenes) => ListView.builder(
            itemCount: scenes.length,
            itemBuilder: (context, index) => ShortSceneCard(scenes[index]),
          ),
        );
  }
}
