# TaskRecording.tsx – Feladat rögzítése

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 👤 Tesztelési jegyzőkönyv: **TaskRecording.tsx** – Feladat rögzítése

## Bevezetés

Ez a dokumentum a `TaskRecording.tsx` fájl tesztelésére szolgál, amely a feladatok rögzítésére vonatkozó felületet biztosít. A komponens a `Formik`-ot és `Yup`-ot használ a form validációhoz, `MobX`-ot állapotkezeléshez, és az `MUI` könyvtárat az UI komponensekhez. A felhasználók feladatokat adhatnak hozzá, megadhatják a címét, leírását, határidejét, kategóriáját és prioritását.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `TaskRecording` osztály példányosítható és működik az `navigate` függvénnyel.
- **Státusz:** ✅ Sikeres

---

### 2. `View` metódus observer-ként működik

- **Leírás:** A `View` komponens `observer`rel tér vissza, reagálva a MobX által megfigyelt változók módosulására.
- **Státusz:** ✅ Sikeres

---

### 3. Feladat rögzítő űrlap

- **Leírás:** Az űrlap tartalmazza a következő mezőket:
    - `title`: a feladat címe
    - `description`: a feladat leírása
    - `due_date`: a feladat határideje
    - `category_id`: a feladat kategóriája
    - `priority`: a feladat prioritása
- **Státusz:** ✅ Sikeres

---

### 4. Form validáció

- **Leírás:** A `Yup` séma biztosítja:
    - A `title` mező legfeljebb 50 karakteres és kötelező.
    - A `description` mező legfeljebb 255 karakteres és kötelező.
    - A `due_date` mező jövőbeli dátumot kell tartalmazzon.
    - A `category_id` kötelező mező.
    - A `priority` számérték, amely 1 és 10 között kell, hogy legyen.
- **Státusz:** ✅ Sikeres

---

### 5. Sikeres feladat rögzítés

- **Leírás:** Ha a feladat sikeresen rögzítésre kerül, akkor a felhasználó egy „TaskCreatedSuccess” üzenetet kap, és 2 másodperc múlva a rendszer átnavigál a `/app/home` oldalra.
- **Státusz:** ✅ Sikeres

---

### 6. Hibakezelés a feladat rögzítésekor

- **Leírás:** Ha a feladat rögzítése nem sikerül, akkor hibaüzenet jelenik meg („TaskCreateError”).
- **Státusz:** ✅ Sikeres

---

### 7. Hibakezelés hálózati vagy szerver hibák esetén

- **Leírás:** Ha hálózati vagy szerverhiba történik, akkor a rendszer „NetworkOrServerError” hibaüzenetet mutat.
- **Státusz:** ✅ Sikeres

---

### 8. Kategória rögzítés

- **Leírás:** A felhasználó új kategóriát hozhat létre, ha a „+” gombra kattint a kategória mező mellett.
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

A `TaskRecording.tsx` komponens sikeresen kezeli a feladatok rögzítését, a form validációt, hibakezelést és az új kategóriák létrehozását. A komponens jól integrálódik a `MobX` és i18n rendszerekkel, és minden teszt az elvárásoknak megfelelően sikeresen lefutott.