import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const _accessTokenKey = 'access_token';
const _refreshTokenKey = 'refresh_token';
const _accessTokenExpirationDateTimeKey = 'access_token_expiration_date_time';

class AuthTokenPersistenceManager {
  AuthTokenPersistenceManager(this._flutterSecureStorage);

  final FlutterSecureStorage _flutterSecureStorage;

  String? get accessToken => _accessToken;
  String? _accessToken;

  String? get refreshToken => _refreshToken;
  String? _refreshToken;

  DateTime? get accessTokenExpirationDateTime => _accessTokenExpirationDateTime;
  DateTime? _accessTokenExpirationDateTime;

  Future<void> saveToken(String accessToken, String refreshToken, DateTime accessTokenExpirationDateTime) async {
    await _flutterSecureStorage.write(key: _accessTokenKey, value: accessToken);
    await _flutterSecureStorage.write(key: _refreshTokenKey, value: refreshToken);
    await _flutterSecureStorage.write(
      key: _accessTokenExpirationDateTimeKey,
      value: accessTokenExpirationDateTime.millisecondsSinceEpoch.toString(),
    );

    _accessToken = accessToken;
    _refreshToken = refreshToken;
    _accessTokenExpirationDateTime = _accessTokenExpirationDateTime;
  }

  Future<void> loadTokenFromDisc() async {
    _accessToken = await _flutterSecureStorage.read(key: _accessTokenKey);
    _refreshToken = await _flutterSecureStorage.read(key: _refreshTokenKey);

    final accessTokenExpirationDateTimeFromStorage =
        await _flutterSecureStorage.read(key: _accessTokenExpirationDateTimeKey);

    if (accessTokenExpirationDateTimeFromStorage == null ||
        int.tryParse(accessTokenExpirationDateTimeFromStorage) == null) {
      _accessTokenExpirationDateTime = null;
    } else {
      _accessTokenExpirationDateTime =
          DateTime.fromMillisecondsSinceEpoch(int.tryParse(accessTokenExpirationDateTimeFromStorage)!);
    }
  }
}
