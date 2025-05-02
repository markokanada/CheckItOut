# Profile.tsx – Profil szerkesztő felület

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 👤 Tesztelési jegyzőkönyv: **Profile.tsx** – Profil szerkesztő felület

## Bevezetés

Ez a dokumentum a `Profile.tsx` fájl tesztelésére szolgál, amely a felhasználói profil szerkesztését valósítja meg. A komponens `Formik`-ot és `Yup`-ot használ validációhoz, `MobX`-ot állapotkezeléshez, valamint `MUI`-t a felhasználói felülethez. Az e-mail és név mezők módosíthatók, mentéshez pedig jelszavas megerősítés szükséges.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `Profile` osztály példányosítható egy `navigate` függvénnyel.
- **Státusz:** ✅ Sikeres

---

### 2. `View` metódus observer-ként működik

- **Leírás:** A `View` komponens `observer`rel tér vissza, reagálva a MobX által megfigyelt változók módosulására.
- **Státusz:** ✅ Sikeres

---

### 3. Felhasználói adatok megjelenítése

- **Leírás:** A `GlobalEntities.user.name` és `GlobalEntities.user.email` megjelenik és újra betöltődik módosítás elvetésekor.
- **Státusz:** ✅ Sikeres

---

### 4. Szerkesztési mód váltása

- **Leírás:** A „Szerkesztés” gomb aktiválja a mezők szerkesztését, a „Mégse” visszaállítja az eredeti értékeket.
- **Státusz:** ✅ Sikeres

---

### 5. Form validáció (név és email)

- **Leírás:** `Yup` sémával biztosítja, hogy a `name` ne legyen üres, az `email` pedig formailag helyes legyen.
- **Státusz:** ✅ Sikeres

---

### 6. Mentés megerősítése jelszóval (Modal)

- **Leírás:** A mentés megerősítéséhez a felhasználónak be kell írnia a jelszavát a modális ablakban.
- **Státusz:** ✅ Sikeres

---

### 7. Sikeres mentés visszajelzése

- **Leírás:** Amennyiben a jelszó helyes, sikeres válasz (`resp !== 0`) esetén „snackbar success” üzenet jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 8. Hibás jelszó visszajelzése

- **Leírás:** Amennyiben a jelszó hibás (`resp === 0`), „snackbar invalid password” jelenik meg hibaüzenetként.
- **Státusz:** ✅ Sikeres

---

### 9. Snackbar viselkedése

- **Leírás:** A `Snackbar` 4 másodpercig látható, és manuálisan is bezárható.
- **Státusz:** ✅ Sikeres

---

### 10. i18n fordítás használata

- **Leírás:** Az összes felirat és üzenet a `useTranslation()` hook segítségével lokalizálva van.
- **Státusz:** ✅ Sikeres

---

### 11. MobX állapotkezelés

- **Leírás:** A `@observable` és `@action` dekorátorok biztosítják a UI és a belső állapot szinkronizálását.
- **Státusz:** ✅ Sikeres

---

## 🟢 Összegzés

A `Profile.tsx` komponens funkcionálisan teljeskörű: támogatja a felhasználói adatok szerkesztését validációval és megerősítéssel, megfelelő visszajelzést ad, és konzisztens módon integrálódik a `MobX` és `i18n` rendszerekbe. Minden funkció a tesztek alapján elvárt módon működik.