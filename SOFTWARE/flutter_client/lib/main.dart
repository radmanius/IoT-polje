import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_repository.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_token_persistence_manager.dart';
import 'package:pdp2022/ui/home/home_screen.dart';
import 'package:pdp2022/ui/login/login_screen.dart';

import '../../domain/di/inject_dependencies.dart' as domain;
import '../../source_remote/di/inject_dependencies.dart' as source_remote;
import 'ui/login/settings_form.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

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
    ProviderScope(
      child: MaterialApp(
        home: firstScreen,
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.lightGreen,
        ),
      ),
    ),
  );
}

void _injectDependencies() {
  final getIt = GetIt.instance;

  source_remote.injectDependencies(getIt);
  domain.injectDependencies(getIt);
}

Future<void> checkUrl(Dio dio) async {
  String? restBaseUrl = await secureStorage.readSecureData('restServerBaseUrl');
  if (restBaseUrl != null) {
    if (restBaseUrl != '') {
      dio.options.baseUrl = restBaseUrl;
    }
  }
}
