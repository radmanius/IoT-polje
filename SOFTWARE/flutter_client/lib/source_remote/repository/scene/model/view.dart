import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/actuation_form.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/source_remote/repository/scene/model/response.dart';
part 'view.g.dart';

@JsonSerializable()
class View {
  View(this.id, this.title, this.viewType,this.measurementUnit,this.selectForm,this.query,this.responseExtracting);

  final int id;
  final String title;
  final String viewType;
  final String measurementUnit;
  final ActuationForm selectForm;
  final Request query;
  final Response responseExtracting;

  factory View.fromJson(Map<String, dynamic> json) => _$ViewFromJson(json);

  Map<String, dynamic> toJson() => _$ViewToJson(this);
}