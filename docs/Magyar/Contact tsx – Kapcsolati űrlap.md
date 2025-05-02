# Contact.tsx – Kapcsolati űrlap

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📝 Tesztelési jegyzőkönyv: **Contact.tsx** – Kapcsolati űrlap

## Bevezetés

Ez a dokumentum az `Contact.tsx` komponens tesztelésére vonatkozik, amely a felhasználók számára lehetőséget ad arra, hogy kapcsolatba lépjenek az alkalmazás adminisztrátorával. Az űrlap tartalmazza a név, email és üzenet mezőket, valamint validálja a bevitt adatokat a `useForm` hook és a `validationRules` segítségével.

---

## ✅ Tesztesetek

### 1. Komponens megjelenítése

- **Leírás:** A komponens megfelelően renderelődik, és az összes szükséges elem (pl. űrlap mezők, gombok) megjelenik.
- **Státusz:** ✅ Sikeres

---

### 2. Név mező működése

- **Leírás:** A név mező helyesen rögzíti a felhasználó által megadott értéket, és az `onChange` esemény működik.
- **Státusz:** ✅ Sikeres

---

### 3. Email mező működése

- **Leírás:** Az email mező megfelelően kezeli a felhasználó által beírt értéket, és az `onChange` esemény aktiválódik.
- **Státusz:** ✅ Sikeres

---

### 4. Üzenet mező működése

- **Leírás:** Az üzenet mező helyesen rögzíti a felhasználó által megadott szöveget, és az `onChange` esemény megfelelően működik.
- **Státusz:** ✅ Sikeres

---

### 5. Űrlap validálás

- **Leírás:** A `useForm` hook megfelelően érvényesíti a mezőket. Ha a felhasználó nem tölt ki minden mezőt, az űrlap nem küldhető el, és a hibák megjelennek a megfelelő mezők alatt.
- **Státusz:** ✅ Sikeres

---

### 6. Hibák megjelenítése

- **Leírás:** A validációs hibák helyesen jelennek meg a `ValidationType` komponens segítségével, ha a felhasználó hibás adatokat ad meg (pl. érvénytelen email cím).
- **Státusz:** ✅ Sikeres

---

### 7. Submit gomb működése

- **Leírás:** A `submit` gomb csak akkor aktiválódik, ha az űrlap helyesen van kitöltve, és a `handleSubmit` metódus megfelelően kezeli az űrlap beküldését.
- **Státusz:** ✅ Sikeres

---

### 8. Animációk

- **Leírás:** A `Slide` animációk megfelelően működnek, és a tartalom balra és jobbra csúszik a megadott irányban.
- **Státusz:** ✅ Sikeres

---

### 9. Nyelvi támogatás

- **Leírás:** A `withTranslation` HOC biztosítja, hogy az összes szöveg (pl. gomb szövege) lokalizálható legyen a kiválasztott nyelv szerint.
- **Státusz:** ✅ Sikeres

---

### 10. Formátum és stílusok

- **Leírás:** Az összes mező, gomb és hibaüzenet megfelelően van stílusozva és a felhasználói felület következetes.
- **Státusz:** ✅ Sikeres

---

### 11. `id` prop kezelése

- **Leírás:** Az `id` prop megfelelően átadódik a `ContactContainer` komponensnek, és biztosítja, hogy a megfelelő azonosítót használja a konténer.
- **Státusz:** ✅ Sikeres

---

### 12. `handleSubmit` funkció tesztelése

- **Leírás:** A `handleSubmit` funkció megfelelően kezeli az űrlap beküldését, és biztosítja, hogy a mezők validálása után a megfelelő adatokat küldjük el.
- **Státusz:** ✅ Sikeres

---

### 13. `handleChange` működése

- **Leírás:** A `handleChange` esemény megfelelően frissíti az űrlap értékeit a `useForm` hookban, és a mezők állapota frissül a felhasználó által végrehajtott változtatások alapján.
- **Státusz:** ✅ Sikeres

---

## 🟢 Összegzés

A `Contact.tsx` komponens teljes mértékben megfelel a tesztelési követelményeknek, és az összes funkció hibátlanul működik. A validálás, animációk, és nyelvi támogatás is megfelelően van implementálva, biztosítva ezzel a felhasználói élmény zökkenőmentességét. Az űrlap helyesen kezeli a felhasználói adatokat és hibákat, és a küldési folyamat is megfelelően történik.