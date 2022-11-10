import 'package:flutter_appauth/flutter_appauth.dart';

import 'auth_repository.dart';
import 'auth_token_persistence_manager.dart';

class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl(this._authTokenPersistenceManager);

  final AuthTokenPersistenceManager _authTokenPersistenceManager;

  @override
  Future<bool> isLoggedIn() async {
    return _authTokenPersistenceManager.accessToken != null && _authTokenPersistenceManager.refreshToken != null;
  }

  @override
  Future<void> login() async {
    const appAuth = FlutterAppAuth();

    final authorizationTokenResponse = await appAuth.authorizeAndExchangeCode(
      AuthorizationTokenRequest(
        'mobile-keycloak',
        'fer.tel.iot.polje.iotpolje:/oauth2Callback',
        discoveryUrl: 'https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration',
      ),
    );

    if (authorizationTokenResponse == null) {
      return;
    }

    await _authTokenPersistenceManager.saveToken(
      authorizationTokenResponse.accessToken!,
      authorizationTokenResponse.refreshToken!,
      authorizationTokenResponse.accessTokenExpirationDateTime!,
    );
  }
}
