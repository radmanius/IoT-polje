import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/ui/home/provider/home_screen_presenter.dart';

import 'widget/short_scene_list_widget.dart';

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
    final tags = ref.watch(homeScreenPresenter).whenOrNull(success: (viewState) => viewState.tags);
    final selectedTags = ref.watch(homeScreenPresenter).whenOrNull(success: (viewState) => viewState.selectedTags);

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'iOT vrt',
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            children: [
              const SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Pretraga',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                ),
                onChanged: (query) => ref.read(homeScreenPresenter.notifier).onSearch(query),
              ),
              const SizedBox(height: 20),
              const Text('Filtriraj po tagovima:'),
              if (tags != null && selectedTags != null)
                Wrap(
                  children: tags
                      .map(
                        (e) => Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 3),
                          child: FilterChip(
                            label: Text(e),
                            selected: selectedTags.contains(e),
                            showCheckmark: false,
                            onSelected: (selected) => ref.read(homeScreenPresenter.notifier).onTagPressed(e, selected),
                            elevation: 5,
                            selectedColor: Theme.of(context).primaryColor,
                            disabledColor: Colors.grey,
                          ),
                        ),
                      )
                      .toList(),
                ),
              const SizedBox(height: 20),
              const Text('Scene:'),
              const Expanded(
                child: ShortSceneListWidget(),
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}
