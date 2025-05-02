# Adatbázis - egyed kapcsolatok

Assignee: Márkó Buborék
Type: Developer

## Bevezető

Az MVP-ben ezek az entitások lehetnek jelen:

## Entitások

- **User (Felhasználó)**
    - **Felhasználó ID**
    - **Név**
    - **E-mail**
    - Jelszó
- **Task (Feladat)**
    - **Feladat ID**
    - **Leírás**
    - **Határidő**
    - **Prioritás**
    - **Státusz** (pl. új, folyamatban, kész)
    - **Kategória**
- **Schedule (Napirend)**
    - **Időintervallum**
    - **Feladat ID**

### Kapcsolatok:

- Egy felhasználó több feladatot is felvehet, és több napirendi elemhez kapcsolódhat.
- Egy feladat több napirendi elemhez is rendelhető, ha például ismétlődő.