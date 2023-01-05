// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'scene.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Scene _$SceneFromJson(Map<String, dynamic> json) => Scene(
      json['id'] as int,
      json['title'] as String,
      json['subtitle'] as String,
      json['layout'] as String,
      json['pictureLink'] as String,
      (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
      (json['views'] as List<dynamic>)
          .map((e) => View.fromJson(e as Map<String, dynamic>))
          .toList(),
      (json['roles'] as List<dynamic>).map((e) => e as String).toList(),
      (json['keys'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$SceneToJson(Scene instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'layout': instance.layout,
      'pictureLink': instance.pictureLink,
      'tags': instance.tags,
      'views': instance.views,
      'roles': instance.roles,
      'keys': instance.keys,
    };
