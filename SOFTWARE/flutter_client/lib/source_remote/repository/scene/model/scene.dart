import 'dart:core';

import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/view/view.dart';

part 'scene.g.dart';

@JsonSerializable()
class Scene {
  Scene(
    this.title,
    this.subtitle,
    this.layout,
    this.pictureLink,
    this.tags,
    this.views,
    this.roles,
    this.keys,
  );

  final String title;
  final String subtitle;
  final String layout;
  final String pictureLink;
  final List<String> tags;
  final List<View> views;
  final List<String> roles;
  final List<String> keys;

  factory Scene.fromJson(Map<String, dynamic> json) => _$SceneFromJson(json);

  Map<String, dynamic> toJson() => _$SceneToJson(this);
}
