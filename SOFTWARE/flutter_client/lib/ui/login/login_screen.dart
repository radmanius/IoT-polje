import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/ui/common/bits/request_notifier/request_state.dart';
import 'package:pdp2022/ui/common/primary_button.dart';
import 'package:pdp2022/ui/home/home_screen.dart';
import 'package:pdp2022/ui/login/provider/login_request_notifier.dart';

class LoginScreen extends ConsumerWidget {
  const LoginScreen({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<dynamic>(
      builder: (BuildContext context) {
        return const LoginScreen();
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.listen<RequestState<void>>(loginRequestNotifier, (previous, next) {
      next.whenOrNull(
        success: (_) => Navigator.of(context).pushReplacement(HomeScreen.route()),
      );
    });

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: PrimaryButton(
            title: 'LOGIN',
            onTap: ref.read(loginRequestNotifier.notifier).onLoginPressed,
          ),
        ),
      ),
    );
  }
}
