# cordovawarsawapp

Prosta aplikacja dla systemu Android zbudowana przy wykorzystaniu frameworka wieloplatformowego [PhoneGap Cordova][1]. Ponieważ aplikacje androidowe wymagają odpowiedniej struktury projektu, właściwy kod aplikacji znajduje się w folderze [assets/www][13]. Aplikacja umożliwia przeglądanie atrakcji miasta Warszawa (wybór według kategorii, własnej lokalizacji lub nazwy ulicy). Aplikacja komunikuje się z zewnętrznym serwerem, który zwraca dane przechowywane w bazie danych Postgresql.

Oprócz frameworka [PhoneGap Cordova][1] wykorzystywane są również:
* [Knockout.js][3]
* [jQuery mobile][2]
* [Require.js][4]
* [Underscore.js][5]

Ze względu na fakt, że aplikacja zbudowana jest w całości we frameworkach webowych jej działanie można sprawdzić także w przeglądarce (wystarczy do tego kod z folderu [assets/www][13], jednak funkcjonalności charakterystyczne dla urządzeń mobilnych (jak np. zapisanie danych do książki adresowej urządzenia), nie będą działać poprawnie.

Screenshots
-----------
![Screenshot 1][6]
![Screenshot 2][12]
![Screenshot 3][11]
![Screenshot 4][8]
![Screenshot 5][9]
![Screenshot 6][10]

License
-------

    Copyright 2015 Rafał Rykowski

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

[1]: http://phonegap.com/
[2]: https://jquerymobile.com/
[3]: http://knockoutjs.com/
[4]: http://requirejs.org/
[5]: http://underscorejs.org/
[6]: ./screenshots/screen1.png
[8]: ./screenshots/screen3.png
[9]: ./screenshots/screen4.png
[10]: ./screenshots/screen5.png
[11]: ./screenshots/screen7.png
[12]: ./screenshots/screen8.png
[13]: ./app/src/main/assets/www
