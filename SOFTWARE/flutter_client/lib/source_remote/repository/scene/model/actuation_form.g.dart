// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'actuation_form.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ActuationForm _$ActuationFormFromJson(Map<String, dynamic> json) =>
    ActuationForm(
      json['id'] as int,
      Request.fromJson(json['defaultValuesRequest'] as Map<String, dynamic>),
      Request.fromJson(json['submitFormRequest'] as Map<String, dynamic>),
      Map<String, String>.from(json['inputs'] as Map),
    );

Map<String, dynamic> _$ActuationFormToJson(ActuationForm instance) =>
    <String, dynamic>{
      'id': instance.id,
      'defaultValuesRequest': instance.defaultValuesRequest,
      'submitFormRequest': instance.submitFormRequest,
      'inputs': instance.inputs,
    };
