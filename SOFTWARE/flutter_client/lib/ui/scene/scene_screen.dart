import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pdp2022/ui/scene/provider/scene_provider.dart';

class SceneScreen extends HookConsumerWidget {
  const SceneScreen._(this.sceneId, {Key? key}) : super(key: key);

  static Route route(int sceneId) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return SceneScreen._(sceneId);
      },
    );
  }

  final int sceneId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: Text(ref.watch(sceneProvider(sceneId)).whenOrNull(success: (scene) => scene.title) ?? ''),
      ),
      body: SafeArea(
        child: ref.watch(sceneProvider(sceneId)).maybeWhen(
              orElse: () => const CircularProgressIndicator(),
              failure: (e) => Text(e.toString()),
              success: (scene) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CachedNetworkImage(
                      imageUrl: scene.pictureLink,
                      placeholder: (context, url) => const CircularProgressIndicator(),
                    ),
                    Text(scene.subtitle),
                  ],
                ),
              ),
            ),
      ),
    );
  }
}
