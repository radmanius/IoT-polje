import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/ui/scene/provider/graph_provider.dart';

import 'widget/time_period_picker.dart';

class GraphScreen extends ConsumerStatefulWidget {
  const GraphScreen(this.title, this.query, {Key? key}) : super(key: key);

  static Route route(String title, Request? query) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return GraphScreen(title, query);
      },
    );
  }

  final String title;
  final Request? query;

  @override
  ConsumerState<GraphScreen> createState() => _GraphScreenState();
}

class _GraphScreenState extends ConsumerState<GraphScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      widget.query?.startDate = DateTime.now().subtract(const Duration(days: 30));
      ref.read(graphProvider.notifier).getGraph(widget.query);
    });
    currentTimePeriod = "30 dana";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SafeArea(
          child: Column(children: <Widget>[
        TimePeriodPicker(widget.query),
        (widget.query != null)
            ? ref.watch(graphProvider).maybeWhen(
                orElse: () => const CircularProgressIndicator(),
                failure: (e) => Text(e.toString()),
                success: (graph) => Expanded(
                      child: SizedBox(
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
                                    spots: (graph)
                                        .map((point) => FlSpot(
                                            DateTime.parse(point.time
                                                    .toString()
                                                    .substring(0, point.time.toString().length - 2))
                                                .millisecondsSinceEpoch
                                                .toDouble(),
                                            point.value))
                                        .toList(),
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
                )
            : const Text("nema grafa"),
      ])),
    );
  }
}
