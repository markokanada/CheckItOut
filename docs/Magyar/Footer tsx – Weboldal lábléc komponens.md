# Footer.tsx – Weboldal lábléc komponens

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📝 Tesztelési jegyzőkönyv: **Footer.tsx** – Weboldal lábléc komponens

## Áttekintés

Ez a dokumentum a `Footer.tsx` komponens tesztelésére vonatkozik, amely a weboldal láblécét tartalmazza. A komponens biztosítja a következő funkciókat:

1. **Kapcsolati információk** (email cím).
2. **Dokumentáció** linkek és szövegek.
3. **Címadatok**.
4. **Nyelvválasztó** (angol és magyar).
5. **Weboldal logója** és navigációs linkek.

---

## ✅ Tesztesetek

### 1. **Lábléc megjelenítése**

- **Leírás:** A komponensnek helyesen kell megjeleníteni a lábléc tartalmát, beleértve a kapcsolatot, dokumentációt, címet, nyelvválasztót, és a logót.
- **Várható eredmény:** ✅ Sikeres

---

### 2. **Kapcsolati információk (email)**

- **Leírás:** A "Kapcsolat" szövegre kattintva a felhasználónak email küldési lehetőséget kell kapnia. A megfelelő email címnek (`info@oneofthelot.hu`) kell megjelenni.
- **Várható eredmény:** ✅ Sikeres

---

### 3. **Dokumentációs linkek**

- **Leírás:** A "Dokumentáció" szövegnek és a dokumentáció linknek működnie kell, és a megfelelő oldalra kell navigálnia a felhasználót (az oldal típusától függően).
- **Várható eredmény:** ✅ Sikeres

---

### 4. **Címadatok megjelenítése**

- **Leírás:** A láblécnek tartalmaznia kell a címadatokat, és minden címrészletet (pl. utca, város) helyesen kell megjeleníteni.
- **Várható eredmény:** ✅ Sikeres

---

### 5. **Nyelvválasztó működése**

- **Leírás:** A felhasználónak képesnek kell lennie váltani a nyelvet (angol és magyar között) a nyelvválasztó gombokkal, és a változásoknak azonnal tükröződniük kell az oldalon.
- **Várható eredmény:** ✅ Sikeres

---

### 6. **Logó és navigációs link**

- **Leírás:** A logóra kattintva a felhasználónak a főoldalra kell navigálnia. A logónak megfelelően kell megjelenítenie a weboldalt (`One of The Lot`).
- **Várható eredmény:** ✅ Sikeres

---

### 7. **Linkek elérhetősége**

- **Leírás:** Az összes linknek (pl. "Mail Us", dokumentáció, stb.) kattinthatónak kell lennie, és a megfelelő URL-ekre kell navigálniuk.
- **Várható eredmény:** ✅ Sikeres

---

### 8. **Hozzáférhetőség (accessibility)**

- **Leírás:** A komponensnek hozzáférhetőnek kell lennie a képernyőolvasók számára. Az `aria-label` attribútumokat minden releváns elemnél használni kell.
- **Várható eredmény:** ✅ Sikeres

---

### 9. **Nyelvkezelés**

- **Leírás:** A nyelv változtatásának megfelelően kell működnie a fordításnak. Az összes szöveges tartalomnak (pl. "Contact", "Documentation Title", stb.) megfelelően kell változnia a választott nyelv szerint.
- **Várható eredmény:** ✅ Sikeres

---

### 10. **CSS stílusok és elrendezés**

- **Leírás:** A láblécnek responsívan kell működnie, és a különböző képernyőméretekhez (mobil, tablet, desktop) kell alkalmazkodnia. A tartalomnak megfelelően kell elrendeződnie.
- **Várható eredmény:** ✅ Sikeres

---

## 🟢 Összegzés

A `Footer.tsx` komponens minden szükséges funkciót ellát, beleértve a kapcsolatfelvételt, dokumentációt, nyelvválasztást, és a logót. A nyelvváltoztatás, a linkek működése, és a címadatok mind helyesen jelennek meg. A komponens jól reagál a különböző képernyőméretekre, és megfelelően kezeli a hozzáférhetőséget.