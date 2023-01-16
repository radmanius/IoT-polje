import 'package:dio/dio.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_repository.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_token_persistence_manager.dart';

class AuthInterceptor extends Interceptor {
  AuthInterceptor(this._authTokenPersistenceManager, this._authRepository);

  final AuthTokenPersistenceManager _authTokenPersistenceManager;
  final AuthRepository _authRepository;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final tokenHasExpired =
        _authTokenPersistenceManager.accessTokenExpirationDateTime?.isBefore(DateTime.now()) ?? false;

    if (tokenHasExpired) {
      await _authRepository.refreshToken();
    }

    options.headers.addAll({'Authorization': 'Bearer ${_authTokenPersistenceManager.accessToken}'});
    handler.next(options);
  }
}

// Expiration date: 2023-01-16 17:57:48
