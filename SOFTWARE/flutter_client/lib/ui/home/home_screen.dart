import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/ui/home/provider/short_scene_list_provider.dart';
import 'package:pdp2022/ui/home/widget/short_scene_list_widget.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return const HomeScreen();
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Scenes",
        ),
        actions: [
          IconButton(
            onPressed: () {
              //TODO: go to account screen
            },
            icon: const Icon(Icons.account_circle_outlined),
          )
        ],
      ),
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              decoration: InputDecoration(labelText: 'Pretraga'),
              onChanged: (query) => ref.read(shortSceneListProvider.notifier).onSearch(query),
            ),
            const Expanded(
              child: ShortSceneListWidget(),
            ),
          ],
        ),
      ),
    );
  }
}
