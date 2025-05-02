# Entities.ts – Globális entitás kezelő

Assignee: Márkó Buborék
Parent task: Tesztelési Jegyzőkönyvek (Tesztele%CC%81si%20Jegyzo%CC%8Bko%CC%88nyvek%201ba3a97be885805a845feb9dea195e60.md)
Type: Developer

# 👤 Tesztelési jegyzőkönyv: **Entities.ts** – Globális entitás kezelő

## Bevezetés

Ez a dokumentum az `Entities.ts` fájl tesztelésére vonatkozik, amely felelős a felhasználói és feladatkezelésért, valamint a kapcsolódó API-hívások kezeléséért. Az osztály a `MobX` állapotkezelést használ, és különböző aszinkron műveleteket tartalmaz, például felhasználói adatok betöltése, feladatok kezelése, kategóriák létrehozása, és felhasználók törlése.

---

## ✅ Tesztesetek

### 1. Komponens példányosítása

- **Leírás:** Az `Entities` osztály példányosítható és működik, beleértve a `navigate` függvényt is.
- **Státusz:** ✅ Sikeres

---

### 2. `mobx` állapotkezelés inicializálása

- **Leírás:** Az osztályban található állapotok, mint `_tasks`, `doneTasks`, `user`, `categories`, `users` megfelelően inicializálódnak és megfigyelhetők.
- **Státusz:** ✅ Sikeres

---

### 3. Felhasználói adatok betöltése

- **Leírás:** A `login()` metódus sikeresen betölti a felhasználói adatokat és menti azokat az állapotba. A felhasználó sikeres belépés után a `loadTasks` és `loadCategories` metódusokat is meghívja.
- **Státusz:** ✅ Sikeres

---

### 4. Felhasználó kijelentkezése

- **Leírás:** A `logout()` metódus törli a felhasználó adatait, a feladatokat, kategóriákat és a helyi tárolót. A rendszer visszaállítja az alapállapotot.
- **Státusz:** ✅ Sikeres

---

### 5. Feladatok és elvégzett feladatok betöltése

- **Leírás:** A `loadTasks()` és `loadDoneTasks()` metódusok sikeresen lekérik az adatokat a backendről és frissítik az állapotot.
- **Státusz:** ✅ Sikeres

---

### 6. Feladat hozzáadása

- **Leírás:** A `createTask()` metódus segítségével új feladatot hozhatunk létre. A feladatok mentését követően a `loadTasks` és `loadDoneTasks` metódusok frissítik az adatokat.
- **Státusz:** ✅ Sikeres

---

### 7. Feladat frissítése

- **Leírás:** A `updateTask()` metódus segítségével meglévő feladatok frissíthetők. A frissítés után az új adatok azonnal szinkronizálódnak a frontend és backend között.
- **Státusz:** ✅ Sikeres

---

### 8. Feladat törlése

- **Leírás:** A `deleteUser()` metódus sikeresen törli a felhasználót, és eltávolítja a felhasználói listából.
- **Státusz:** ✅ Sikeres

---

### 9. Kategóriák kezelése

- **Leírás:** A `createCategory()` és `loadCategories()` metódusok sikeresen kezelik a kategóriák hozzáadását és betöltését.
- **Státusz:** ✅ Sikeres

---

### 10. Felhasználók listázása

- **Leírás:** A `fetchUsers()` metódus sikeresen lekéri a felhasználói adatokat a backendről és frissíti az `users` állapotot.
- **Státusz:** ✅ Sikeres

---

### 11. Felhasználói adatok frissítése

- **Leírás:** Az `updateUser()` és `updateUserById()` metódusok sikeresen frissítik a felhasználó adatait a backend-en.
- **Státusz:** ✅ Sikeres

---

### 12. Nyelvi beállítások kezelése

- **Leírás:** A nyelvi beállítások tárolása és visszaállítása megfelelően működik, a nyelvi preferencia alapértelmezetten beállításra kerül a `localStorage`ban.
- **Státusz:** ✅ Sikeres

---

### 13. Hibakezelés

- **Leírás:** A `try/catch` blokkok megfelelően kezelik a hibákat a `sendPasswordResetEmail()` és `resetPassword()` metódusokban. Hibaüzenet jelenik meg, ha a művelet nem sikerül.
- **Státusz:** ✅ Sikeres

---

### 14. MobX akciók és állapot szinkronizálása

- **Leírás:** A `@action` és `@observable` dekorátorok biztosítják, hogy az állapotok megfelelően frissüljenek és szinkronizálódjanak az UI-val.
- **Státusz:** ✅ Sikeres

---

### 15. Felhasználói jogosultságok ellenőrzése és irányítás

- **Leírás:** Az `checkAndRedirectNotRightUser()` metódus biztosítja, hogy ha a felhasználó nem bejelentkezett, a rendszer automatikusan átirányítja a login oldalra.
- **Státusz:** ✅ Sikeres

---

## 🟢 Összegzés

Az `Entities.ts` osztály sikeresen kezeli a felhasználók, feladatok és kategóriák kezelését, beleértve a felhasználók belépését, kijelentkezését, a feladatok hozzáadását, módosítását, törlését, valamint a nyelvi beállítások kezelését. Az összes teszt sikeresen lefutott, és a rendszer minden elvárt működési szempontnak megfelel.