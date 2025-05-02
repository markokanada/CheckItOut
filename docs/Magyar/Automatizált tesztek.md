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

## Egységtesztek (PHPUnit)

### 1. Ütemezés Összeállító Teszt (ScheduleTest.php)

- **Tesztelt metódus**: `scheduleComposer` a ScheduleController-ben
- **Tesztelt funkció**:
    - Feladatok rendezése prioritás és határidő szerint
    - Mock objektum használata a User modellhez
    - Várt eredmény ellenőrzése
- **Fontosabb assert-ek**:
    - A feladatok sorrendjének ellenőrzése
    - Magasabb prioritású feladatok előrébb helyezése
    - Azonos prioritásnál korábbi határidő előrébb

## Tesztelési Stratégia

1. **Tesztkörnyezet**:
    - Külön frontend és backend tesztkörnyezet
    - Chrome böngésző Seleniumhoz
    - Adatbázis automatikus frissítése tesztenként
2. **Tesztadatok**:
    - Factory-k használata véletlenszerű, de konzisztens adatokhoz
    - Mock objektumok komplex függőségek helyettesítésére
3. **Futtatás**:
    - JavaScript tesztek: Node.js környezetben
    - PHP tesztek: PHPUnit keretrendszerrel
4. **Jelentéskészítés**:
    - Konzolos kimenet minden tesztfuttatáskor
    - Hibák részletes naplózása

## Fontos Megjegyzések

1. **Időérzékeny tesztek**:
    - Dátum-ellenőrzések különös figyelmet igényelnek
    - Relatív dátumok használata (tegnap, holnap)
2. **Aszinkron műveletek**:
    - Megfelelő várakozási idők beállítása Seleniumban
    - Explicit wait használata elemek megjelenéséhez
3. **Adatbázis-állapot**:
    - Minden teszt előtt tiszta állapot biztosítása
    - RefreshDatabase trait használata

Ez a tesztlefedettség biztosítja az alkalmazás kulcsfontosságú funkcionalitásainak megfelelő működését, miközben lehetővé teszi a gyors hibaelhárítást és a fejlesztési folyamat stabilitását.


# Kiterjesztett Tesztelési Dokumentáció

## Egységtesztek (Unit Tests) - Bővítés

### 1. Task Model Tesztek (TaskTest.php)

### 1.1 Állapotok lekérdezése

```php
public function test_get_statuses_returns_expected_array()
{
    $expectedStatuses = ["new", "in-progress", "finished", "expired"];
    $this->assertEquals($expectedStatuses, Task::getStatuses());
}

```

- **Tesztelt funkció**: Statikus `getStatuses()` metódus
- **Ellenőrzött értékek**: Várt állapotok listája
- **Fontos**: Ellenőrzi, hogy a visszaadott tömb megegyezik-e a várt értékekkel

### 1.2 Kapcsolatok ellenőrzése

```php
public function test_user_relationship()
{
    $task = new Task();
    $relation = $task->user();

    $this->assertInstanceOf(BelongsTo::class, $relation);
    $this->assertEquals('user_id', $relation->getForeignKeyName());
}

```

- **Tesztelt kapcsolat**: Feladat -> Felhasználó
- **Ellenőrzés**:
    - A kapcsolat típusa `BelongsTo`
    - A külső kulcs neve `user_id`

### 1.3 Kategória kapcsolat

```php
public function test_category_relationship()
{
    $task = new Task();
    $this->assertInstanceOf(BelongsTo::class, $task->category());
}

```

- **Tesztelt kapcsolat**: Feladat -> Kategória
- **Ellenőrzés**: A kapcsolat típusa `BelongsTo`

### 1.4 Ütemezések kapcsolata

```php
public function test_schedules_relationship()
{
    $task = new Task();
    $this->assertInstanceOf(BelongsToMany::class, $task->schedules());
}

```

- **Tesztelt kapcsolat**: Feladat -> Ütemezések
- **Ellenőrzés**: A kapcsolat típusa `BelongsToMany`

### 2. User Model Tesztek (UserModelTest.php)

### 2.1 Feladatok kapcsolata

```php
public function test_tasks_relationship()
{
    $user = new User();
    $relation = $user->tasks();

    $this->assertInstanceOf(HasMany::class, $relation);
    $this->assertEquals('user_id', $relation->getForeignKeyName());
    $this->assertEquals('id', $relation->getLocalKeyName());
}

```

- **Tesztelt kapcsolat**: Felhasználó -> Feladatok
- **Ellenőrzés**:
    - A kapcsolat típusa `HasMany`
    - Külső és helyi kulcsek ellenőrzése

### 2.2 Megosztott feladatok

```php
public function test_shared_tasks_relationship()
{
    $user = new User();
    $this->assertInstanceOf(BelongsToMany::class, $user->shared_tasks());
}

```

- **Tesztelt kapcsolat**: Felhasználó -> Megosztott feladatok
- **Ellenőrzés**: A kapcsolat típusa `BelongsToMany`

### 2.3 Ütemezések kapcsolata

```php
public function test_schedules_relationship()
{
    $user = new User();
    $this->assertInstanceOf(HasMany::class, $user->schedules());
}

```

- **Tesztelt kapcsolat**: Felhasználó -> Ütemezések
- **Ellenőrzés**: A kapcsolat típusa `HasMany`

### 2.4 Feladatlisták megosztása - Vendégek

