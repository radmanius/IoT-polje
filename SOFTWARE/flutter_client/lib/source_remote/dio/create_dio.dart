import 'package:dio/dio.dart';
import 'package:flutter_loggy_dio/flutter_loggy_dio.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/main.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';
import 'package:pdp2022/source_remote/dio/auth_interceptor.dart';

Dio createDioRest() {
  final options = BaseOptions(
    baseUrl: ApiEndpoints.restServerBaseUrl,
    responseType: ResponseType.json,
  );

  final dio = Dio(options);

  checkUrl(dio);

  dio.interceptors.addAll(<Interceptor>[
    LoggyDioInterceptor(requestBody: true, responseBody: true, requestHeader: true),
    AuthInterceptor(GetIt.I.get(), GetIt.I.get()),
  ]);

  return dio;
}
