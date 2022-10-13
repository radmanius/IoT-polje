# UPUTE ZA ARHIVIRANJE PROJEKTA

<!-- TOC -->

- [UPUTE ZA ARHIVIRANJE PROJEKTA](#upute-za-arhiviranje-projekta)
  - [Datoteka `README.TXT`](#datoteka-readmetxt)
  - [Direktorij `PROJEKT`](#direktorij-projekt)
  - [Direktorij `SOFTWARE`](#direktorij-software)
    - [FAQ](#faq)
      - [Što sve staviti u repozitorij?](#što-sve-staviti-u-repozitorij)
      - [Kako izbaciti direktorije koji mi generira IDE za Javu ili neki _build_ alat?](#kako-izbaciti-direktorije-koji-mi-generira-ide-za-javu-ili-neki-build-alat)
  - [Direktorij `PREZENTACIJA`](#direktorij-prezentacija)
  - [Direktorij `OSTALO`](#direktorij-ostalo)

<!-- /TOC -->

Prije prezentacije projekta (najkasnije dan prije prezentacije), studenti trebaju mentoru predati arhivirane rezultate na `gitlab.tel.fer.hr`.

Struktura datoteka u repozitoriju treba biti ovakva:

- `README.TXT` - UTF8 file
- `PROJEKT` - direktorij
- `SOFTWARE` - direktorij
- `PREZENTACIJA` - direktorij
- `OSTALO` - direktorij

Pojedini dijelovi trebaju biti uređeni ovako:

## Datoteka `README.TXT`

Čista tekstulana (UTF8) datoteka

```txt
----------------------------------------------------------------
Projekt: [kratki naziv projekta], ak. god. 2021/22
Puni naziv projekta:   [Naslov naslov naslov naslov...]
Datum prezentacije:  [datum]

Sadržaj repozitorija:
- kratki opis sto je sve u repozitoriju i kako je organizirano, po potrebi
reference na README fileove u pojedinim direktorijima

----------------------------------------------------------------
```

## Direktorij `PROJEKT`

Direktorij, s pod-direktorijima po potrebi.

- `README.txt` s opisom što je što:

  1. konačne datoteke u formatu word processora koristenog za obradu tekst (npr. MS Word, LaTeX, ...)
  2. konačne datoteke u PDF formatu
  3. za slike ili grafove, koji su napravljeni pomoću nekog drugog alata (npr. snapshoti, crteži u Visiu i sl.), pod-direktorij s datotekama u originalnom formatu

## Direktorij `SOFTWARE`

Direktorij, s pod-direktorijima po potrebi.

- `README.txt` - s opisom što je što
- `INSTALL.txt` - upute za instalaciju i evtualno postavljanje varijabli ako postoje upute u tehničkoj dikumentaciji (a trebale bi!), dovoljna je referenca na brojeve stranica gdje se nalaze
- `zip` ili `tar.gz`  arhiva softvera: SVE što je napravljeno ili korišteno u radu, osim komercijalnog, zasticenog, ili drugdje lako dobavljivog softvera (lako dobavljivo je Java, Eclipse, ...)
  1. ako se koristi C, C++, Java ili neki drugi programski jezik, čitav projekt, eventualne upute za prevođenje (kod Java ako se koristi gradle ili maven ne treba stavljati direktorije `build` odnosno `target`, a ako se koristi Eclipse onda ne treba i `bin`)
  2. u poseban direktorij staviti izvršne verzije.

### FAQ

#### Što sve staviti u repozitorij?

U repozitoriju treba biti sve sto bi vam trebalo da relativno brzo
(cca par sati) instalirate, konfigurirate i pokrenete svoj softver
kada bi se npr. nenadano pobrisao disk na računalu na kojem
radite (ili dobijete drugo računalo za rad).

#### Kako izbaciti direktorije koji mi generira IDE za Javu ili neki _build_ alat?

Na stranici [gitignore.io](https://www.gitignore.io) se može jednostavno
geneirati datoteka `.gitignore`. Uobičajene postavke su: Linux, Windows, macOS, Java, Gradle, Maven, Eclipse, Intellij, Netbeans. Datoteka koja je generirana se može staviti u direktorij s projektom ili u neki poddirektorij. Datoteku možete skinuti i pomoću komande:

```sh
wget -O .gitignore https://www.gitignore.io/api/java,linux,macos,maven,gradle,windows,eclipse,intellij,netbeans
```

## Direktorij `PREZENTACIJA`

Direktorij, s poddirektorijima po potrebi.

- `README.txt` - s opisom što je što
- datoteka s prezentacijom (originalni format npr. pptx)
- slike i grafovi ako su napravljeni u nekom drugom alatu

## Direktorij `OSTALO`

Direktorij, s pod-direktorijima po potrebi.

- `README.txt` - s opisom što je što
- tu ide sve što ne spada pod `PROJEKT`, `SOFTWARE` ili `PREZENTACIJA`, npr:
  - web-stranice na koje se pozivate u poglavlju Literatura
  - web-siteovi, bookmark (HTML) file
  - literatura, članci, specifikacije i sl. skinuto s mreže ili što ste dobili u elektroničkom obliku od nastavnika
  - seminarski/diplomski/završni rad koji ste koristili kao Literaturu
  - ostali radovi Vaših kolega koje ste koristili kao literaturu
  - itd.
