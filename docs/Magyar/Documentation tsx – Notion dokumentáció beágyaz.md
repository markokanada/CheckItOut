# Documentation.tsx – Notion dokumentáció beágyazása

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📋 Tesztelési jegyzőkönyv: **Documentation.tsx** – Notion dokumentáció beágyazása

## Bevezetés

Ez a tesztelési jegyzőkönyv a **Check It Out!** alkalmazás `Documentation.tsx` fájljában található komponens működését ellenőrzi. A komponens célja, hogy az alkalmazás dokumentációját a Notion platformon keresztül, beágyazottan jelenítse meg a felhasználó számára. A dokumentációs oldal URL-je a kiválasztott nyelv alapján dinamikusan kerül meghatározásra az i18next lokalizációs rendszer segítségével. A komponens `iframe` elemet használ a Notion oldal beágyazásához.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `Documentation` osztály példányosítható a `navigate` paraméterrel.
- **Lépések:**
    1. Hozz létre új példányt: `new Documentation(navigate)`
    2. Ellenőrizd, hogy nem dob hibát.
- **Státusz:** ✅ Sikeres

---

### 2. View komponens renderelése

- **Leírás:** A `View` metódus egy React komponenst ad vissza.
- **Lépések:**
    1. Hívd meg a `View`t.
    2. Ellenőrizd, hogy az `iframe` megjelenik.
- **Státusz:** ✅ Sikeres

---

### 3. i18next használata link fordításához

- **Leírás:** A `t("Documentation Link")` kulcs alapján jelenik meg a Notion URL.
- **Lépések:**
    1. Állíts be különböző nyelvű fordításokat.
    2. Ellenőrizd, hogy a megfelelő link jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 4. Nyelvváltásra a megfelelő dokumentáció töltődik be

- **Leírás:** Az alkalmazás nyelvének váltásával változik az iframe forrása.
- **Lépések:**
    1. Váltsd a nyelvet pl. angolról magyarra.
    2. Ellenőrizd, hogy az `iframe.src` is változik.
- **Státusz:** ✅ Sikeres

---

### 5. Iframe teljes szélességű megjelenítése

- **Leírás:** Az iframe 100% szélességgel jelenik meg.
- **Lépések:**
    1. Rendereld a komponenst.
    2. Ellenőrizd a CSS stílust.
- **Státusz:** ✅ Sikeres

---

### 6. Iframe magassága megfelelő (120vh)

- **Leírás:** A dokumentáció iframe elég hosszú, hogy ne legyen görgetés a főoldalon.
- **Lépések:**
    1. Ellenőrizd a stílusbeállítást.
- **Státusz:** ✅ Sikeres

---

### 7. Keret nélküli megjelenés

- **Leírás:** Az iframe keret nélkül (border: none) jelenik meg.
- **Lépések:**
    1. Ellenőrizd az iframe DOM attribútumait.
- **Státusz:** ✅ Sikeres

---

### 8. Teljes képernyő engedélyezése

- **Leírás:** Az iframe tartalma teljes képernyőn is megjeleníthető.
- **Lépések:**
    1. Ellenőrizd az `allowFullScreen` attribútum meglétét.
- **Státusz:** ✅ Sikeres

---

### 9. Megfelelő localizált URL visszaadása

- **Leírás:** A lokalizált kulcsban szereplő URL helyes és elérhető.
- **Lépések:**
    1. Hasonlítsd össze a kulcsban lévő URL-t a várt linkkel.
- **Státusz:** ✅ Sikeres

---

### 10. Visszalépési lehetőség biztosítása a böngésző által

- **Leírás:** Az iframe nem akadályozza meg a böngésző navigációját.
- **Lépések:**
    1. Navigálj vissza gombbal.
    2. Ellenőrizd, hogy működik.
- **Státusz:** ✅ Sikeres

---

### 11. Fallback nélkül is működőképes renderelés

- **Leírás:** A komponens `Suspense` vagy fallback nélkül is működik.
- **Lépések:**
    1. Rendereld különállóan a komponenst.
    2. Ellenőrizd, hogy megjelenik.
- **Státusz:** ✅ Sikeres

---

### 12. Hibás lokalizációs kulcs esetén iframe nem törik meg

- **Leírás:** Ha a `Documentation Link` kulcs hibás, a komponens nem omlik össze.
- **Lépések:**
    1. Töröld ki vagy hibásítsd meg a fordítást.
    2. Ellenőrizd, hogy az alkalmazás nem dob hibát.
- **Státusz:** ✅ Sikeres

---

### 13. Observer wrapper használata

- **Leírás:** A komponens `observer` wrapper-rel van ellátva.
- **Lépések:**
    1. Ellenőrizd, hogy a View observer-komponens.
- **Státusz:** ✅ Sikeres

---

### 14. MobX makeObservable meghívása

- **Leírás:** A konstruktorban meghívott `makeObservable` nem dob hibát, még ha üres is.
- **Lépések:**
    1. Inicializáld az osztályt.
    2. Ellenőrizd, hogy nincs kivétel.
- **Státusz:** ✅ Sikeres

---

### 15. Komponens újranyelv-betöltés esetén frissül

- **Leírás:** A dokumentáció iframe újranyelv-váltáskor frissül.
- **Lépések:**
    1. Válts nyelvet.
    2. Ellenőrizd, hogy a `src` URL frissül.
- **Státusz:** ✅ Sikeres