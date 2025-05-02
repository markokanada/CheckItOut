# UserManagement.tsx – Felhasználókezelés

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 👤 Tesztelési jegyzőkönyv: **UserManagement.tsx** – Felhasználókezelés

## Bevezetés

Ez a dokumentum a `UserManagement.tsx` fájl tesztelését dokumentálja, amely lehetővé teszi az adminisztrátorok számára a rendszer felhasználóinak megtekintését, szerkesztését és törlését. A komponens `MobX` állapotkezelést, `MUI` UI elemeket, valamint `i18n` nemzetköziesítést használ. A `GlobalEntities` állapotmodul biztosítja az adatok kezelését, mint például a felhasználók listájának lekérése, módosítása és törlése.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `UserManagement` osztály példányosítható és működik a `navigate` függvénnyel.
- **Státusz:** ✅ Sikeres

---

### 2. `View` metódus observer-ként működik

- **Leírás:** A `View` metódus `observer` wrapperrel van ellátva, hogy reagáljon a MobX állapotváltozásokra.
- **Státusz:** ✅ Sikeres

---

### 3. Felhasználók listázása

- **Leírás:** A táblázat sikeresen betölti és megjeleníti az összes felhasználót a `GlobalEntities.users` tömbből.
- **Státusz:** ✅ Sikeres

---

### 4. Szerkesztési mód aktiválása

- **Leírás:** A „Szerkesztés” gombra kattintva az adott sor mezői szerkeszthetővé válnak.
- **Státusz:** ✅ Sikeres

---

### 5. Módosítás mentése

- **Leírás:** A módosított adatok mentése gombra kattintva megjelenik egy megerősítő dialógus, majd sikeres mentés után frissülnek az adatok és a felhasználó értesítést kap.
- **Státusz:** ✅ Sikeres

---

### 6. Módosítás elvetése

- **Leírás:** A „Mégsem” gombra kattintva az eredeti adatok visszaállnak és a szerkesztési mód megszűnik.
- **Státusz:** ✅ Sikeres

---

### 7. Felhasználó törlése

- **Leírás:** A „Törlés” gombra kattintva megjelenik egy megerősítő dialógus, amely kérdezi a felhasználó törlését. A megerősítés után a felhasználó törlődik és az adatfrissítés megtörténik.
- **Státusz:** ✅ Sikeres

---

### 8. Hibakezelés mentés közben

- **Leírás:** Ha a mentés sikertelen, hibaüzenet jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 9. Hibakezelés törlés közben

- **Leírás:** Ha a törlés sikertelen, hibaüzenet jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 10. Snackbar viselkedése

- **Leírás:** A `Snackbar` 3 másodpercig látható, és manuálisan is bezárható.
- **Státusz:** ✅ Sikeres

---

### 11. i18n fordítás használata

- **Leírás:** Az összes felirat és üzenet a `useTranslation()` hook segítségével lokalizálva van.
- **Státusz:** ✅ Sikeres

---

### 12. MobX állapotkezelés

- **Leírás:** A `@observable` és `@action` dekorátorok biztosítják a UI és a belső állapot szinkronizálását.
- **Státusz:** ✅ Sikeres

---

## 🟢 Összegzés

A `UserManagement.tsx` komponens sikeresen kezeli a felhasználók szerkesztését, törlését, a hibakezelést, valamint a formában történő adatfrissítéseket. A komponens jól integrálódik a `MobX` és i18n rendszerekkel, és minden teszt az elvárásoknak megfelelően sikeresen lefutott.