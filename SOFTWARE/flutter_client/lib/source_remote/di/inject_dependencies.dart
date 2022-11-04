import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/auth/auth_repository.dart';
import 'package:pdp2022/source_remote/auth/auth_repository_impl.dart';
import 'package:pdp2022/source_remote/dio/create_dio.dart';

void injectDependencies(GetIt getIt) {
  getIt.registerLazySingleton<Dio>(
    () => createDio(),
  );

  getIt.registerFactory<AuthRepository>(
    () => AuthRepositoryImpl(
      getIt.get(),
    ),
  );
}
