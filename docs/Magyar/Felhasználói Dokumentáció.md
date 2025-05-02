## **Felhasználói Dokumentáció – CheckItOut Alkalmazás**

A CheckItOut egy egyszerű és hatékony eszköz a napi teendők rendszerezésére, átlátható kezelésére és a napi rutin kialakítására. Célunk, hogy segítsünk Neked produktívabbá válni, miközben könnyedén nyomon követheted a feladataidat.

### Miért válaszd a CheckItOut-ot?

- **Egyszerű használat** – Felhasználóbarát felület, amely gyorsan és könnyen kezelhető.
- **Személyre szabható** – Készíts egyedi listákat, állíts be emlékeztetőket és priorizáld a teendőidet.
- **Átláthatóság** – Könnyedén nyomon követheted a napi, heti vagy akár havi feladataidat.
- **Hatékonyság** – Segít a fókuszálásban és a rendszerezettség megőrzésében.

### Hogyan működik?

1. **Hozz létre új feladatokat** – Add meg a napi teendőidet egyetlen kattintással.
2. **Állíts be határidőket és emlékeztetőket** – Soha ne maradj le egy fontos feladatról!
3. **Prioritások meghatározása** – Rangsorold a feladataidat a fontosságuk szerint.
4. **Jelöld készre a feladatokat** – Élvezd a sikerélményt, miközben rendszerezetten haladsz előre.

A CheckItOut segít abban, hogy több időd maradjon arra, ami igazán fontos. Kezdd el még ma, és tapasztald meg a hatékony időgazdálkodás előnyeit!

**Próbáld ki most!**

## 1. Bevezetés

Ez a dokumentáció részletes útmutatót nyújt a Check It Out webalkalmazás használatához. Az alkalmazás segítségével hatékonyan kezelheti napi feladatait, projektjeit, és személyre szabhatja felhasználói fiókját.

## 2. Általános Szerkezet

### 2.1 Fejléc (Header)

- **Logó**: Bal felső sarokban, a kezdőlapra visszavezet
- **Navigációs menü**:
    - *Kezdőlap*: Visszavezet a főoldalra
    - *Új feladat*: Feladat létrehozása oldal
    - *Profil*: Felhasználói adatok kezelése
    - *Kijelentkezés*: Munkamenet lezárása
- **Nyelvválasztó**: Jobb felső sarokban (angol/magyar)

### 2.2 Lábléc (Footer)

- **Kapcsolat**: Email cím és fizikai cím
- **Dokumentáció**: Használati útmutató linkje
- **Nyelvválasztó**
- **Copyright információk**

## 3. Oldalspecifikus Útmutató

### 3.1 Kezdőlap (`/`)

**Cél**: Az alkalmazás bemutatása és első lépések

**Tartalom**:

1. **Bemutatkozás szekció**
    - Alkalmazás célja
    - Főbb jellemzők
2. **Funkciók bemutatása**
    - Feladatkezelés
    - Prioritásbeállítás
    - Kategóriák
3. **Regisztráció/Bejelentkezés gombok**
4. **Kapcsolatfelvételi űrlap**

**Használat**:

- Görgessen lefelé az összes szekció megtekintéséhez
- Kattintson a "Regisztráció" gombra új fiók létrehozásához
- Vagy a "Bejelentkezés" gombra meglévő fiók használatához

### 3.2 Regisztráció (`/register`)

**Cél**: Új felhasználói fiók létrehozása

**Kötelező adatok**:

1. **Teljes név**:
    - Valódi neved
    - Minimum 3 karakter
2. **Email cím**:
    - Érvényes email formátum
    - Még nem regisztrált cím
3. **Jelszó**:
    - Minimum 8 karakter
    - Kis- és nagybetűk, számok kombinációja ajánlott
4. **Jelszó megerősítése**:
    - Pontosan ugyanaz, mint a jelszó mezőben

**Folyamat**:

1. Töltse ki minden mezőt
2. Ellenőrizze a helyes adatbevitelt
3. Nyomja meg a "Regisztráció" gombot
4. Sikeres regisztráció esetén automatikusan bejelentkezik és a főoldalra kerül

**Megjegyzés**: A regisztrációval elfogadja az Általános Szerződési Feltételeket és az Adatvédelmi Szabályzatot.

### 3.3 Bejelentkezés (`/login`)

