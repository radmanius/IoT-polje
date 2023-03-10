import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/ui/scene/provider/graph_provider.dart';

class TableScreen extends HookConsumerWidget {
  const TableScreen(this.title, this.query, {Key? key}) : super(key: key);

  static Route route(String title, Request? query) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return TableScreen(title, query);
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
        child: (query != null)
            ? ref.watch(graphProvider).maybeWhen(
                  orElse: () => const CircularProgressIndicator(),
                  failure: (e) => Text(e.toString()),
                  success: (graph) => SingleChildScrollView(
                      physics: const BouncingScrollPhysics(),
                      scrollDirection: Axis.vertical,
                      child: DataTable(
                        columns: [
                          DataColumn(label: Text('DATE')),
                          DataColumn(label: Text('VALUE')),
                        ],
                        rows: [
                          for (Graph g in graph)
                            DataRow(cells: [
                              DataCell(Text(g.time.toString().substring(0, g.time.toString().length - 2))),
                              DataCell(Text(g.value.toString()))
                            ]),
                        ],
                      )),

                  //ListView(children:[for(Graph g in graph) Text(g.time.toString() +"     "+ g.value.toString())])
                )
            : const Text("nema grafa"),
      ),
    );
  }
}
