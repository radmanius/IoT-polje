# Flutter client for pdp2022

App is used to present data gathered from smart iot gardens.

## Architecture

This app uses [Infinum Flutter architecture](https://infinum.com/handbook/flutter).

## How to run the app locally

- Install Android Studio (recommended) or VSCode
- Instal Flutter version 3.3.3 [Flutter Website](https://docs.flutter.dev/get-started/install)
    - This project uses [FVM](https://fvm.app/) for easy flutter version management but you can just install Flutter from official website any flutter 3 version should work
- Run command `flutter run`

## How create builds
- .apk - `flutter build apk --split-per-abi`
- .ipa - `flutter build ipa`

More info on this topic can be found on Flutter website [Android](https://docs.flutter.dev/deployment/android) or [iOS](https://docs.flutter.dev/deployment/ios)

## API Docs

- API is created by other students in Spring
- Swagger docs: TODO: insert docs link
- Open api definition: https://gitlab.tel.fer.hr/kusek-studenti/pdp/pdp2022/-/blob/main/OSTALO/mobile_IoT-field_v2.yml
- Server access data: https://gitlab.tel.fer.hr/kusek-studenti/pdp/pdp2022/-/blob/main/OSTALO/pristupniPodaci.txt

