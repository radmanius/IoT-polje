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


class TableScreen extends HookConsumerWidget {
  
  const TableScreen(this.title, this.query,{Key? key}) : super(key: key);

  static Route route(String title, Request? query) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return TableScreen(title,query);
      },
    );
  }

  //final int viewId;
  final String title;
final Request? query;


  @override
  Widget build(BuildContext context, WidgetRef ref) {


    return Scaffold(

      appBar: AppBar(
        title: Text(title),
      ),
      body: SafeArea(
       child: (query!=null)?ref.watch(graphProvider(query)).maybeWhen(
              orElse: () => const CircularProgressIndicator(),
              failure: (e) => Text(e.toString()),
            success:(graph)=>
      
              
              SingleChildScrollView(
  physics: const BouncingScrollPhysics(),
  scrollDirection: Axis.vertical,
  child:DataTable(
   columns: [
     DataColumn(label: Text('DATE')),
     DataColumn(label: Text('VALUE')),
   ],
  rows: [ for(Graph g in graph)
     DataRow(cells: [DataCell(Text(g.time.toString().substring(0,g.time.toString().length-2))), DataCell(Text(g.value.toString()))]),
   ],
)
              ),             
              
              
              
              //ListView(children:[for(Graph g in graph) Text(g.time.toString() +"     "+ g.value.toString())])
        ):const Text("nema grafa"),
      
      ),

    );
  }
}
