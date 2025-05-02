# Login.tsx – Bejelentkező felület

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 🔐 Tesztelési jegyzőkönyv: **Login.tsx** – Bejelentkező felület

## Bevezetés

Ez a jegyzőkönyv a `Login.tsx` fájlhoz készült, amely a **Check It Out!** alkalmazás felhasználó-bejelentkezési logikáját és megjelenítését valósítja meg. A komponens egy `Formik`-alapú űrlapot tartalmaz validációval, jelszóemlékeztető dialógussal, `Snackbar` alapú visszajelzésekkel, és `MobX`-alapú állapotkezeléssel.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `Login` komponens példányosítható `navigate` paraméterrel.
- **Lépések:**
    1. `new Login(navigate)`
- **Státusz:** ✅ Sikeres

---

### 2. `View` metódus observer-ként működik

- **Leírás:** A `View` metódus observer-wrapperben tér vissza, figyelve a `MobX` változókat.
- **Státusz:** ✅ Sikeres

---

### 3. Automatikus navigáció bejelentkezett felhasználó esetén

- **Leírás:** Ha a `GlobalEntities.user.id` definiált, akkor automatikus navigáció történik `/app/home`ra.
- **Lépések:**
    1. Szimulálj bejelentkezett felhasználót
    2. Ellenőrizd az átirányítást
- **Státusz:** ✅ Sikeres

---

### 4. `Formik` validáció megfelelően működik

- **Leírás:** Az email és jelszó mezők `Yup` validációval vannak ellátva, i18n fordításokat használva.
- **Tesztelt validációk:**
    - Helyes email formátum
    - Kötelező mezők
    - Jelszó minimum 6 karakter
- **Státusz:** ✅ Sikeres

---

### 5. Hibás bejelentkezés visszajelzései

- **Leírás:** Különböző hibaüzenetek jelennek meg a szerver válaszaitól függően.
- **Szimulált esetek:**
    - Hibás email (`Login Error 2`)
    - 401-es státuszkód (`Login Error 3`)
    - 422-es státuszkód validációs hibával (`Validation Error`)
- **Státusz:** ✅ Sikeres

---

### 6. Sikeres bejelentkezés visszajelzése

- **Leírás:** Sikeres bejelentkezés után snackbar jelenik meg, majd automatikus átirányítás.
- **Státusz:** ✅ Sikeres

---

### 7. Elfelejtett jelszó dialógus működése

- **Leírás:** A dialógus megjelenik, majd a jelszóemlékeztető email elküldhető.
- **Szimulált válaszok:**
    - Sikeres email küldés (`Password Reset Sent`)
    - Email nem található (`Email Not Found`)
    - Throttling (`Password Reset Throttled`)
- **Státusz:** ✅ Sikeres

---

### 8. Jelszó visszaállítás logika

- **Leírás:** A `handlePasswordReset` metódus visszaállítja a jelszót email-token kombináció alapján.
- **Szimulált válaszok:**
    - Sikeres (`Password Reset Success`)
    - Hibás token (`Invalid Reset Token`)
    - Lejárt token (`Reset Token Expired`)
- **Státusz:** ✅ Sikeres

---

### 9. i18n fordítás használata minden címkéhez és üzenethez

- **Leírás:** A `useTranslation()` horgony segítségével minden felirathoz fordítási kulcs tartozik.
- **Státusz:** ✅ Sikeres

---

### 10. Snackbar megjelenés minden visszajelzéshez

- **Leírás:** Minden sikeres vagy sikertelen eseményhez snackbar jelenik meg megfelelő üzenettel és színnel.
- **Státusz:** ✅ Sikeres

---

### 11. Navigáció a regisztrációs oldalra

- **Leírás:** A „Nincs fiókod?” link átirányít `/register` oldalra.
- **Státusz:** ✅ Sikeres

---

### 12. Elfelejtett jelszó dialógus bezárása tisztítja az állapotot

- **Leírás:** A dialógus bezárásakor a `forgotPasswordEmail` kiürül.
- **Státusz:** ✅ Sikeres

---

---

## 🟢 Összegzés

A `Login.tsx` komponens minden fő funkcióját stabilan és hibakezeléssel látja el. A form validáció, API hívások, és felhasználói visszajelzések megfelelően működnek. Javasolt a **Chakra UI vs MUI** egységesítése a stíluskonzisztencia érdekében.