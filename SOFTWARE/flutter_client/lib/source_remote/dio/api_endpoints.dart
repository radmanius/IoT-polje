class ApiEndpoints {
  ApiEndpoints._();

  static String get authServerBaseUrl => 'https://iotat.tel.fer.hr:58443/auth';

  static String get restServerBaseUrl => 'https://iotat.tel.fer.hr:58443/rest2';

  static String get databaseUrl => 'https://iotat.tel.fer.hr:57786/api/v2/query?org=fer';

  static String get scenes => '/scene';
  static String get graph => '/graph';

  static String scene(int id) => '/scene/$id';
}
