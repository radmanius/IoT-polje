// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'view.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

View _$ViewFromJson(Map<String, dynamic> json) => View(
      json['id'] as int,
      json['title'] as String,
      json['viewType'] as String,
      ActuationForm.fromJson(json['form'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ViewToJson(View instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'viewType': instance.viewType,
      'form': instance.form,
    };
