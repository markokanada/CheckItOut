# A REST API végpontok működésének ellenőrzése

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Sub-task: Untitled (Untitled%201e73a97be88580f881f8e4aa3d35a068.md)
Type: Developer

# Tesztelési jegyzőkönyv

**Cél:** A REST API végpontok működésének ellenőrzése

---

## 1. Auth és Felhasználókezelés

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/register` | POST | Felhasználó regisztráció | ✅ Sikeres | Tesztfelhasználó létrehozva |
| `/login` | POST | Bejelentkezés JWT tokennel | ✅ Sikeres | Token visszaadva |
| `/forgot-password` | POST | Jelszóemlékeztető email küldése | ✅ Sikeres | Email elküldve |
| `/reset-password` | POST | Jelszó visszaállítása token alapján | ✅ Sikeres | Teszt tokennel működött |
| `/change-password` | POST | Jelszó módosítása (auth szükséges) | ✅ Sikeres | Jelszó frissítve |
| `/user` | GET | Bejelentkezett felhasználó lekérése | ✅ Sikeres | Auth header szükséges |

---

## 2. Felhasználó kezelés (Admin)

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/users` | GET | Összes felhasználó listázása (admin) | ✅ Sikeres | Token szükséges |
| `/users/{id}` | GET | Egy adott felhasználó adatainak lekérése | ✅ Sikeres | Teszt ID-vel működik |
| `/users` | POST | Új felhasználó létrehozása | ✅ Sikeres | Token szükséges |
| `/users/{id}` | PUT | Felhasználó adatainak módosítása | ✅ Sikeres | Teszt adat frissült |
| `/users/{id}` | DELETE | Felhasználó törlése | ✅ Sikeres | Felhasználó törölve |

---

## 3. Kategóriák

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/categories` | GET | Kategóriák listázása | ✅ Sikeres |  |
| `/categories` | POST | Új kategória létrehozása | ✅ Sikeres |  |
| `/categories/{id}` | PUT | Kategória módosítása | ✅ Sikeres |  |
| `/categories/{id}` | DELETE | Kategória törlése | ✅ Sikeres |  |

---

## 4. Feladatok (Tasks)

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/tasks` | GET | Összes feladat listázása | ✅ Sikeres |  |
| `/tasks` | POST | Új feladat létrehozása | ✅ Sikeres |  |
| `/tasks/{id}` | PUT | Feladat módosítása | ✅ Sikeres |  |
| `/tasks/{id}` | DELETE | Feladat törlése | ✅ Sikeres |  |
| `/tasks/today/{user}` | GET | Napi feladatok státusz lekérése | ✅ Sikeres |  |

---

## 5. Időbeosztás (Schedule)

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/schedule` | GET | Időbeosztás lekérése | ✅ Sikeres |  |
| `/schedule` | POST | Új bejegyzés létrehozása | ✅ Sikeres |  |
| `/schedule/{id}` | PUT | Bejegyzés módosítása | ✅ Sikeres |  |
| `/schedule/{id}` | DELETE | Bejegyzés törlése | ✅ Sikeres |  |
| `/scheduleComposer/{user}` | GET | Egyéni időbeosztás generálás | ✅ Sikeres | Működő logika |

---

## 6. Kapcsolatfelvétel

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/contact` | POST | Kapcsolatfelvételi email küldése | ✅ Sikeres | Email megérkezett |

---

## 7. Egyéb / Kommentezett útvonalak

| Végpont | Metódus | Leírás | Eredmény | Megjegyzés |
| --- | --- | --- | --- | --- |
| `/send-test-email` | GET | Teszt email küldés (kommentelt) | ⚠️ Nem tesztelt | Kommentezve van |

---

## Összegzés

- **Tesztelt végpontok száma:** 25+
- **Sikeresen teljesített:** ✅ Minden végpont működött az elvártak szerint
- **Ajánlott módosítások:** Nincs
- **Megjegyzés:** A kommentezett `/send-test-email` tesztelése opcionálisan visszakapcsolható