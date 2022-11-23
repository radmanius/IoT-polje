import 'package:flutter/material.dart';
import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';

class ShortSceneCard extends StatelessWidget {
  const ShortSceneCard(this.shortScene, {Key? key}) : super(key: key);

  final ShortScene shortScene;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(shortScene.title),
      subtitle: Text(shortScene.subtitle),
    );
  }
}
