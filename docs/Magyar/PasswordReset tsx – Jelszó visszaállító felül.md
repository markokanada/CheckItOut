# PasswordReset.tsx – Jelszó visszaállító felület

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 🔐 Tesztelési jegyzőkönyv: **PasswordReset.tsx** – Jelszó visszaállító felület

## Bevezetés

Ez a jegyzőkönyv a `PasswordReset.tsx` fájlhoz készült, amely a **Check It Out!** alkalmazás jelszó-visszaállítási funkcióját valósítja meg. A komponens `Formik`-alapú űrlapot használ `Yup` validációval, támogatja az URL-ből történő email/token beolvasást, és `MobX` segítségével kezeli a visszajelzéseket.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** A `PasswordReset` komponens példányosítható egy `navigate` függvénnyel.
- **Lépések:**
    1. `new PasswordReset(navigate)`
- **Státusz:** ✅ Sikeres

---

### 2. `View` metódus observer-ként működik

- **Leírás:** A `View` metódus `observer`rel visszatérő React komponens, amely reagál a MobX-observable változásokra.
- **Státusz:** ✅ Sikeres

---

### 3. URL-ből érkező token és email beolvasása

- **Leírás:** A komponens a `useSearchParams()` segítségével beolvassa az URL-ből a `token` és `email` paramétereket.
- **Lépések:**
    1. Hívás pl.: `/reset-password?token=abc123&email=test@example.com`
    2. A form automatikusan feltölti ezeket az értékeket.
- **Státusz:** ✅ Sikeres

---

### 4. `Formik` validáció megfelelően működik

- **Leírás:** Az `email`, `password` és `confirmPassword` mezők `Yup` sémával validálva vannak.
- **Tesztelt validációk:**
    - Érvényes email formátum
    - Kötelező mezők
    - Jelszó legalább 8 karakter
    - Jelszavak egyezése
- **Státusz:** ✅ Sikeres

---

### 5. Sikeres jelszó visszaállítás visszajelzése

- **Leírás:** A sikeres API válasz után „Password Reset Success” snackbar jelenik meg, majd 3 másodpercen belül navigáció történik a `/login` oldalra.
- **Státusz:** ✅ Sikeres

---

### 6. Hibás token visszajelzése

- **Leírás:** Ha az API válaszában „invalid token” szerepel, az üzenet `Invalid Reset Token` lesz.
- **Státusz:** ✅ Sikeres

---

### 7. Lejárt token visszajelzése

- **Leírás:** Ha az API válaszban `expired` szerepel, a snackbar `Reset Token Expired` üzenetet jelenít meg.
- **Státusz:** ✅ Sikeres

---

### 8. Validációs hiba visszajelzése

- **Leírás:** Ha az API 422-es státuszkóddal tér vissza, akkor a `Validation Error` jelenik meg.
- **Státusz:** ✅ Sikeres

---

### 9. Általános hibaüzenetek kezelése

- **Leírás:** Nem specifikus hiba esetén a komponens a `Password Reset Error` üzenetet jeleníti meg.
- **Státusz:** ✅ Sikeres

---

### 10. i18n fordítás használata

- **Leírás:** A `useTranslation()` hookkal minden mező és üzenet lokalizálva van.
- **Státusz:** ✅ Sikeres

---

### 11. Snackbar visszajelzések működnek

- **Leírás:** A sikeres és hibás műveletek során megfelelő színű és szövegű `Snackbar` jelenik meg.
- **Státusz:** ✅ Sikeres

---

## 🟢 Összegzés

A `PasswordReset.tsx` komponens minden fő funkcióját megbízhatóan teljesíti. Az URL-paraméterek kezelése, űrlap validáció, hibakezelés, lokalizáció és felhasználói visszajelzések stabilan működnek. A visszajelzési logika konzisztens a `Login.tsx` komponenssel, így a felhasználói élmény egységes marad.