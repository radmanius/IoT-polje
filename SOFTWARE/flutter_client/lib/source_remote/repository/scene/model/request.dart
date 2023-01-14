import 'package:json_annotation/json_annotation.dart';

part 'request.g.dart';

@JsonSerializable()
class Request {
  Request(this.method, this.uri, this.headers, this.payload, this.startDate);

  //final int id;
  final String method;
  @JsonKey(name: 'URI')
  final String uri;
  final Map<String, String> headers;
  final String payload;
  DateTime? startDate;

  factory Request.fromJson(Map<String, dynamic> json) => _$RequestFromJson(json);

  Map<String, dynamic> toJson() => _$RequestToJson(this);
}
