# Check It Out! - The innovative task manager – PWA működés

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📋 Tesztelési jegyzőkönyv: **Check It Out! - The innovative task manager** – PWA működés

## Bevezetés

Ez a dokumentum a **Check It Out!** nevű alkalmazás *Progresszív Webalkalmazás (PWA)* funkcióinak tesztelésére készült. A PWA célja, hogy az alkalmazás natív élményt nyújtson webes környezetben, így fontos, hogy az alábbi kulcselemek megfelelően működjenek: telepíthetőség, ikonok, megjelenítés, offline támogatás és PWA manifest fájl helyessége. A vizsgálat célja annak biztosítása, hogy az alkalmazás minden eszközön és környezetben a várt módon viselkedjen.

---

## ✅ Tesztesetek

### 1. Manifest fájl elérhetősége

- **Leírás:** A `manifest.json` fájl elérhető a megadott URL-en.
- **Lépések:**
    1. Megnyitás böngészőben: `https://<app-url>/manifest.json`
    2. Ellenőrzés, hogy JSON válasz érkezik.
- **Státusz:** ✅ Sikeres

---

### 2. Alkalmazás neve helyesen megjelenik

- **Leírás:** A manifest fájlban szereplő `name` és `short_name` megfelelően jelenik meg a telepített alkalmazás ikonján és menüjében.
- **Lépések:**
    1. Telepítsd az alkalmazást.
    2. Ellenőrizd az ikonján és menüjében a megjelenő nevet.
- **Státusz:** ✅ Sikeres

---

### 3. Helyes ikonformátumok és méretek

- **Leírás:** Az ikonok megfelelő formátumban és méretben szerepelnek.
- **Lépések:**
    1. Ellenőrizd a `manifest.json` fájl `icons` mezőjét.
    2. Győződj meg róla, hogy mind a `.ico`, `.png`, `.webp`, `.svg` típusok szerepelnek.
- **Státusz:** ✅ Sikeres

---

### 4. Favicon helyes megjelenése

- **Leírás:** A `favicon.ico` megfelelően megjelenik a böngészőfülön.
- **Lépések:**
    1. Nyisd meg az alkalmazást böngészőben.
    2. Nézd meg, hogy megjelenik-e a favicon.
- **Státusz:** ✅ Sikeres

---

### 5. Alkalmazás telepíthetősége

- **Leírás:** A böngésző felkínálja a telepítést, és az alkalmazás sikeresen telepíthető.
- **Lépések:**
    1. Nyisd meg az oldalt Chrome vagy Edge böngészőben.
    2. Várd meg, amíg megjelenik a telepítés lehetősége.
    3. Telepítsd az alkalmazást.
- **Státusz:** ✅ Sikeres

---

### 6. Offline mód működése

- **Leírás:** Az alkalmazás elérhető és működik internetkapcsolat nélkül is.
- **Lépések:**
    1. Telepítés után kapcsold ki az internetet.
    2. Indítsd el az alkalmazást.
    3. Ellenőrizd, hogy betöltődik-e.
- **Státusz:** ✅ Sikeres

---

### 7. `start_url` beállítás érvényesítése

- **Leírás:** Az alkalmazás mindig a gyökér (`.`) URL-ről indul.
- **Lépések:**
    1. Telepítés után nyisd meg az appot.
    2. Ellenőrizd az induló URL-t.
- **Státusz:** ✅ Sikeres

---

### 8. `display: standalone` beállítás tesztelése

- **Leírás:** Az alkalmazás külön ablakban, natív élményként nyílik meg, nem böngészőfülben.
- **Lépések:**
    1. Telepítsd az alkalmazást.
    2. Nyisd meg.
    3. Ellenőrizd, hogy nem tartalmaz böngésző címsort.
- **Státusz:** ✅ Sikeres

---

### 9. `theme_color` alkalmazása

- **Leírás:** Az alkalmazás fejlécének színe fekete (`#000000`) a megnyitáskor.
- **Lépések:**
    1. Indítsd el az alkalmazást mobilon.
    2. Ellenőrizd a státuszbárt.
- **Státusz:** ✅ Sikeres

---

### 10. `background_color` betöltés közben

- **Leírás:** A háttér színe fehér (`#ffffff`) a betöltés ideje alatt.
- **Lépések:**
    1. Indítsd el az alkalmazást lassú hálózaton.
    2. Figyeld meg a háttérszínt a betöltés során.
- **Státusz:** ✅ Sikeres

---

### 11. `orientation` beállítás érvényesítése

- **Leírás:** Az alkalmazás álló módban (`portrait-primary`) működik.
- **Lépések:**
    1. Nyisd meg mobilon.
    2. Forgasd el a képernyőt.
    3. Ellenőrizd, hogy az app álló módot preferálja.
- **Státusz:** ✅ Sikeres

---

### 12. Manifest nyelvbeállítás ellenőrzése

- **Leírás:** A `lang` mező értéke `"en"`, tehát az alapértelmezett nyelv angol.
- **Lépések:**
    1. Ellenőrizd a `manifest.json` fájlban a `lang` értékét.
    2. Figyeld meg az alkalmazás felületét.
- **Státusz:** ✅ Sikeres

---

### 13. SVG ikon megjelenése

- **Leírás:** A `vite.svg` típusú ikon megfelelően megjelenik kompatibilis eszközön.
- **Lépések:**
    1. Telepítsd az alkalmazást.
    2. Ellenőrizd, hogy az SVG ikon elérhető-e.
- **Státusz:** ✅ Sikeres

---

### 14. WebP ikon kompatibilitás

- **Leírás:** A WebP formátumú ikon (`checkitout.webp`) támogatott és megjelenik.
- **Lépések:**
    1. Nyisd meg modern böngészőben az alkalmazást.
    2. Ellenőrizd a használt ikon formátumát.
- **Státusz:** ✅ Sikeres

---

### 15. Alkalmazás hatókör (`scope`) működése

- **Leírás:** Az alkalmazás `scope` beállítása `/`, tehát a teljes gyökér elérhető az alkalmazás számára.
- **Lépések:**
    1. Navigálj az alkalmazáson belül különböző aloldalakra.
    2. Ellenőrizd, hogy az app nem navigál ki a hatókörből.
- **Státusz:** ✅ Sikeres