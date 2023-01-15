// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'short_scene.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ShortScene _$ShortSceneFromJson(Map<String, dynamic> json) => ShortScene(
      json['id'] as int,
      json['title'] as String,
      json['subtitle'] as String,
      (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$ShortSceneToJson(ShortScene instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'tags': instance.tags,
    };
