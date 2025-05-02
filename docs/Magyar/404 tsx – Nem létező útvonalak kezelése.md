# 404.tsx – Nem létező útvonalak kezelése

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📋 Tesztelési jegyzőkönyv: **404.tsx** – Nem létező útvonalak kezelése

## Bevezetés

Ez a dokumentum a **Check It Out!** alkalmazás `404.tsx` komponensének tesztelését tartalmazza. Ez a komponens jelenik meg, amikor a felhasználó nem létező útvonalra navigál. A komponens célja, hogy felhasználóbarát módon tájékoztassa a látogatót a hibáról, és lehetőséget adjon a főoldalra történő visszatérésre. A tesztelés célja, hogy megerősítse a 404-es oldal megfelelő működését, lokalizációs szövegeinek megjelenítését, valamint a navigációs logika helyességét.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `_404` komponens példányosítható egy `navigate` függvénnyel.
- **Lépések:**
    1. Hozz létre példányt: `new _404(navigate)`
    2. Ellenőrizd, hogy nem dob hibát.
- **Státusz:** ✅ Sikeres

---

### 2. 404 View komponens renderelése

- **Leírás:** A `View` metódus visszaad egy React komponenst observer-ként.
- **Lépések:**
    1. Rendereld a `View`t.
    2. Ellenőrizd, hogy a komponens megjelenik.
- **Státusz:** ✅ Sikeres

---

### 3. Hiba kód megjelenítése

- **Leírás:** A képernyőn megjelenik a "404" felirat kiemelten.
- **Lépések:**
    1. Rendereld a komponenst.
    2. Ellenőrizd a `Typography` elemet, amely tartalmazza a `404` szöveget.
- **Státusz:** ✅ Sikeres

---

### 4. Lokalizált cím megjelenítése

- **Leírás:** A `t("404 Title")` lokalizációs kulcs alapján jelenik meg a cím.
- **Lépések:**
    1. Állíts be fordítást (pl. i18next).
    2. Ellenőrizd, hogy a fordítás jelenik-e meg.
- **Státusz:** ✅ Sikeres

---

### 5. Lokalizált leírás szöveg

- **Leírás:** A `t("404 Description")` szöveg megfelelően jelenik meg.
- **Lépések:**
    1. Ellenőrizd, hogy a `Typography` tartalmazza a leírást.
    2. Állíts át másik nyelvre, ellenőrizd a változást.
- **Státusz:** ✅ Sikeres

---

### 6. Főoldalra visszavezető gomb megjelenése

- **Leírás:** A `Button` komponens megjelenik a képernyőn.
- **Lépések:**
    1. Rendereld a komponenst.
    2. Ellenőrizd, hogy a gomb jelen van.
- **Státusz:** ✅ Sikeres

---

### 7. Gomb feliratának lokalizálása

- **Leírás:** A `t("404 Button")` szöveg jelenik meg a gombon.
- **Lépések:**
    1. Ellenőrizd, hogy a fordított szöveg jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 8. Navigáció működése a főoldalra

- **Leírás:** A gomb megnyomásakor a felhasználó a főoldalra kerül.
- **Lépések:**
    1. Kattints a gombra.
    2. Ellenőrizd, hogy a `navigate("/")` lefutott.
- **Státusz:** ✅ Sikeres

---

### 9. Reszponzív elrendezés középre igazítva

- **Leírás:** A tartalom középen jelenik meg minden nézetméreten.
- **Lépések:**
    1. Nyisd meg mobilon és asztali böngészőben.
    2. Ellenőrizd a középre igazítást.
- **Státusz:** ✅ Sikeres

---

### 10. Flexbox stílusok helyes alkalmazása

- **Leírás:** A `Stack` komponens helyesen rendezi a gyermek elemeket függőlegesen.
- **Lépések:**
    1. Ellenőrizd az elrendezést a DOM-ban.
    2. Vizsgáld meg a távolságokat és igazítást.
- **Státusz:** ✅ Sikeres

---

### 11. Helyes színek és tipográfia használata

- **Leírás:** A cím és szövegek a megadott színekkel és tipográfiai beállításokkal jelennek meg.
- **Lépések:**
    1. Ellenőrizd a `Typography` komponensek színeit és méreteit.
- **Státusz:** ✅ Sikeres

---

### 12. makeObservable sikeres meghívása

- **Leírás:** A konstruktorban meghívott `makeObservable(this)` nem okoz hibát.
- **Lépések:**
    1. Hozz létre példányt.
    2. Ellenőrizd, hogy nem történik kivétel.
- **Státusz:** ✅ Sikeres

---

### 13. Fordítás hiánya esetén fallback működés

- **Leírás:** Ha nincs fordítás, a kulcs jelenik meg.
- **Lépések:**
    1. Távolíts el egy fordítást.
    2. Ellenőrizd a megjelenő fallback kulcsot.
- **Státusz:** ✅ Sikeres

---

### 14. Accessibility – gomb fókuszálható

- **Leírás:** A gomb fókuszálható és aktiválható billentyűzettel.
- **Lépések:**
    1. Navigálj tabulátorral a gombra.
    2. Aktiváld Enterrel.
- **Státusz:** ✅ Sikeres

---

### 15. Konténer minimum magasság alkalmazása

- **Leírás:** A `Container` legalább 45vh magas.
- **Lépések:**
    1. Ellenőrizd a stílust DevTools-szal.
- **Státusz:** ✅ Sikeres