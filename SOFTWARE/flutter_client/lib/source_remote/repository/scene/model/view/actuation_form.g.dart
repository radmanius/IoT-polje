// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'actuation_form.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ActuationForm _$ActuationFormFromJson(Map<String, dynamic> json) =>
    ActuationForm(
      json['id'] as int,
      Map<String, String>.from(json['inputs'] as Map),
    );

Map<String, dynamic> _$ActuationFormToJson(ActuationForm instance) =>
    <String, dynamic>{
      'id': instance.id,
      'inputs': instance.inputs,
    };
