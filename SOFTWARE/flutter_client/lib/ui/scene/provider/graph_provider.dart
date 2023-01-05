import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';
import 'package:pdp2022/source_remote/repository/scene/graph_repository.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_notifier.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_state.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
final graphProvider = StateNotifierProvider.autoDispose.family<GraphProvider, RequestState<List<Graph>>, Request?>(
  (ref, viewquery) => GraphProvider(
    viewquery,
    GetIt.I.get(),
  ),
);

class GraphProvider extends RequestNotifier<List<Graph>> {
  GraphProvider(this.query, this._graphRepository) {
    _getGraph();
  }

  final Request? query;
  final GraphRepository _graphRepository;

void _getGraph() {
    executeRequest(requestBuilder: () async { 
 final data= await _graphRepository.getGraphDetails(query);
  return data;
      });
     
  }
}