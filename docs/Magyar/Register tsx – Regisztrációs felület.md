# Register.tsx – Regisztrációs felület

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 👤 Tesztelési jegyzőkönyv: **Register.tsx** – Regisztrációs felület

## Bevezetés

Ez a dokumentum a `Register` osztály és annak `View` komponensének tesztelésére szolgál. A komponens egy regisztrációs űrlapot valósít meg, ahol a felhasználók megadhatják nevüket, e-mail címüket, jelszavukat és annak megerősítését. A validációt a `Formik` és `Yup` biztosítja, az állapotkezelést pedig a `MobX` végzi. A sikeres vagy sikertelen regisztrációról `Snackbar` visszajelzés történik.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `Register` osztály példányosítható egy `navigate` függvénnyel.
- **Státusz:** ✅ Sikeres

---

### 2. `View` metódus observer-ként működik

- **Leírás:** A `View` egy `observer`rel visszatérő React komponens, amely automatikusan újrarenderelődik a MobX állapotváltozásokra.
- **Státusz:** ✅ Sikeres

---

### 3. Regisztrációs űrlap mezői

- **Leírás:** Az űrlap tartalmazza a `name`, `email`, `password`, `confirmPassword` mezőket, melyek megfelelően működnek.
- **Státusz:** ✅ Sikeres

---

### 4. Form validáció

- **Leírás:** A `Yup` séma biztosítja:
    - A `name` mező kötelező.
    - Az `email` helyes formátumú és kötelező.
    - A `password` legalább 8 karakteres.
    - A `confirmPassword` egyezik a `password`dal.
- **Státusz:** ✅ Sikeres

---

### 5. Sikeres regisztráció

- **Leírás:** Ha a `GlobalEntities.register` sikeres választ ad, „Register Success” üzenet jelenik meg, majd a rendszer 7.5 másodperc múlva átnavigál a login oldalra.
- **Státusz:** ✅ Sikeres

---

### 6. Hibakezelés: foglalt e-mail cím

- **Leírás:** Ha a backend „The email has already been taken” hibát küld, akkor a `Register Error Taken` üzenet jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 7. Hibakezelés: validációs hiba a backend-től

- **Leírás:** Ha a válasz `422-es`, és hibák találhatók a `response.data.errors` mezőben, akkor „Validation Error” snackbar jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 8. Snackbar viselkedése

- **Leírás:** A snackbar automatikusan eltűnik 7.5 másodperc után, vagy manuálisan bezárható.
- **Státusz:** ✅ Sikeres

---

### 9. Link a bejelentkezéshez

- **Leírás:** Az „Already have an account?” (Register Have Account) szövegre kattintva a rendszer a bejelentkezési oldalra navigál.
- **Státusz:** ✅ Sikeres

---

### 10. i18n fordítás használata

- **Leírás:** Minden felirat, gomb, és hibaüzenet `useTranslation()` segítségével lokalizálva van.
- **Státusz:** ✅ Sikeres

---

### 11. MobX állapotkezelés

- **Leírás:** A `@observable` és `@action` dekorátorokkal kezelt belső állapot (`snackbarOpen`, `snackbarMessage`, stb.) változásai automatikusan frissítik a UI-t.
- **Státusz:** ✅ Sikeres

---

## 🟢 Összegzés

A `Register.tsx` komponens teljesíti az összes funkcionalitási és UX követelményt: biztosítja az adatok validálását, a hibák korrekt kezelését, a regisztráció logikáját, valamint a visszajelzések és navigáció működését. A komponens jól integrált a MobX és i18n rendszerrel, és minden teszt az elvárásoknak megfelelően sikeresen lefutott.

---