**Cél**: Meglévő felhasználóként történő belépés

**Adatbekérés**:

1. **Email cím**: Regisztrációkor megadott email
2. **Jelszó**: Fiókhoz tartozó jelszó

**Funkciók**:

- **Bejelentkezés**: Adatok ellenőrzése és belépés
- **Elfelejtett jelszó**: Jelszó-visszaállítási folyamat indítása
- **Még nincs fiókod?**: Regisztrációs oldalra ugrás

**Fontos**: 5 sikertelen próbálkozás után 15 perces időzítés lép életbe.

### 3.4 Jelszó Visszaállítás (`/reset-password`)

**Cél**: Elfelejtett jelszó megváltoztatása

**Lépések**:

1. Emailben kapott linkre kattintva érkezik az oldalra
2. Az email cím automatikusan kitöltődik
3. Új jelszó megadása (minimum 8 karakter)
4. Jelszó megerősítése
5. "Jelszó visszaállítása" gomb megnyomása

**Sikeres visszaállítás** után automatikusan bejelentkezik.

### 3.5 Alkalmazás Főoldal (`/app/home`)

**Cél**: Feladatok áttekintése és kezelése

**Főbb területek**:

### 3.5.1 Következő Feladat

- A legmagasabb prioritású, még el nem kezdett feladat
- Üres állapotban: "Nincs következő feladat" üzenet

### 3.5.2 Mai Feladatok

- Aznapra ütemezett összes feladat listája
- Kártyás megjelenítés:
    - Cím
    - Határidő
    - Prioritás (csillagokkal jelölve)
    - Kategória
- Üres állapotban: "Nincs mai feladat" üzenet

### 3.5.3 Elvégzett Feladatok

- Befejezett feladatok kronologikus listája
- Szürke színnel megkülönböztetve
- Üres állapotban: "Nincs elvégzett feladat" üzenet

**Műveletek**:

- Feladatra kattintva: Részletes megjelenítés
- Mobilnézetben: Fülek között váltás

### 3.6 Új Feladat Létrehozása (`/app/newTask`)

**Cél**: Új teendő rögzítése

**Kötelező mezők**:

1. **Cím**:
    - Feladat rövid neve
    - Max 50 karakter
2. **Leírás**:
    - Részletesebb magyarázat
    - Max 255 karakter
3. **Határidő**:
    - Dátum és idő választó
    - Jövőbeli dátum kötelező
4. **Kategória**:
    - Legördülő lista a meglévő kategóriákból
    - "+" gombbal új kategória hozzáadása
5. **Prioritás**:
    - 1-10 skála (1 = legkisebb, 10 = legnagyobb prioritás)
    - Alapértelmezett: 5

**Folyamat**:

1. Minden mező kitöltése
2. "Létrehozás" gomb megnyomása
3. Sikeres létrehozás után visszairányítás a főoldalra

### 3.7 Profil Kezelés (`/app/profile`)

**Cél**: Személyes adatok szerkesztése

**Szerkeszthető adatok**:

1. **Teljes név**:
    - Megjelenítendő név
2. **Email cím**:
    - Bejelentkezéshez használt cím

**Műveletek**:

- **Szerkesztés**: Mezők szerkeszthetővé tétele
- **Mentés**:
    - Jelszó megerősítés szükséges
    - Megerősítő modal ablak jelenik meg
- **Mégse**: Változtatások elvetése

**Biztonsági megjegyzés**: Email cím változtatásával újra kell jelentkeznie.

## 4. PWA Telepítés és Offline Használat

### 4.1 Telepítés

1. **Asztali számítógépen**:
    - Chrome: Kattintson a jobb felső sarokban lévő telepítés ikonra
    - Firefox: Menüből "Telepítés alkalmazásként" lehetőség
2. **Mobil eszközön**:
    - Safari (iOS): Megosztás → Kezdőképernyőre helyezés
    - Chrome (Android): Menü → Telepítés alkalmazásként

### 4.2 Offline Funkciók

- Meglévő feladatok megtekintése
- Új feladatok létrehozása (online állapotba visszatéréskor szinkronizálódik)
- Profiladatok szerkesztése

### 4.3 Előnyök

- Gyorsabb betöltés
- Kezdőképernyőről közvetlen elérés
- Push értesítések (jövőbeli fejlesztés)
