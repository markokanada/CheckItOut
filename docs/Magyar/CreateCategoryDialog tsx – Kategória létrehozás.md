# CreateCategoryDialog.tsx – Kategória létrehozására szolgáló dialógus

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

## Áttekintés

# 📝 Tesztelési jegyzőkönyv: **CreateCategoryDialog.tsx** – Kategória létrehozására szolgáló dialógus

## Áttekintés

Ez a dokumentum a `CreateCategoryDialog.tsx` komponens tesztelésére vonatkozik, amely egy új kategória létrehozására szolgáló dialógust biztosít. A dialógus űrlap biztosítja, hogy:

1. A kategória neve nagybetűvel kezdődjön.
2. Ne tartalmazzon sértő szavakat (a `bad-words` szűrő segítségével).
3. Az űrlap a `Formik` és `Yup` segítségével érvényesítve van a beküldés előtt.

---

## ✅ Tesztesetek

### 1. Komponens megjelenítése

- **Leírás:** A komponensnek helyesen kell megjelenni, amikor a dialógus nyitva van. A dialógusnak tartalmaznia kell a "Új kategória hozzáadása" címet és egy szövegmezőt a kategória nevéhez.
- **Várható eredmény:** ✅ Sikeres

---

### 2. Dialógus bezárás funkció

- **Leírás:** A dialógusnak helyesen kell bezáródnia, amikor az `onClose` funkció meghívásra kerül (például a "Mégse" gombra kattintva vagy a dialógus körüli területre kattintva).
- **Várható eredmény:** ✅ Sikeres

---

### 3. Űrlap beküldése (Érvényes adat)

- **Leírás:** Ha érvényes kategória nevet adunk meg (helyesen nagybetűvel kezdődik, és nem tartalmaz sértő szavakat), az `onCreate` funkciónak a kategória nevével kell meghívódnia, és az űrlapnak vissza kell állnia.
- **Várható eredmény:** ✅ Sikeres

---

### 4. Érvényesítés: Kötelező mező

- **Leírás:** A "Kategória neve" mezőnek hibaüzenetet kell megjelenítenie, ha a felhasználó megpróbálja beküldeni az űrlapot anélkül, hogy kitöltené.
- **Várható eredmény:** ✅ Sikeres

---

### 5. Érvényesítés: Nagybetűs kezdés ellenőrzése

- **Leírás:** A kategória nevének nagybetűvel kell kezdődnie. Ha a felhasználó olyan nevet ad meg, amely nem kezdődik nagybetűvel, hibaüzenetnek kell megjelennie.
- **Várható eredmény:** ✅ Sikeres

---

### 6. Érvényesítés: Sértő szavak

- **Leírás:** A kategória nevét ellenőrizni kell a sértő szavak (a `bad-words` szűrő segítségével). Ha a felhasználó sértő szót ad meg, hibaüzenet jelenik meg.
- **Várható eredmény:** ✅ Sikeres

---

### 7. Űrlap beküldése (Érvénytelen adat)

- **Leírás:** Ha a felhasználó érvénytelen kategória nevet ad meg (üres, nem nagybetűvel kezdődik, vagy sértő szót tartalmaz), az űrlap nem küldhető el, és a megfelelő hibaüzenet megjelenik.
- **Várható eredmény:** ✅ Sikeres

---

### 8. Gomb letiltása beküldés közben

- **Leírás:** A "Hozzáadás" gombnak letiltva kell lennie, amikor az űrlap beküldése folyamatban van (`isSubmitting` értéke `true`).
- **Várható eredmény:** ✅ Sikeres

---

### 9. Űrlap visszaállítása beküldés után

- **Leírás:** Az űrlapnak sikeres beküldés után vissza kell állítania az input mezőket az alapértelmezett értékre, és a dialógust be kell zárni.
- **Várható eredmény:** ✅ Sikeres

---

### 10. i18n (Nemzetköziesítés)

- **Leírás:** A komponensnek megfelelően kell kezelnie a fordítást a `t()` segítségével. Minden szöveges elemnek fordíthatónak kell lennie (pl. "Új kategória hozzáadása", "Mégse", "Hozzáadás", stb.).
- **Várható eredmény:** ✅ Sikeres

---

### 11. Dialógus elérhetősége

- **Leírás:** A dialógusnak elérhetőnek kell lennie a billentyűzettel és a képernyőolvasókkal is, biztosítva a hozzáférhetőséget.
- **Várható eredmény:** ✅ Sikeres

---

## 🟢 Összegzés

A `CreateCategoryDialog.tsx` komponens jól kezeli az új kategóriák létrehozását, biztosítja a szükséges validációkat (nagybetűs kezdés, sértő szavak, kötelező mező), és megfelelően működik a `Formik` és `Yup` integrációval. Az i18n fordítások és a form kezelés is jól működik. Minden teszt sikeresen lefutott.