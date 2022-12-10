// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'view.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

View _$ViewFromJson(Map<String, dynamic> json) => View(
      json['id'] as int,
      json['title'] as String,
      json['viewType'] as String,
      json['measurementUnit'] as String,
      ActuationForm.fromJson(json['selectForm'] as Map<String, dynamic>),
      Request.fromJson(json['query'] as Map<String, dynamic>),
      Response.fromJson(json['responseExtracting'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ViewToJson(View instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'viewType': instance.viewType,
      'measurementUnit': instance.measurementUnit,
      'selectForm': instance.selectForm,
      'query': instance.query,
      'responseExtracting': instance.responseExtracting,
    };
