import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get_it/get_it.dart';
import 'package:pdp2022/source_remote/auth/auth_repository.dart';
import 'package:pdp2022/source_remote/auth/auth_repository_impl.dart';
import 'package:pdp2022/source_remote/auth/auth_token_persistence_manager.dart';
import 'package:pdp2022/source_remote/dio/create_dio.dart';
import 'package:pdp2022/source_remote/scene/scene_repository.dart';
import 'package:pdp2022/source_remote/scene/scene_repository_impl.dart';

void injectDependencies(GetIt getIt) {
  getIt.registerLazySingleton<Dio>(
    () => createDio(),
  );

  getIt.registerLazySingleton<AuthTokenPersistenceManager>(
    () => AuthTokenPersistenceManager(const FlutterSecureStorage()),
  );

  getIt.registerFactory<AuthRepository>(
    () => AuthRepositoryImpl(
      getIt.get(),
    ),
  );

  getIt.registerFactory<SceneRepository>(
    () => SceneRepositoryImpl(
      getIt.get(),
    ),
  );
}
