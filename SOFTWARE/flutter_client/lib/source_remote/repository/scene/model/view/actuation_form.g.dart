// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'actuation_form.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ActuationForm _$ActuationFormFromJson(Map<String, dynamic> json) =>
    ActuationForm(
      json['inputs'] as Map<String, dynamic>,
      json['defaultValuesRequest'] == null
          ? null
          : Request.fromJson(
              json['defaultValuesRequest'] as Map<String, dynamic>),
      json['submitFormRequest'] == null
          ? null
          : Request.fromJson(json['submitFormRequest'] as Map<String, dynamic>),
      json['submitSelectionRequest'] == null
          ? null
          : Request.fromJson(
              json['submitSelectionRequest'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ActuationFormToJson(ActuationForm instance) =>
    <String, dynamic>{
      'defaultValuesRequest': instance.defaultValuesRequest,
      'submitFormRequest': instance.submitFormRequest,
      'submitSelectionRequest': instance.submitSelectionRequest,
      'inputs': instance.inputs,
    };
