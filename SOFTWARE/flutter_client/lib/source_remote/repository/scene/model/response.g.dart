// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Response _$ResponseFromJson(Map<String, dynamic> json) => Response(
      json['id'] as int,
      json['dataFormat'] as String,
      json['timeColumn'] as String,
      json['valueColumn'] as String,
    );

Map<String, dynamic> _$ResponseToJson(Response instance) => <String, dynamic>{
      'id': instance.id,
      'dataFormat': instance.dataFormat,
      'timeColumn': instance.timeColumn,
      'valueColumn': instance.valueColumn,
    };
