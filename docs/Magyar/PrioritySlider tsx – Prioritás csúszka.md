# PrioritySlider.tsx – Prioritás csúszka

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 📝 Tesztelési jegyzőkönyv: **PrioritySlider.tsx** – Prioritás csúszka

## Áttekintés

Ez a dokumentum a `PrioritySlider.tsx` komponens tesztelésére vonatkozik, amely egy csúszkát jelenít meg a felhasználó számára a prioritás kiválasztásához. A csúszka skálája 1-től 10-ig terjed, különböző színekkel, amelyek a prioritás szintjét tükrözik. A komponens képes a prioritás értékének megfelelő szín és szöveg kijelzésére.

---

## ✅ Tesztesetek

### 1. **Prioritás érték kijelzése**

- **Leírás:** A csúszka aktuális értékének megfelelően a címkén megfelelő szövegnek kell megjelennie, amely a prioritás szintjét tükrözi. Az érték színe és szövege a következőképpen kell alakuljon:
    - 1: Zöld (Nagyon alacsony)
    - 10: Sötét piros (Kritikus)
- **Várható eredmény:** ✅ Sikeres

---

### 2. **Színek és szövegek megfelelő megjelenítése**

- **Leírás:** A csúszka színe és a szöveg színe a prioritás értékének megfelelően kell, hogy változzon. Minden egyes értékhez egy adott szín és szöveg tartozik (pl. 1-es értékhez zöld, 10-es értékhez sötét piros).
- **Várható eredmény:** ✅ Sikeres

---

### 3. **Slider működése**

- **Leírás:** A csúszka értékét 1-től 10-ig kell módosítani, és az értékek között csak egész számoknak kell szerepelniük. A csúszka lépésköze 1.
- **Várható eredmény:** ✅ Sikeres

---

### 4. **Szín és háttér megfelelő alkalmazása a csúszkán**

- **Leírás:** A csúszka színének változnia kell a prioritás értékével összhangban. A csúszka hüvelykujjának és a kijelzett értékének is a megfelelő prioritás színét kell mutatnia.
- **Várható eredmény:** ✅ Sikeres

---

### 5. **Helyes fordítások**

- **Leírás:** A csúszka címkéjén (pl. "Priority Title") és a prioritás értékénél (pl. "Priority Value 1") a megfelelő fordításoknak kell megjelenniük a kiválasztott nyelv alapján.
- **Várható eredmény:** ✅ Sikeres

---

### 6. **Responsive viselkedés**

- **Leírás:** A komponensnek megfelelően kell reagálnia különböző képernyőméretekre (mobil, tablet, desktop).
- **Várható eredmény:** ✅ Sikeres

---

### 7. **Használhatóság és elérhetőség (accessibility)**

- **Leírás:** A csúszkának elérhetőnek kell lennie a képernyőolvasók számára, és megfelelő `aria` címkéknek kell szerepelniük a csúszkán.
- **Várható eredmény:** ✅ Sikeres

---

### 8. **Kijelölt értékek megjelenítése**

- **Leírás:** A csúszka felett megjelenő érték címke színének és betűtípusának is alkalmazkodnia kell a prioritás szintjéhez. A legmagasabb prioritás (10-es) betűtípusa félkövér legyen.
- **Várható eredmény:** ✅ Sikeres

---

### 9. **Márkák (marks) megjelenítése**

- **Leírás:** A csúszkán a márkák minden egyes prioritási szintnél (1-10) meg kell jelenniük, hogy a felhasználó pontosan láthassa, milyen értékek közül választhat.
- **Várható eredmény:** ✅ Sikeres

---

### 10. **Kompatibilitás különböző böngészőkben**

- **Leírás:** A csúszka megfelelően kell működjön a főbb böngészőkben (Chrome, Firefox, Safari, Edge).
- **Várható eredmény:** ✅ Sikeres

---

## 🟢 Összegzés

A `PrioritySlider.tsx` komponens a prioritás csúszka teljes funkcionalitását biztosítja. A csúszka megfelelően reagál a felhasználói interakciókra, és a prioritás szintjéhez tartozó színek és szövegek jól jelennek meg. A komponens teljes mértékben reszponzív, és biztosítja a helyes fordítást és elérhetőséget. Minden teszteset sikeresen teljesült, így a komponens jól működik a várt módon.