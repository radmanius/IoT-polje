import 'package:dio/dio.dart';
import 'package:flutter_loggy_dio/flutter_loggy_dio.dart';
import 'package:pdp2022/main.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';

Dio createDio() {
  final options = BaseOptions(
    baseUrl: ApiEndpoints.databaseUrl, //ApiEndpoints.restServerBaseUrl,
    responseType: ResponseType.json,
  );

  final dio = Dio(options);

  dio.interceptors.addAll(<Interceptor>[
    LoggyDioInterceptor(requestBody: true, responseBody: true, requestHeader: true),
  ]);

  return dio;
}
