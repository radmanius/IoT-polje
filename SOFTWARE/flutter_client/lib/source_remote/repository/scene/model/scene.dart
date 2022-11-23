import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/tag.dart';

part 'scene.g.dart';

@JsonSerializable()
class Scene {
  Scene(this.id, this.title, this.subtitle, this.tags);

  final int id;

  final String title;

  final String subtitle;

  final List<Tag> tags;

  factory Scene.fromJson(Map<String, dynamic> json) => _$SceneFromJson(json);

  Map<String, dynamic> toJson() => _$SceneToJson(this);
}
