import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/auth/auth_repository.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_notifier.dart';

final loginRequestNotifier = Provider.autoDispose(
  (ref) => LoginRequestNotifier(
    GetIt.I.get(),
  ),
);

class LoginRequestNotifier extends RequestNotifier {
  LoginRequestNotifier(this._authRepository);

  final AuthRepository _authRepository;

  void onLoginPressed() async {
    executeRequest(requestBuilder: _authRepository.login);
  }
}
