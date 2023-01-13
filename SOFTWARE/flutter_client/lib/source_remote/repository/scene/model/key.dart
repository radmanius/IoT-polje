import 'package:json_annotation/json_annotation.dart';

part 'key.g.dart';

@JsonSerializable()
class Key {
  Key(this.id, this.name, this.value, this.canDelete);

  final int id;
  final String name;
  final String value;
  final bool canDelete;

  factory Key.fromJson(Map<String, dynamic> json) => _$KeyFromJson(json);

  Map<String, dynamic> toJson() => _$KeyToJson(this);
}
