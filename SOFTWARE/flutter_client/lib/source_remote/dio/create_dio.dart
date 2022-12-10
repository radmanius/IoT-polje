import 'package:dio/dio.dart';
import 'package:flutter_loggy_dio/flutter_loggy_dio.dart';
import 'package:pdp2022/main.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';

Dio createDio() {
  final options = BaseOptions(
    //TODO: zamijeni ip sa ApiEndpoints.restServerBaseUrl kada server bude online
    baseUrl: ApiEndpoints.restServerBaseUrl, //ApiEndpoints.restServerBaseUrl,
    responseType: ResponseType.json,
  );

  final dio = Dio(options);
  checkUrl(dio);
  dio.interceptors.addAll(<Interceptor>[
    LoggyDioInterceptor(requestBody: true, responseBody: true, requestHeader: true),
  ]);

  return dio;
}
