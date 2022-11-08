import 'package:dio/dio.dart';
import 'package:flutter_appauth/flutter_appauth.dart';

import 'auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl(this._dio);

  final Dio _dio;

  @override
  Future<bool> isLoggedIn() async {
    // TODO: implement isLoggedIn

    // get token from safe storage

    // check if it's valid

    return false;
  }

  @override
  Future<void> login() async {
    const appAuth = FlutterAppAuth();

    final result = await appAuth.authorizeAndExchangeCode(
      AuthorizationTokenRequest(
        'mobile-keycloak',
        'fer.tel.iot.polje.iotpolje:/oauth2Callback',
        discoveryUrl: 'https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration',
      ),
    );
  }
}
