import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pdp2022/source_remote/repository/scene/model/request.dart';
import 'package:pdp2022/ui/scene/provider/graph_provider.dart';

import 'widget/time_period_picker.dart';

class GraphScreen extends ConsumerStatefulWidget {
  const GraphScreen(this.title, this.query, {Key? key}) : super(key: key);

  static Route route(String title, Request? query) {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return GraphScreen(title, query);
      },
    );
  }

  final String title;
  final Request? query;

  @override
  ConsumerState<GraphScreen> createState() => _GraphScreenState();
}

class _GraphScreenState extends ConsumerState<GraphScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      widget.query?.startDate = DateTime.now().subtract(const Duration(days: 30));
      ref.read(graphProvider.notifier).getGraph(widget.query);
    });
    currentTimePeriod = "30 dana";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SafeArea(
        child: Column(
          children: <Widget>[
            TimePeriodPicker(widget.query),
            widget.query != null
                ? ref.watch(graphProvider).maybeWhen(
                      orElse: () => const CircularProgressIndicator(),
                      failure: (e) => Text(e.toString()),
                      success: (graph) => Expanded(
                        child: LineChart(
                          LineChartData(
                            lineBarsData: [
                              LineChartBarData(
                                spots: graph
                                    .map(
                                      (point) => FlSpot(
                                        point.time.millisecondsSinceEpoch.toDouble(),
                                        point.value,
                                      ),
                                    )
                                    .toList(),
                                isCurved: false,
                                dotData: FlDotData(
                                  show: true,
                                ),
                              ),
                            ],
                            borderData: FlBorderData(
                              show: false,
                            ),
                            titlesData: FlTitlesData(
                              show: true,
                              topTitles: AxisTitles(
                                axisNameSize: 10,
                                sideTitles: SideTitles(
                                  showTitles: true,
                                  getTitlesWidget: getTitlesWidget,
                                ),
                              ),
                              bottomTitles: AxisTitles(
                                axisNameSize: 30,
                                sideTitles: SideTitles(
                                  showTitles: true,
                                  getTitlesWidget: getTitlesWidget,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    )
                : const Text("nema grafa"),
          ],
        ),
      ),
    );
  }
}

Widget getTitlesWidget(double value, TitleMeta meta) {
  final datetime = DateTime.fromMillisecondsSinceEpoch(value.toInt());

  switch (currentTimePeriod) {
    case "30 dana":
      return getTitlesByMonthDays(datetime);
    case "7 dana":
      return getTitlesByWeekDays(datetime);
    case "1 dan":
      return getTitlesByHour(datetime);
    default:
      return const SizedBox.shrink();
  }
}

Widget getTitlesByMonthDays(DateTime datetime) {
  return Text('${datetime.day}.${datetime.month}.');
}

Widget getTitlesByWeekDays(DateTime dateTime) {
  final String text;

  switch (dateTime.weekday) {
    case DateTime.monday:
      text = "Pon";
      break;
    case DateTime.tuesday:
      text = "Uto";
      break;
    case DateTime.wednesday:
      text = "Sri";
      break;
    case DateTime.thursday:
      text = "Čet";
      break;
    case DateTime.friday:
      text = "Pet";
      break;
    case DateTime.saturday:
      text = "Sub";
      break;
    case DateTime.sunday:
      text = "Ned";
      break;
    default:
      text = "";
  }

  return Text(text);
}

Widget getTitlesByHour(DateTime dateTime) {
  return Text(dateTime.hour.toString() + 'h');
}
