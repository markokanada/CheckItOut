# Tesztelési Dokumentáció

## Áttekintés

Az alkalmazás tesztelése több szinten történik:

1. **Frontend tesztelés**: Selenium WebDriver segítségével
2. **API tesztelés**: PHPUnit alapú végpont tesztelés
3. **Egységtesztelés**: Kontroller metódusok tesztelése

## Frontend Tesztek (Selenium WebDriver)

### 1. Alapvető Frontend Teszt (base.test.js)

- **Cél**: Az alkalmazás főoldalának megfelelő betöltődésének ellenőrzése
- **Tesztelt funkciók**:
    - Oldal megfelelő betöltése
    - Cím ellenőrzése
    - Proxy beállítások kezelése
- **Környezet**: Chrome böngésző

### 2. Feladat Rögzítés Teszt (taskRecording.test.js)

- **Cél**: Feladat létrehozási folyamat tesztelése
- **Tesztelt funkciók**:
    - Űrlap mezők kitöltése (cím, leírás, határidő, prioritás)
    - Kategória választás
    - Hibás dátum validáció
    - Űrlap elküldése
    - Sikeres létrehozás visszajelzés
- **Speciális ellenőrzések**:
    - Jövőbeli és múltbeli dátum kezelése
    - Prioritás beállítás
    - Kategória választó működése
