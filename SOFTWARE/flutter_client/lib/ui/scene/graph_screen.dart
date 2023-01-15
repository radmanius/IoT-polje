import 'package:cached_network_image/cached_network_image.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:pdp2022/ui/scene/provider/graph_provider.dart';
import 'package:pdp2022/ui/home/widget/short_scene_list_widget.dart';
import 'package:pdp2022/ui/home/widget/view_list_widget.dart';
import 'package:pdp2022/source_remote/repository/scene/model/view/view.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

import 'frontscreen.dart';


class GraphScreen extends HookConsumerWidget {

  const GraphScreen(this.title, this.query,{Key? key}) : super(key: key);
static Route route(String title, Request? query) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return GraphScreen(title,query);
      },
    );
  }

  //final int viewId;
  final String title;
final Request? query;


  @override
  Widget build(BuildContext context, WidgetRef ref) {




    DateTime today = DateTime.now();
    DateTime day = DateTime.now();
    if (a == "30 dana") {
      day = today.subtract(const Duration(days: 30));
    } else if (a == "7 dana") {
      day = today.subtract(const Duration(days: 7));
    } else if (a == "1 dan") {
      day = today.subtract(const Duration(days: 1));
    }
    print(day);
    print(a);
    query!.startDate = day;

//   String startDate = DateFormat("yyyy-MM-dd;HH:mm:ss/").format(day);
//   startDate= startDate.replaceAll(';', 'T');
//   startDate= startDate.replaceAll('/', 'Z');
// data.replaceAll("{{startTimeISO}}",startDate);
// Request? q2=Request(query!.method, query!.uri, query!.headers, data);
    return Scaffold(

      appBar: AppBar(
        title: Text(title),
      ),
      body: SafeArea(

       child: Column(children:<Widget>[
        Row(
            children:<Widget>[
              DropdownButtonExample(),
              ElevatedButton(onPressed: () => {
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => BottomNavBar(title, query, 0)))
              },child:Text('Promijeni') ),
            ]
        ),




       (query!=null)?ref.watch(graphProvider(query)).maybeWhen(
              orElse: () => const CircularProgressIndicator(),
              failure: (e) => Text(e.toString()),
            success:(graph)=>Expanded(
              child:SizedBox(
           child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
             child: AspectRatio(
      aspectRatio: 0.65,
      child: LineChart(
        LineChartData(
        //  borderData: FlBorderData(border: const Border(bottom: BorderSide(),left: BorderSide()), ),
        //   titlesData: FlTitlesData(bottomTitles: AxisTitles(sideTitles: SideTitles(interval: 10,

        //       showTitles: true,
        //    getTitlesWidget: (value, meta) {
        //    return  Text("e");
        //    },))),
            lineBarsData: [
              LineChartBarData(
                spots: (graph).map((point) => FlSpot(DateTime.parse(point.time.toString().substring(0,point.time.toString().length-2)).millisecondsSinceEpoch.toDouble(), point.value)).toList(),
                isCurved: false,
                dotData: FlDotData(
                  show: true,
                 ),
              ),
            ],
          ),
      ),
              ),
              ),
            ),
            )


//               SingleChildScrollView(
//   physics: const BouncingScrollPhysics(),
//   scrollDirection: Axis.vertical,
//   child:DataTable(
//    columns: [
//      DataColumn(label: Text('DATE')),
//      DataColumn(label: Text('VALUE')),
//    ],
//   rows: [ for(Graph g in graph)
//      DataRow(cells: [DataCell(Text(g.time.toString().substring(0,g.time.toString().length-2))), DataCell(Text(g.value.toString()))]),
//    ],
// )
//               ),             



              //ListView(children:[for(Graph g in graph) Text(g.time.toString() +"     "+ g.value.toString())])
        ):const Text("nema grafa"),

      ])),

    );
  }
}



class DropdownButtonExample extends StatefulWidget {
  const DropdownButtonExample();

  @override
  State<DropdownButtonExample> createState() => _DropdownButtonExampleState();
}
String a = "30 dana";
class _DropdownButtonExampleState extends State<DropdownButtonExample> {
  String dropdownValue="";

  String holder = '' ;
 String getValue(){
return dropdownValue;
}
  @override
  Widget build(BuildContext context) {
    return   DropdownButton<String>(
      value: a,
 
        onChanged: (String? newvalue) {
   setState(() {
        a = newvalue!;

   });
        print(a);
        },
        items: [DropdownMenuItem(child: Text("30 dana"),
        value: "30 dana",),
        DropdownMenuItem(child: Text("7 dana"),value: "7 dana",),
        DropdownMenuItem(child: Text("1 dan"),value: "1 dan",)],
                  style: TextStyle(
                      fontSize: 15.0,
                      color: Colors.black
                  ),);
  }
}