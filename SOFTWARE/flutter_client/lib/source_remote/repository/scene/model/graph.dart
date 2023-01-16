import 'dart:core';

import 'package:json_annotation/json_annotation.dart';

part 'graph.g.dart';

@JsonSerializable()
class Graph {
  Graph(
    this.result,
    this.table,
    this.measurement,
    this.idWasp,
    this.value,
    this.time,
  );

  final String result;
  final int table;
  final String measurement;
  final String? idWasp;
  final double value;
  final DateTime time;

  factory Graph.fromJson(Map<String, dynamic> json) => _$GraphFromJson(json);

  Map<String, dynamic> toJson() => _$GraphToJson(this);
}
