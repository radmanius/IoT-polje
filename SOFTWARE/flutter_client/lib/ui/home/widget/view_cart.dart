import 'package:flutter/material.dart';
import 'package:pdp2022/source_remote/repository/scene/model/view/view.dart';
import 'package:pdp2022/ui/scene/frontscreen.dart';

class ViewCart extends StatelessWidget {
  const ViewCart(this.view, {Key? key}) : super(key: key);

  final View view;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 15),
        ],
      ),
      child: ListTile(
        visualDensity: const VisualDensity(horizontal: -1, vertical: -1),
        title: Text(
          view.title,
          style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.bold, fontSize: 17),
        ),
        onTap: () => Navigator.of(context).push(BottomNavBar.route(view.title, view.query, 0)),
      ),
    );
  }
}
