import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';

part 'actuation_form.g.dart';

@JsonSerializable()
class ActuationForm {
  ActuationForm(this.id, this.defaultValuesRequest, this.submitFormRequest, this.inputs);

  final int id;
  final Request defaultValuesRequest;
  final Request submitFormRequest;
  final Map<String, String> inputs;

  factory ActuationForm.fromJson(Map<String, dynamic> json) => _$ActuationFormFromJson(json);

  Map<String, dynamic> toJson() => _$ActuationFormToJson(this);
}
