import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_repository.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_token_persistence_manager.dart';
import 'package:pdp2022/ui/home/home_screen.dart';
import 'package:pdp2022/ui/login/login_screen.dart';

import '../../domain/di/inject_dependencies.dart' as domain;
import '../../source_remote/di/inject_dependencies.dart' as source_remote;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  _lockOrientation();

  _injectDependencies();

  final Widget firstScreen;

  await GetIt.I.get<AuthTokenPersistenceManager>().loadTokenFromDisc();

  final isLoggedIn = await GetIt.I.get<AuthRepository>().isLoggedIn();

  if (isLoggedIn) {
    firstScreen = const HomeScreen();
  } else {
    firstScreen = const LoginScreen();
  }

  runApp(
    MaterialApp(
      home: ProviderScope(
        child: firstScreen,
      ),
      theme: ThemeData(
        primarySwatch: Colors.lightGreen,
      ),
    ),
  );
}

void _lockOrientation() {
  SystemChrome.setPreferredOrientations(<DeviceOrientation>[
    DeviceOrientation.portraitDown,
    DeviceOrientation.portraitUp,
  ]);
}

void _injectDependencies() {
  final getIt = GetIt.instance;

  source_remote.injectDependencies(getIt);
  domain.injectDependencies(getIt);
}
