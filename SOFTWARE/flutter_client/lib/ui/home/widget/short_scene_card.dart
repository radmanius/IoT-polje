import 'package:flutter/material.dart';
import 'package:pdp2022/source_remote/repository/scene/model/short_scene.dart';
import 'package:pdp2022/ui/scene/scene_screen.dart';
class ShortSceneCard extends StatelessWidget {
  const ShortSceneCard(this.shortScene, {Key? key}) : super(key: key);

  final ShortScene shortScene;

  @override
  Widget build(BuildContext context) {
    return Container(
     
  decoration: BoxDecoration(
    color: Colors.white,
   
    borderRadius: BorderRadius.circular(15),
    boxShadow: [
      BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 15),
    ]
  ),
  
   child: ListTile(
  visualDensity: const VisualDensity(horizontal: -1, vertical:-1),
      title: Text(shortScene.title , style: const TextStyle(color:Colors.black87, fontWeight: FontWeight.bold,
      fontSize: 17),),
      subtitle: Text(shortScene.subtitle, style:const TextStyle(fontSize: 13,fontWeight: FontWeight.bold),),
      onTap: () => Navigator.of(context).push(SceneScreen.route(shortScene.id)),
      
    ),);
  }
}
