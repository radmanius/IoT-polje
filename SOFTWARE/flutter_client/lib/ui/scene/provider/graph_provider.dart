import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/scene/graph_repository.dart';
import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_notifier.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_state.dart';

final graphProvider = StateNotifierProvider.autoDispose<GraphProvider, RequestState<List<Graph>>>(
  (ref) => GraphProvider(
    GetIt.I.get(),
  ),
);

class GraphProvider extends RequestNotifier<List<Graph>> {
  GraphProvider(this._graphRepository);

  final GraphRepository _graphRepository;

  void getGraph(Request? query) {
    executeRequest(requestBuilder: () async => _graphRepository.getGraphDetails(query));
  }
}
