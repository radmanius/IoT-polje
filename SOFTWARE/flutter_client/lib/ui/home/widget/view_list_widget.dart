import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/ui/home/provider/short_scene_list_provider.dart';
import 'package:pdp2022/ui/home/widget/view_cart.dart';
import 'package:pdp2022/source_remote/repository/scene/model/view/view.dart';
class ViewListWidget extends ConsumerWidget {
  final List<View> views;
  const ViewListWidget({Key? key, required this.views}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return  ListView.separated(
            itemCount: views.length,
            itemBuilder: (context, index) => ViewCart(views[index]),
            separatorBuilder: (BuildContext context, int index) => const Divider(),
          );
       
  }
}