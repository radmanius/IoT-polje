import 'package:dio/dio.dart';
import 'package:flutter_loggy_dio/flutter_loggy_dio.dart';

Dio createDio() {
  final options = BaseOptions(
    //TODO: zamijeni ip sa ApiEndpoints.restServerBaseUrl kada server bude online
    baseUrl: 'http://192.168.0.22:8080', //ApiEndpoints.restServerBaseUrl,
    responseType: ResponseType.json,
  );

  final dio = Dio(options);

  dio.interceptors.addAll(<Interceptor>[
    LoggyDioInterceptor(requestBody: true, responseBody: true, requestHeader: true),
  ]);

  return dio;
}
