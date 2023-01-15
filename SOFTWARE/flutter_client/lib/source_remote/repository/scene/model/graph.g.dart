// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'graph.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Graph _$GraphFromJson(Map<String, dynamic> json) => Graph(
      json['result'] as String,
      json['table'] as int,
      json['measurement'] as String,
      json['idWasp'] as String,
      (json['value'] as num).toDouble(),
      DateTime.parse(json['time'] as String),
    );

Map<String, dynamic> _$GraphToJson(Graph instance) => <String, dynamic>{
      'result': instance.result,
      'table': instance.table,
      'measurement': instance.measurement,
      'idWasp': instance.idWasp,
      'value': instance.value,
      'time': instance.time.toIso8601String(),
    };
