import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/ui/scene/provider/graph_provider.dart';

class TimePeriodPicker extends ConsumerStatefulWidget {
  const TimePeriodPicker(this.query);

  final Request? query;

  @override
  ConsumerState<TimePeriodPicker> createState() => _TimePeriodPickerState();
}

String currentTimePeriod = "30 dana";

class _TimePeriodPickerState extends ConsumerState<TimePeriodPicker> {
  String dropdownValue = "";

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      value: currentTimePeriod,
      onChanged: (String? newvalue) {
        currentTimePeriod = newvalue!;
        setState(() {});

        DateTime today = DateTime.now();
        DateTime startday;

        if (newvalue == "7 dana") {
          startday = today.subtract(const Duration(days: 7));
        } else if (newvalue == "1 dan") {
          startday = today.subtract(const Duration(days: 1));
        } else {
          startday = today.subtract(const Duration(days: 30));
        }

        widget.query?.startDate = startday;
        ref.read(graphProvider.notifier).getGraph(widget.query);
      },
      items: const [
        DropdownMenuItem(
          value: "30 dana",
          child: Text("30 dana"),
        ),
        DropdownMenuItem(
          value: "7 dana",
          child: Text("7 dana"),
        ),
        DropdownMenuItem(
          value: "1 dan",
          child: Text("1 dan"),
        )
      ],
      style: const TextStyle(fontSize: 15.0, color: Colors.black),
    );
  }
}
