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
    final tags = ref.watch(homeScreenPresenter).whenOrNull(success: (viewState) => viewState.tags);
    final selectedTags = ref.watch(homeScreenPresenter).whenOrNull(success: (viewState) => viewState.selectedTags);

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
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              TextField(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Pretraga',
                ),
                onChanged: (query) => ref.read(homeScreenPresenter.notifier).onSearch(query),
              ),
              const Text('Filtriraj po tagovima:'),
              if (tags != null && selectedTags != null)
                Wrap(
                  children: tags
                      .map(
                        (e) => FilterChip(
                          label: Text(e),
                          selected: selectedTags.contains(e),
                          showCheckmark: false,
                          onSelected: (selected) => ref.read(homeScreenPresenter.notifier).onTagPressed(e, selected),
                          elevation: 5,
                          selectedColor: Theme.of(context).primaryColor,
                          disabledColor: Colors.grey,
                        ),
                      )
                      .toList(),
                ),
              const Expanded(
                child: ShortSceneListWidget(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
