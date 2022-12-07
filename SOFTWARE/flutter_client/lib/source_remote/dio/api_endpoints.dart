class ApiEndpoints {
  static String restUrl ="";
  ApiEndpoints._();


  static set restServerBaseUrl(String v) => restUrl = v;

  static String get authServerBaseUrl => 'https://iotat.tel.fer.hr:58443/auth';

  static String get restServerBaseUrl => restUrl;
}
