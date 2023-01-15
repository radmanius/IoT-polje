// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'view.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

View _$ViewFromJson(Map<String, dynamic> json) => View(
      json['title'] as String,
      json['viewType'] as String,
      json['measurementUnit'] as String?,
      json['selectForm'] == null
          ? null
          : ActuationForm.fromJson(json['selectForm'] as Map<String, dynamic>),
      json['query'] == null
          ? null
          : Request.fromJson(json['query'] as Map<String, dynamic>),
      json['responseExtracting'] == null
          ? null
          : Response.fromJson(
              json['responseExtracting'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ViewToJson(View instance) => <String, dynamic>{
      'title': instance.title,
      'viewType': instance.viewType,
      'measurementUnit': instance.measurementUnit,
      'selectForm': instance.selectForm,
      'query': instance.query,
      'responseExtracting': instance.responseExtracting,
    };
