import 'package:flutter/material.dart';
import 'package:pdp2022/source_remote/dio/api_endpoints.dart';
import 'package:pdp2022/ui/login/provider/secure_storage.dart';

final SecureStorage secureStorage = SecureStorage();

final restServerController = TextEditingController();
final databaseController = TextEditingController();

class SettingsForm extends StatefulWidget {
  const SettingsForm({Key? key}) : super(key: key);

  @override
  State<SettingsForm> createState() => _SettingsFormState();
}

class _SettingsFormState extends State<SettingsForm> {
  @override
  void initState() {
    super.initState();
    setupUrls();
  }

  void setupUrls() async {
    final restServerBaseUrl = await secureStorage.readSecureData('restServerBaseUrl');
    final databaseBaseUrl = await secureStorage.readSecureData('databaseBaseUrl');

    if (restServerBaseUrl != null && restServerBaseUrl.isNotEmpty) {
      restServerController.text = restServerBaseUrl;
    } else {
      restServerController.text = ApiEndpoints.restServerBaseUrl;
    }

    if (databaseBaseUrl != null && databaseBaseUrl.isNotEmpty) {
      databaseController.text = databaseBaseUrl;
    } else {
      databaseController.text = ApiEndpoints.databaseUrl;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Server Settings'),
      ),
      body: Form(
        key: GlobalKey<FormState>(),
        child: Column(
          children: [
            TextFormField(
              controller: restServerController,
              decoration: const InputDecoration(
                labelText: 'Rest',
              ),
            ),
            TextFormField(
              controller: databaseController,
              decoration: const InputDecoration(
                labelText: 'Baza',
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16.0),
              child: ElevatedButton(
                onPressed: () {
                  secureStorage.writeSecureData('restServerBaseUrl', restServerController.text);
                  secureStorage.writeSecureData('databaseBaseUrl', databaseController.text);
                },
                child: const Text('Submit'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
