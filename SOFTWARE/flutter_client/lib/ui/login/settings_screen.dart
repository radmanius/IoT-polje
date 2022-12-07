import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';


final serverController = TextEditingController();
final keycloakController = TextEditingController();

class SettingsForm extends ConsumerWidget {
  const SettingsForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Keycloak Settings'),
        ),
        body: Form(
            key: GlobalKey<FormState>(),
            child: Column(
                children: [
                  TextFormField(
                    controller: keycloakController,
                    decoration: const InputDecoration(
                      labelText: 'Rest',
                    ),
                  ),
                  TextFormField(
                    controller: serverController,
                    decoration: const InputDecoration(
                      labelText: 'Baza',
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ElevatedButton(
                      onPressed: () {
                        ApiEndpoints.restServerBaseUrl = keycloakController.text;

                      },
                      child: const Text('Submit'),
                    ),
                  )]
            )

        )
    );
  }
}