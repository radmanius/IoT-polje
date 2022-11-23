import 'package:json_annotation/json_annotation.dart';
import 'package:pdp2022/source_remote/repository/scene/model/actuation_form.dart';

part 'view.g.dart';

@JsonSerializable()
class View {
  View(this.id, this.title, this.viewType, this.form);

  final int id;
  final String title;
  final String viewType;
  final ActuationForm form;

  factory View.fromJson(Map<String, dynamic> json) => _$ViewFromJson(json);

  Map<String, dynamic> toJson() => _$ViewToJson(this);
}
