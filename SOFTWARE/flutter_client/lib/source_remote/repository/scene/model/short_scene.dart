import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/tag.dart';

part 'short_scene.g.dart';

@JsonSerializable()
class ShortScene {
  ShortScene(this.id, this.title, this.subtitle, this.tags);

  final int id;
  final String title;
  final String subtitle;
  final List<String> tags;

  factory ShortScene.fromJson(Map<String, dynamic> json) => _$ShortSceneFromJson(json);

  Map<String, dynamic> toJson() => _$ShortSceneToJson(this);
}
