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
        'https://fer.tel.iot.polje.iotpolje:/oauth2Callback',
        issuer: 'https://iotat.tel.fer.hr:58443/auth',
        scopes: ['openid', 'profile', 'email', 'offline_access', 'api'],
      ),
    );
  }
}
