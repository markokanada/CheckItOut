# Home.tsx – Főoldal megjelenítés és feladatelrendezés

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📋 Tesztelési jegyzőkönyv: **Home.tsx** – Főoldal megjelenítés és feladatelrendezés

## Bevezetés

Ez a tesztelési jegyzőkönyv a **Check It Out!** alkalmazás `Home.tsx` fájljában található komponens működését ellenőrzi. A `Home` oldal célja, hogy különböző szekciókban jelenítse meg a felhasználó következő, napi és elvégzett feladatait. A megjelenés teljes mértékben reszponzív, a feladatok `BaseCard` komponensek formájában jelennek meg. A nyelvi fordítást az `i18next`, az állapotkezelést a `mobx` rendszer biztosítja, míg az adaptív dizájnt a `@mui/material` elemei támogatják.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `Home` osztály példányosítható, és elfogad egy `navigate` függvényt paraméterként.
- **Lépések:**
    1. Példányosítsd: `new Home(navigate)`
- **Státusz:** ✅ Sikeres

---

### 2. Betöltési állapot (`loading`) alatt animáció jelenik meg

- **Leírás:** A `Backdrop` és `CircularProgress` animációk aktívak, amíg a `loading` értéke `true`.
- **Lépések:**
    1. Állítsd be: `loading = true`
    2. Ellenőrizd az animációkat
- **Státusz:** ✅ Sikeres

---

### 3. Tartalom csak betöltés után jelenik meg

- **Leírás:** A `View` komponens 1.2 másodperccel a betöltés után jeleníti meg a fő tartalmat.
- **Lépések:**
    1. Indítsd el a komponenst
    2. Várj 1.2 másodpercet
    3. Ellenőrizd a megjelenő szekciókat
- **Státusz:** ✅ Sikeres

---

### 4. Következő feladat (Next Task) kártya megjelenítése

- **Leírás:** A `GlobalEntities.firstTask` megléte esetén a szekcióban `BaseCard` jelenik meg.
- **Lépések:**
    1. Adj értéket a `firstTask` változónak
    2. Ellenőrizd a megjelenést
- **Státusz:** ✅ Sikeres

---

### 5. Nincs következő feladat esetén `EmptyMessage` jelenik meg

- **Leírás:** A `firstTask` hiányában üres állapotüzenet jelenik meg a szekcióban.
- **Lépések:**
    1. Töröld vagy hagyd üresen a `firstTask`ot
    2. Figyeld meg a `EmptyMessage` jelenlétét
- **Státusz:** ✅ Sikeres

---

### 6. Mai feladatok szekcióban több `BaseCard` renderelődik

- **Leírás:** A `GlobalEntities.tasks` tömb elemeihez külön kártyák tartoznak.
- **Lépések:**
    1. Adj hozzá teszt adatokat a `tasks` tömbhöz
    2. Ellenőrizd, hogy mindegyikhez kártya jelenik meg
- **Státusz:** ✅ Sikeres

---

### 7. Nincs napi feladat esetén `EmptyMessage` jelenik meg

- **Leírás:** Ha a `tasks` tömb üres, akkor a szekció csak üzenetet tartalmaz.
- **Lépések:**
    1. Ürítsd ki a `GlobalEntities.tasks` tömböt
    2. Ellenőrizd az üres állapotot
- **Státusz:** ✅ Sikeres

---

### 8. Elvégzett feladatok (`doneTasks`) megjelenítése

- **Leírás:** A `GlobalEntities.doneTasks` tömbben szereplő elemekhez `BaseCard` komponensek tartoznak.
- **Lépések:**
    1. Adj hozzá befejezett feladatokat
    2. Ellenőrizd a kártyák megjelenését
- **Státusz:** ✅ Sikeres

---

### 9. Nincs elvégzett feladat esetén `EmptyMessage` jelenik meg

- **Leírás:** Ha a `doneTasks` tömb üres, a komponens egy üzenetet jelenít meg.
- **Lépések:**
    1. Állítsd üresre a `doneTasks`ot
    2. Figyeld meg az eredményt
- **Státusz:** ✅ Sikeres

---

### 10. Reszponzív elrendezés működik

- **Leírás:** A komponens eltérően jelenik meg asztali és mobil nézetben (`lgDown` és `lgUp`).
- **Lépések:**
    1. Teszteld nagy méretű viewporton → háromoszlopos elrendezés
    2. Teszteld mobil viewporton → egymás alatti szekciók
- **Státusz:** ✅ Sikeres

---

### 11. Fordított szekciócímek a kiválasztott nyelv alapján

- **Leírás:** A `useTranslation` által nyújtott címek helyesen jelennek meg.
- **Lépések:**
    1. Ellenőrizd a `t("Next Task Title")`, `t("Today Task Title")`, `t("Done Task Title")` értékeket
- **Státusz:** ✅ Sikeres

---

### 12. MobX állapotfrissítés hatására újrarenderel

- **Leírás:** A `tasks`, `doneTasks` vagy `firstTask` módosítása után a komponens újra renderelődik.
- **Lépések:**
    1. Frissíts egy `Task` listát
    2. Figyeld meg az azonnali frissülést
- **Státusz:** ✅ Sikeres

---

### 13. `createCard` metódus helyesen generálja a feladatkártyát

- **Leírás:** A `createCard` egy `BaseCard` példányt hoz létre adott feladatobjektum alapján.
- **Lépések:**
    1. Hívd meg a metódust teszt adattal
    2. Vizsgáld meg a visszatérő JSX-et
- **Státusz:** ✅ Sikeres

---

### 14. Felhasználói jogosultság ellenőrzése betöltéskor

- **Leírás:** A `checkAndRedirectNotRightUser()` metódus futtatásra kerül a komponens betöltésekor.
- **Lépések:**
    1. Állíts be logoló vagy mockoló logikát
    2. Ellenőrizd a metódus futását
- **Státusz:** ✅ Sikeres

---

### 15. Nyelvváltás után frissül a teljes tartalom

- **Leírás:** A szekciócímek és üres állapotüzenetek a kiválasztott nyelv szerint változnak.
- **Lépések:**
    1. Válts nyelvet az alkalmazásban
    2. Ellenőrizd az új szövegeket a felületen
- **Státusz:** ✅ Sikeres