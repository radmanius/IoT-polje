import 'package:pdp2022/source_remote/repository/scene/model/graph.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';



abstract class GraphRepository {
  //TODO: add scene model instead of dynamic
  Future<List<Graph>> getGraphDetails(Request? query);

}

