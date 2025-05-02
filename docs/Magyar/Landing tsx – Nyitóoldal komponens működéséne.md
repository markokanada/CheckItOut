# Landing.tsx – Nyitóoldal komponens működésének ellenőrzése

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📋 Tesztelési jegyzőkönyv: **Landing.tsx** – Nyitóoldal komponens működésének ellenőrzése

## Bevezetés

Ez a tesztelési jegyzőkönyv a **Check It Out!** alkalmazás `Landing.tsx` fájljához készült. A `Landing` osztály felelős a nyitóoldal megjelenítéséért, amely több statikus és dinamikus tartalomblokkot tartalmaz, reszponzív elrendezéssel és szekciókra bontott információval. A tartalmak külső `.json` fájlokból érkeznek, az elrendezés `chakra-ui` komponensekkel történik. A `ScrollToTop` komponens biztosítja az automatikus görgetést az oldal tetejére.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `Landing` komponens példányosítható egy `navigate` függvénnyel.
- **Lépések:**
    1. Hozz létre példányt: `new Landing(navigate)`
- **Státusz:** ✅ Sikeres

---

### 2. View metódus visszaad egy JSX elemet

- **Leírás:** A `View` metódus egy React JSX struktúrát ad vissza.
- **Lépések:**
    1. Hívd meg a `View` metódust
    2. Ellenőrizd a JSX visszatérési értéket
- **Státusz:** ✅ Sikeres

---

### 3. `ScrollToTop` komponens megjelenik

- **Leírás:** Az oldal tetején elhelyezkedik a görgetést visszaállító komponens.
- **Lépések:**
    1. Rendereld a komponenst
    2. Ellenőrizd a `ScrollToTop` jelenlétét
- **Státusz:** ✅ Sikeres

---

### 4. Helyes `ContentBlock` komponensek sorrendben

- **Leírás:** A `ContentBlock` szekciók megfelelő adatokkal és sorrendben jelennek meg.
- **Lépések:**
    1. Ellenőrizd a `IntroContent`, `AboutContent`, `MissionContent`, `ProductContent` betöltését
    2. Ellenőrizd az ikonokat és irányokat (`left`, `right`)
- **Státusz:** ✅ Sikeres

---

### 5. `MiddleBlock` tartalom megfelelően jelenik meg

- **Leírás:** A középső blokk tartalma és gombja megjelenik a JSON alapján.
- **Lépések:**
    1. Ellenőrizd a `MiddleBlockContent` adatainak betöltését
- **Státusz:** ✅ Sikeres

---

### 6. `ContactForm` megjelenítése a lap alján

- **Leírás:** A kapcsolatfelvételi űrlap megjelenik a `ContactContent` alapján.
- **Lépések:**
    1. Ellenőrizd a `ContactForm` jelenlétét és tartalmát
- **Státusz:** ✅ Sikeres

---

### 7. Tartalomforrások megfelelő betöltése JSON fájlokból

- **Leírás:** A komponens helyesen használja az `IntroContent.json`, `AboutContent.json`, stb. fájlokat.
- **Lépések:**
    1. Ellenőrizd az adatok megjelenését (cím, szöveg, gombfelirat)
- **Státusz:** ✅ Sikeres

---

### 8. Reszponzív elrendezés működik

- **Leírás:** A `useBreakpointValue` segítségével a dizájn alkalmazkodik a képernyőmérethez.
- **Lépések:**
    1. Szimulálj különböző képernyőméreteket
    2. Figyeld meg a vizuális elrendezés változását
- **Státusz:** ✅ Sikeres

---

### 9. Komponens nem tartalmaz nem használt importokat

- **Leírás:** Az összes import használt, redundáns import nincs a fájlban.
- **Lépések:**
    1. Ellenőrizd az `Icon`, `Image`, `SimpleGrid` használatát
- **Státusz:** ⚠️ Részben sikeres (van néhány nem használt import)

---

### 10. `Container` komponens biztosítja a középre igazítást

- **Leírás:** A tartalom a `Container` komponensben jelenik meg, ami korlátozza a maximális szélességet.
- **Lépések:**
    1. Ellenőrizd a `Container` komponens meglétét a JSX fában
- **Státusz:** ✅ Sikeres

---

### 11. Minden szekcióhoz tartozik egyedi `id`

- **Leírás:** A szekciók rendelkeznek `id` attribútummal a horgonyzott navigációhoz.
- **Lépések:**
    1. Ellenőrizd a következő `id` értékeket: `intro`, `getStarted`, `why-us`, `features`, `usage`, `content`
- **Státusz:** ✅ Sikeres