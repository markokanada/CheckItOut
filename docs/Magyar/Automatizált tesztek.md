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

## API Tesztek (PHPUnit)

### 1. Ütemezés API Tesztek (ScheduleApiTest.php)

- **Tesztelt végpontok**:
    - `GET /api/schedules` - Listázás
    - `POST /api/schedules` - Létrehozás
    - `GET /api/schedules/{id}` - Egy elem lekérdezése
    - `PUT /api/schedules/{id}` - Frissítés
    - `DELETE /api/schedules/{id}` - Törlés
- **Tesztelt esetek**:
    - Válasz státuszkódok
    - JSON struktúra ellenőrzése
    - Adatbázis műveletek hatásainak ellenőrzése
    - Factory alapú tesztadatok generálása

### 2. Feladat API Tesztek (TaskApiTest.php)

- **Tesztelt végpontok**:
    - `GET /api/tasks` - Listázás
    - `POST /api/tasks` - Létrehozás
    - `GET /api/tasks/{id}` - Egy elem lekérdezése
    - `PUT /api/tasks/{id}` - Frissítés
    - `DELETE /api/tasks/{id}` - Törlés
- **Különleges ellenőrzések**:
    - Frissítéskor a módosított mezők ellenőrzése
    - Törlés utáni adatbázis állapot ellenőrzése
    - Több elem egyidejű kezelése
