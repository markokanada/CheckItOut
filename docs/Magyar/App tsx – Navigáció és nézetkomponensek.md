# App.tsx – Navigáció és nézetkomponensek

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📋 Tesztelési jegyzőkönyv: **App.tsx** – Navigáció és nézetkomponensek

## Bevezetés

Ez a tesztelési jegyzőkönyv a `App.tsx` fájlban megvalósított komponensalapú nézet- és útvonalkezelés ellenőrzésére szolgál a **Check It Out!** alkalmazásban. Az `App` osztály felelős a különböző oldalak (`Login`, `Home`, `Register`, stb.) közötti navigáció biztosításáért, valamint a `mobx` által biztosított megfigyelhető és számított (computed) tulajdonságok segítségével dinamikusan irányítja a felhasználói felületet. A cél annak biztosítása, hogy az összes útvonal megfelelően rendereli a hozzá tartozó komponenseket, és hogy a jogosultságkezelés (pl. `isLoggedIn`) helyesen működik.

---

## ✅ Tesztesetek

### 1. Komponens inicializálás navigációs függvénnyel

- **Leírás:** Az `App` osztály példányosítható a `navigate` függvénnyel.
- **Lépések:**
    1. Hozz létre példányt: `new App(navigate)`
    2. Ellenőrizd, hogy nem dob hibát.
- **Státusz:** ✅ Sikeres

---

### 2. computed getter – Login oldal elérhetősége

- **Leírás:** A `login` getter visszaad egy `Login` példányt.
- **Lépések:**
    1. Példányosítsd az `App`ot.
    2. Hívd meg az `app.login.View` komponenst.
- **Státusz:** ✅ Sikeres

---

### 3. computed getter – Landing oldal működése

- **Leírás:** A kezdőoldal (`landing`) komponens megfelelően elérhető.
- **Lépések:**
    1. Navigálj `/` útvonalra.
    2. Ellenőrizd, hogy a `Landing` nézet jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 4. isLoggedIn működése

- **Leírás:** Az `isLoggedIn` tulajdonság `true`, ha a `GlobalEntities.user.id` nem `undefined`.
- **Lépések:**
    1. Adj értéket a `GlobalEntities.user.id`nek.
    2. Ellenőrizd az `isLoggedIn` értékét.
- **Státusz:** ✅ Sikeres

---

### 5. Jogosultság alapú Home elérés

- **Leírás:** A `/app/home` útvonal csak bejelentkezett felhasználó esetén jelenik meg.
- **Lépések:**
    1. Bejelentkezett felhasználónál nyisd meg a `/app/home` oldalt.
    2. Kijelentkezve próbáld meg újra.
- **Státusz:** ✅ Sikeres

---

### 6. Layout szerkezet megjelenése

- **Leírás:** Az oldal struktúrája megfelelő: `Header`, tartalom, majd `Footer`.
- **Lépések:**
    1. Indítsd el az alkalmazást.
    2. Ellenőrizd a komponenshierarchiát.
- **Státusz:** ✅ Sikeres

---

### 7. Dokumentáció oldal tesztelése

- **Leírás:** A dokumentáció oldal elérhető `/how-to-use` és `/app/how-to-use` útvonalon.
- **Lépések:**
    1. Navigálj mindkét útvonalra.
    2. Ellenőrizd, hogy a `Documentation` komponens jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 8. Új feladat létrehozása nézet teszt

- **Leírás:** A `/app/newTask` útvonalon a `TaskRecording` oldal renderelődik.
- **Lépések:**
    1. Navigálj az oldalra.
    2. Ellenőrizd, hogy a komponens megjelenik.
- **Státusz:** ✅ Sikeres

---

### 9. Profil oldal helyes renderelése

- **Leírás:** A `/app/profile` útvonalon a `Profile` oldal jelenik meg.
- **Lépések:**
    1. Navigálj `/app/profile`re.
    2. Ellenőrizd, hogy a `Profile` komponens renderelődik.
- **Státusz:** ✅ Sikeres

---

### 10. Admin felhasználókezelés oldal

- **Leírás:** A `/app/admin/users` útvonal a `UserManagement` komponenst jeleníti meg.
- **Lépések:**
    1. Navigálj az oldalra.
    2. Ellenőrizd a komponens renderelését.
- **Státusz:** ✅ Sikeres

---

### 11. Regisztrációs oldal elérhetősége

- **Leírás:** A `/register` útvonalon megjelenik a regisztrációs nézet.
- **Lépések:**
    1. Navigálj az oldalra.
    2. Ellenőrizd a `Register` komponenst.
- **Státusz:** ✅ Sikeres

---

### 12. Bejelentkezés oldal elérhetősége

- **Leírás:** A `/login` útvonalra lépve a `Login` nézet töltődik be.
- **Lépések:**
    1. Navigálj az oldalra.
    2. Ellenőrizd a `Login` komponens megjelenését.
- **Státusz:** ✅ Sikeres

---

### 13. Elfelejtett jelszó oldal teszt

- **Leírás:** A `/reset-password` útvonal megjeleníti a jelszó visszaállítási nézetet.
- **Lépések:**
    1. Navigálj az adott oldalra.
    2. Ellenőrizd, hogy a `PasswordReset` komponens renderelődik.
- **Státusz:** ✅ Sikeres

---

### 14. 404 oldal működése

- **Leírás:** Nem létező útvonalra lépve a 404 oldal töltődik be.
- **Lépések:**
    1. Navigálj pl. `/random-route`ra.
    2. Ellenőrizd, hogy a `_404` komponens jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 15. Suspense használata aszinkron renderelésre

- **Leírás:** A `Suspense` fallback értékkel védi az alkalmazást a lassú komponensbetöltés ellen.
- **Lépések:**
    1. Szimulálj lassú betöltést.
    2. Ellenőrizd, hogy az alkalmazás nem omlik össze.
- **Státusz:** ✅ Sikeres