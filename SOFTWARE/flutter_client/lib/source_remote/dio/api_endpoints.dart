class ApiEndpoints {
  ApiEndpoints._();

  static String get authServerBaseUrl => 'https://iotat.tel.fer.hr:58443/auth';

  static String get restServerBaseUrl => 'https://iotat.tel.fer.hr:58443/api';

  static String get scenes => '/scene';

  static String scene(String id) => '/scene/$id';
}