```php
public function test_shared_tasklists_guests()
{
    $user = new User();
    $relation = $user->shared_tasklists_guests();

    $this->assertInstanceOf(BelongsToMany::class, $relation);
    $this->assertEquals('users_users', $relation->getTable());
    $this->assertEquals('owner_id', $relation->getForeignPivotKeyName());
    $this->assertEquals('guest_id', $relation->getRelatedPivotKeyName());
}

```

- **Tesztelt kapcsolat**: Felhasználó -> Vendég feladatlisták
- **Részletes ellenőrzés**:
    - Köztes tábla neve
    - Pivot kulcsok helyessége

### 2.5 Feladatlisták megosztása - Tulajdonosok

```php
public function test_shared_tasklists_owners()
{
    $user = new User();
    $relation = $user->shared_tasklists_owners();

    $this->assertInstanceOf(BelongsToMany::class, $relation);
    $this->assertEquals('users_users', $relation->getTable());
    $this->assertEquals('guest_id', $relation->getForeignPivotKeyName());
    $this->assertEquals('owner_id', $relation->getRelatedPivotKeyName());
}

```

- **Tesztelt kapcsolat**: Felhasználó -> Tulajdonos feladatlisták
- **Részletes ellenőrzés**:
    - Köztes tábla neve
    - Pivot kulcsok helyessége (fordított sorrend)

## Integrációs tesztek - Bővítés

### 1. Feladat Életciklus Tesztek

```php
public function test_task_lifecycle()
{
    // Létrehozás
    $task = Task::factory()->create();
    $this->assertDatabaseHas('tasks', ['id' => $task->id]);

    // Frissítés
    $task->update(['title' => 'Updated Title']);
    $this->assertDatabaseHas('tasks', ['title' => 'Updated Title']);

    // Törlés
    $task->delete();
    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
}

```

- **Tesztelt funkciók**:
    - Feladat létrehozása
    - Frissítése
    - Törlése
- **Adatbázis ellenőrzés**: Minden lépésnél

### 2. Felhasználó-Feladat Kapcsolat Teszt

```php
public function test_user_task_relationship_works()
{
    $user = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $user->id]);

    $this->assertEquals($user->id, $task->user->id);
    $this->assertCount(1, $user->tasks);
}

```

- **Tesztelt kapcsolat**: Felhasználó és feladatai között
- **Ellenőrzés**:
    - A feladat tulajdonosa
    - A felhasználó feladatainak száma

## Feature tesztek - Bővítés

### 1. Feladat Állapotváltozások

```php
public function test_task_status_transitions()
{
    $task = Task::factory()->create(['status' => 'new']);

    // new -> in-progress
    $task->update(['status' => 'in-progress']);
    $this->assertEquals('in-progress', $task->status);

    // in-progress -> finished
    $task->update(['status' => 'finished']);
    $this->assertEquals('finished', $task->status);

    // Visszaváltás nem engedélyezett
    $task->update(['status' => 'new']);
    $this->assertNotEquals('new', $task->status);
}

```

- **Tesztelt állapotátmenetek**:
    - Új -> Folyamatban
    - Folyamatban -> Kész
    - Visszaváltás tiltása

### 2. Megosztás Funkcionalitás

```php
public function test_task_sharing_works()
{
    $owner = User::factory()->create();
    $guest = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $owner->id]);

    // Megosztás
    $owner->shared_tasklists_owners()->attach($guest->id);
    $this->assertTrue($guest->shared_tasklists_guests()->where('owner_id', $owner->id)->exists());
}

```

- **Tesztelt funkció**: Feladatlisták megosztása
- **Ellenőrzés**: A megosztás után a vendég látja a tulajdonos listáját

## Tesztelési Stratégia - Bővítés

1. **Tesztpiramis**:
    - 60% Egységtesztek (modell metódusok, kapcsolatok)
    - 30% Integrációs tesztek (modell-kapcsolatok, adatbázis műveletek)
    - 10% Feature tesztek (üzleti logika, felhasználói folyamatok)
2. **Tesztadatok kezelése**:
    - Factory-k használata minden modellhez
    - Faker adatgenerálás
    - Adatbázis tisztítás minden teszt előtt
3. **Teljesítmény szempontok**:
    - Párhuzamos tesztfuttatás
    - Mock-ok használata külső függőségekhez
    - Adatbázis tranzakciók használata
4. **Folyamatos integráció**:
    - GitHub Actions konfiguráció
    - Tesztlefedettség riportálás
    - Code style ellenőrzés

## Fontos Megjegyzések - Bővítés

1. **Adatbázis séma változások**:
    - Minden séma változás után frissíteni kell a factory-kat
    - Migrációs tesztek hozzáadása fontos változásokhoz
2. **Többnyelvűség tesztelése**:
    - Fordítási kulcsok ellenőrzése
    - Lokalizációs beállítások tesztelése
3. **Biztonsági tesztek**:
    - Jogosultság ellenőrzések
    - Adatelérési szintek validálása
    - XSS és SQL injection elleni védelem
4. **Edge case-ek**:
    - Üres adatok kezelése
    - Határértékek tesztelése (pl. maximális hosszúságú szövegek)
    - Speciális karakterek kezelése

Ez a kiterjesztett dokumentáció átfogóbb képet ad a tesztelési stratégiáról, különös hangsúlyt fektetve a modell kapcsolatok és az üzleti logika tesztelésére. Minden teszteset részletesen dokumentálva van, megkönnyítve ezzel a karbantartást és a további fejlesztéseket.