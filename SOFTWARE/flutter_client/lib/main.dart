import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get_it/get_it.dart';

import '../../domain/di/inject_dependencies.dart' as domain;
import '../../source_remote/di/inject_dependencies.dart' as source_remote;

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  _lockOrientation();

  _injectDependencies();
}

void _lockOrientation() {
  SystemChrome.setPreferredOrientations(<DeviceOrientation>[
    DeviceOrientation.portraitDown,
    DeviceOrientation.portraitUp,
  ]);
}

void _injectDependencies() {
  final getIt = GetIt.instance;

  domain.injectDependencies(getIt);
  source_remote.injectDependencies(getIt);
}
