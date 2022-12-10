import 'package:flutter/material.dart';
import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';
import 'package:pdp2022/ui/scene/scene_screen.dart';

class ShortSceneCard extends StatelessWidget {
  const ShortSceneCard(this.shortScene, {Key? key}) : super(key: key);

  final ShortScene shortScene;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 10),
      child: InkWell(
        onTap: () => Navigator.of(context).push(SceneScreen.route(shortScene.id)),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 7),
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor.withOpacity(0.2),
            borderRadius: const BorderRadius.all(Radius.circular(10)),
            border: Border.all(color: Theme.of(context).primaryColor),
          ),
          child: Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(shortScene.title),
                  Text('Tag: ' + shortScene.tags.map((e) => e.name).join(', ')),
                ],
              ),
              const Spacer(),
              const Icon(
                Icons.arrow_forward,
                size: 31,
              )
            ],
          ),
        ),
      ),
    );
  }
}
