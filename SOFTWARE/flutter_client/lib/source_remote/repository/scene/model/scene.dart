import 'dart:core';

import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/key.dart';
import 'package:pdp2022/source_remote/repository/scene/model/role.dart';
import 'package:pdp2022/source_remote/repository/scene/model/tag.dart';
import 'package:pdp2022/source_remote/repository/scene/model/view.dart';

import 'layout.dart';

part 'scene.g.dart';

@JsonSerializable()
class Scene {
  Scene(
    this.id,
    this.title,
    this.subtitle,
    this.layout,
    this.pictureLink,
    this.tags,
    this.views,
    this.roles,
    this.keys,
  );

  final int id;

  final String title;
  final String subtitle;
  final Layout layout;
  final String pictureLink;
  final List<Tag> tags;
  final List<View> views;
  final List<Role> roles;
  final List<Key> keys;

  factory Scene.fromJson(Map<String, dynamic> json) => _$SceneFromJson(json);

  Map<String, dynamic> toJson() => _$SceneToJson(this);
}
