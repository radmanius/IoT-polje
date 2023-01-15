import 'package:json_annotation/json_annotation.dart';

part 'response.g.dart';

@JsonSerializable()
class Response {
  Response(this.dataFormat, this.timeColumn, this.valueColumn);

  //final int id;
  final String dataFormat;
  final String timeColumn;
  final String valueColumn;

  factory Response.fromJson(Map<String, dynamic> json) => _$ResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ResponseToJson(this);
}