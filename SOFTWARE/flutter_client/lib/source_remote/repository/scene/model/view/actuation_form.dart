import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';

part 'actuation_form.g.dart';

@JsonSerializable()
class ActuationForm {
  ActuationForm(this.inputs,this.defaultValuesRequest,this.submitFormRequest,this.submitSelectionRequest);

 // final int id;
  final Request? defaultValuesRequest;
  final Request? submitFormRequest;
  final Request? submitSelectionRequest;
  final Map<String, dynamic> inputs;
  
  factory ActuationForm.fromJson(Map<String, dynamic> json) => _$ActuationFormFromJson(json);

  Map<String, dynamic> toJson() => _$ActuationFormToJson(this);
}
