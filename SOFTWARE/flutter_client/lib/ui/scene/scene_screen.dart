import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
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
    useEffect(() {
      print('hej');
      
    });

    return Scaffold(
       
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(sceneId.toString()),
            ref.watch(sceneProvider(sceneId)).when(
                  initial: () => const CircularProgressIndicator(),
                  loading: () => const CircularProgressIndicator(),
                  failure: (e) => Text("nema"),
                  success: (scene) {
                    //return Text(scene.title);
                   
                    return Container(
                      alignment: Alignment.topCenter,
                     // color: Colors.blueGrey,
                      height:MediaQuery.of(context).size.height*0.8,
                      width: MediaQuery.of(context).size.width,
                    
                   child: Text(scene.title,textAlign: TextAlign.center,

                   
                  style: const TextStyle(
              fontSize: 30,
            ), ),
    
            
                    );
       
                    
                  
                  },
                ),
  
          ],
        ),
      ),
    );
  }
}
