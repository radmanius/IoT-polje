// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Request _$RequestFromJson(Map<String, dynamic> json) => Request(
      json['method'] as String,
      json['URI'] as String,
      Map<String, String>.from(json['headers'] as Map),
      json['payload'] as String,
      json['startDate'] == null
          ? null
          : DateTime.parse(json['startDate'] as String),
    );

Map<String, dynamic> _$RequestToJson(Request instance) => <String, dynamic>{
      'method': instance.method,
      'URI': instance.uri,
      'headers': instance.headers,
      'payload': instance.payload,
      'startDate': instance.startDate?.toIso8601String(),
    };
