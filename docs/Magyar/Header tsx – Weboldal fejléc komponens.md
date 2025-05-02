# Header.tsx – Weboldal fejléc komponens

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📝 Tesztelési jegyzőkönyv: **Header.tsx** – Weboldal fejléc komponens

## Áttekintés

Ez a dokumentum a `Header.tsx` komponens tesztelésére vonatkozik, amely a weboldal fejlécét tartalmazza. A komponens biztosítja a következő funkciókat:

1. **Navigációs linkek** (például "Miért mi?", "Jellemzők", "Használat", "Tartalom").
2. **Felhasználói linkek** (bejelentkezés, regisztráció).
3. **Alkalmazás-specifikus linkek** (új feladat, profil).
4. **Nyelvválasztó** (angol és magyar).
5. **Bejelentkezés / Kijelentkezés** gombok és kapcsolódó műveletek.

---

## ✅ Tesztesetek

### 1. **Fejléc megjelenítése**

- **Leírás:** A komponensnek helyesen kell megjelenítenie a fejléc tartalmát, beleértve a logót, navigációs linkeket, nyelvválasztót és a hamburger menüt.
- **Várható eredmény:** ✅ Sikeres

---

### 2. **Navigációs linkek megjelenítése és működése**

- **Leírás:** A fejlécben található navigációs linkek (pl. "Miért mi?", "Jellemzők", stb.) kattinthatónak kell lenniük, és megfelelően kell görgetniük az oldalt a megfelelő szakaszhoz.
- **Várható eredmény:** ✅ Sikeres

---

### 3. **Felhasználói linkek (Bejelentkezés, Regisztráció)**

- **Leírás:** Amikor a felhasználó a regisztrációs vagy bejelentkezési linkre kattint, megfelelően a regisztrációs vagy bejelentkezési oldalra kell navigálniuk.
- **Várható eredmény:** ✅ Sikeres

---

### 4. **Alkalmazás-specifikus linkek működése**

- **Leírás:** A felhasználóknak képesnek kell lenniük navigálni a "New Task" (Új feladat) és "Profile" (Profil) oldalra. Admin felhasználóknak elérhetőnek kell lenniük az admin felület linkjének is.
- **Várható eredmény:** ✅ Sikeres

---

### 5. **Kijelentkezés gomb működése**

- **Leírás:** A "Kijelentkezés" gombra kattintva egy megerősítő modálnak kell megjelennie, amelyben a felhasználó megerősítheti a kijelentkezést.
- **Várható eredmény:** ✅ Sikeres

---

### 6. **Nyelvválasztás működése**

- **Leírás:** A felhasználónak képesnek kell lennie váltani a nyelvet (angol és magyar között) a nyelvválasztó gombokkal, és a változásoknak azonnal tükröződniük kell az oldalon.
- **Várható eredmény:** ✅ Sikeres

---

### 7. **Hamburger menü működése**

- **Leírás:** A hamburger menünek nyitnia és záródnia kell a megfelelő gombokkal. A menü tartalmának változtatásai helyesen tükröződnek.
- **Várható eredmény:** ✅ Sikeres

---

### 8. **Modális ablak (Kijelentkezés megerősítés)**

- **Leírás:** A kijelentkezés megerősítésére szolgáló modális ablaknak meg kell jelenni, ha a felhasználó a "Kijelentkezés" gombra kattint. Az ablaknak tartalmaznia kell a "Megerősítés" és "Mégsem" gombokat, és megfelelően kell működnie.
- **Várható eredmény:** ✅ Sikeres

---

### 9. **CSS stílusok és elrendezés**

- **Leírás:** A fejlécnek responsívan kell működnie, és a különböző képernyőméretekhez (mobil, tablet, desktop) kell alkalmazkodnia. A tartalomnak megfelelően kell elrendeződnie.
- **Várható eredmény:** ✅ Sikeres

---

### 10. **Hozzáférhetőség (accessibility)**

- **Leírás:** A komponensnek hozzáférhetőnek kell lennie a képernyőolvasók számára. Az `aria-label` attribútumokat minden releváns elemnél használni kell.
- **Várható eredmény:** ✅ Sikeres

---

## 🟢 Összegzés

A `Header.tsx` komponens minden szükséges funkciót ellát, beleértve a navigációt, felhasználói linkeket, nyelvválasztást és a kijelentkezési funkciót. A hamburger menü, a modális ablak és az alkalmazás-specifikus linkek mind megfelelően működnek. A komponens jól reagál a különböző képernyőméretekre, és megfelelően kezeli a hozzáférhetőséget.