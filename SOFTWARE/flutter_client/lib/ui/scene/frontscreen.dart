import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pdp2022/ui/scene/provider/graph_provider.dart';
import 'package:pdp2022/ui/home/widget/short_scene_list_widget.dart';
import 'package:pdp2022/ui/home/widget/view_list_widget.dart';
import 'package:pdp2022/source_remote/repository/scene/model/view/view.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:pdp2022/ui/scene/graph_screen.dart';
import 'package:pdp2022/ui/scene/table_screen.dart';


class BottomNavBar extends StatefulWidget {
final int index;
  const BottomNavBar(this.title, this.query,this.index,{Key? key}) : super(key: key);
static Route route(String title, Request? query,int index) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return BottomNavBar(title,query,index);
      },
    );
  }

  //final int viewId;
  final String title;
final Request? query;

  @override
  _BottomNavBarState createState() => _BottomNavBarState(title,query);
}

class _BottomNavBarState extends State<BottomNavBar> {
 _BottomNavBarState(this.title, this.query);
   final String title;
final Request? query;
  int _selectedIndex=0;

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.index;
  }

  // Screens
 

  @override
  Widget build(BuildContext context) {
    final List<Widget> _screens = [
   GraphScreen(title,query),
    TableScreen(title,query),
  ];

  
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(
            top: BorderSide(
              color: Colors.black38,
              width: 0.2,
            ),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          type: BottomNavigationBarType.fixed,
          showSelectedLabels: false,
          showUnselectedLabels: false,
          selectedIconTheme: const IconThemeData(
        
          ),
          unselectedIconTheme: const IconThemeData(
            color: Color.fromRGBO(202, 205, 219, 1),
          ),
          onTap: (index) {
            // TODO If the current screen is home page and we tap the home button
            if (_selectedIndex == 0 && index == 0) {

            }
            setState(() {
              _selectedIndex = index;
            });
          },
          items: const [
            BottomNavigationBarItem(
              label: "GRAPH",
              icon: Icon(
               Icons.show_chart,
              ),
            ),
            BottomNavigationBarItem(
              label: "TABLE",
              icon: Icon(
               Icons.grid_on,
              ),
            ),
          ],
        ),
      ),
    );
  }
}