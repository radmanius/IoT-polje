import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:pdp2022/domain/secure_storage_keys.dart';

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
    await _flutterSecureStorage.write(key: SecureStorageKeys.accessToken, value: accessToken);
    await _flutterSecureStorage.write(key: SecureStorageKeys.refreshToken, value: refreshToken);
    await _flutterSecureStorage.write(
      key: SecureStorageKeys.accessTokenExpirationDateTime,
      value: accessTokenExpirationDateTime.millisecondsSinceEpoch.toString(),
    );

    _accessToken = accessToken;
    _refreshToken = refreshToken;
    _accessTokenExpirationDateTime = _accessTokenExpirationDateTime;
  }

  Future<void> loadTokenFromDisc() async {
    _accessToken = await _flutterSecureStorage.read(key: SecureStorageKeys.accessToken);
    _refreshToken = await _flutterSecureStorage.read(key: SecureStorageKeys.refreshToken);

    final accessTokenExpirationDateTimeFromStorage =
        await _flutterSecureStorage.read(key: SecureStorageKeys.accessTokenExpirationDateTime);

    if (accessTokenExpirationDateTimeFromStorage == null ||
        int.tryParse(accessTokenExpirationDateTimeFromStorage) == null) {
      _accessTokenExpirationDateTime = null;
    } else {
      _accessTokenExpirationDateTime =
          DateTime.fromMillisecondsSinceEpoch(int.tryParse(accessTokenExpirationDateTimeFromStorage)!);
    }
  }
}
