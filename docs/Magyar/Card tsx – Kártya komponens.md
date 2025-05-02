# Card.tsx – Kártya komponens

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📝 Tesztelési jegyzőkönyv: **Card.tsx** – Kártya komponens

## Áttekintés

A `Card.tsx` komponens a feladatok megjelenítésére szolgál. Ez a komponens tartalmazza a feladat címét, leírását, státuszát, prioritását, kategóriáját és határidejét. Lehetőséget biztosít a feladat szerkesztésére és státuszának módosítására is.

---

## ✅ Tesztesetek

### 1. **Kártya megjelenítése**

- **Leírás:** A kártya minden fontos adatot tartalmaz (feladat cím, leírás, státusz, prioritás, kategória, határidő), és az adatokat megfelelően kell megjeleníteni.
- **Várható eredmény:** ✅ A feladat adatai helyesen jelennek meg.

---

### 2. **Státusz módosítása**

- **Leírás:** A "In Progress" és "Finished" gombok segítségével módosítható a feladat státusza. A gombok lenyomásakor az új státusznak megfelelő alertnek kell megjelenni.
- **Várható eredmény:** ✅ Az alert üzenet megjelenik és a státusz helyesen frissül.

---

### 3. **Kártya szerkesztése**

- **Leírás:** A kártyán található "Edit" gombra kattintva megnyílik a feladat szerkesztő űrlap. Az űrlap megfelelően kitöltődik a feladat jelenlegi adataival, és a felhasználó szerkesztheti a feladatokat.
- **Várható eredmény:** ✅ A feladat adatainak szerkesztése és mentése helyesen történik.

---

### 4. **Űrlap érvényesítés és hibák**

- **Leírás:** A szerkesztő űrlapon lévő mezők érvényesítése a `Yup` segítségével történik. Minden kötelező mezőnek (pl. cím, leírás, határidő, stb.) ki kell tölteni a megfelelő értéket.
- **Várható eredmény:** ✅ Ha a mezők hibásan vannak kitöltve, a megfelelő hibaüzenetek jelennek meg.

---

### 5. **Alert üzenetek**

- **Leírás:** Az alert üzenetek megfelelően kell megjelenjenek, ha a feladatot sikeresen frissítették vagy hiba történt. A sikeres és hibás üzenetek színei és típusai is megfelelően kell, hogy megjelenjenek.
- **Várható eredmény:** ✅ Az alert üzenet megjelenik a sikeres vagy hibás művelet után.

---

### 6. **Snackbar üzenetek**

- **Leírás:** Az edit snackbar megfelelően kell működjön, amikor a feladatot sikeresen vagy hibásan frissítik. A snackbar üzenetét és típusát (sikeres vagy hibás) a komponens frissíti.
- **Várható eredmény:** ✅ Az snackbar üzenet megjelenik és a megfelelő típusban (sikeres vagy hibás).

---

### 7. **Responsive viselkedés**

- **Leírás:** A komponensnek reszponzívnak kell lennie, és megfelelően kell megjelenítenie a feladatokat különböző képernyőméretek (mobil, tablet, desktop) esetén.
- **Várható eredmény:** ✅ A komponens jól alkalmazkodik a képernyőméretekhez.

---

### 8. **Fordítások**

- **Leírás:** A felület szövegei, mint a feladat státusza, prioritása, kategóriája és a gombok szövege megfelelően kell lefordítva legyenek a felhasználó választott nyelve alapján.
- **Várható eredmény:** ✅ A megfelelő fordítások megjelennek a felhasználó nyelvének megfelelően.

---

### 9. **Kategória és prioritás kijelzése**

- **Leírás:** A feladat kategóriája és prioritása helyesen kell megjelenjen a kártyán. A prioritás szintjének megfelelő színt és szöveget kell megjeleníteni.
- **Várható eredmény:** ✅ A kategória és prioritás színei és szövegei helyesen jelennek meg.

---

### 10. **Képesség a feladat határidejének megjelenítésére**

- **Leírás:** A határidőt helyesen kell formázni és megjeleníteni a kártyán, beleértve a dátumot és időt.
- **Várható eredmény:** ✅ A határidő pontosan és helyesen jelenik meg.

---

### 11. **Kompatibilitás különböző böngészőkben**

- **Leírás:** A komponens megfelelően működjön a leggyakrabban használt böngészőkben (Chrome, Firefox, Safari, Edge).
- **Várható eredmény:** ✅ A kártya minden böngészőben jól működik.

---

## 🟢 Összegzés

A `Card.tsx` komponens megfelelően jeleníti meg a feladatok adatait, és lehetőséget biztosít a feladatok szerkesztésére és státuszának módosítására. Az érvényesítési szabályok, alert üzenetek és snackbar visszajelzések jól működnek. A komponens reszponzív, és a fordítások is helyesen működnek a felhasználó nyelve alapján. A tesztelés során minden funkció helyesen működött, így a komponens megfelelően teljesíti a követelményeket.