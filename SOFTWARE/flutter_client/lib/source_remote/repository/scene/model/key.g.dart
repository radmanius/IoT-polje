// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'key.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Key _$KeyFromJson(Map<String, dynamic> json) => Key(
      json['id'] as int,
      json['name'] as String,
      json['value'] as String,
      json['canDelete'] as bool,
    );

Map<String, dynamic> _$KeyToJson(Key instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'value': instance.value,
      'canDelete': instance.canDelete,
    };
