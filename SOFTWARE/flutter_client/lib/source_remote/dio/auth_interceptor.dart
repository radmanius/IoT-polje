import 'package:dio/dio.dart';
import 'package:pdp2022/source_remote/repository/auth/auth_token_persistence_manager.dart';

class AuthInterceptor extends Interceptor {
  AuthInterceptor(this._authTokenPersistenceManager);

  final AuthTokenPersistenceManager _authTokenPersistenceManager;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    options.headers.addAll({'Authorization': 'Bearer ${_authTokenPersistenceManager.accessToken}'});
    handler.next(options);
  }
}
