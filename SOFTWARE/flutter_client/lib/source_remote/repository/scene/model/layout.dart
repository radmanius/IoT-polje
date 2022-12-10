import 'package:json_annotation/json_annotation.dart';

part 'layout.g.dart';

@JsonSerializable()
class Layout {
  Layout(this.id, this.name);

  final int id;
  final String name;

  factory Layout.fromJson(Map<String, dynamic> json) => _$LayoutFromJson(json);

  Map<String, dynamic> toJson() => _$LayoutToJson(this);
}
