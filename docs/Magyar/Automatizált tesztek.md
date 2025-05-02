# Tesztelési Dokumentáció

## Áttekintés

Az alkalmazás tesztelése több szinten történik:

1. **Frontend tesztelés**: Selenium WebDriver segítségével
2. **API tesztelés**: PHPUnit alapú végpont tesztelés
3. **Egységtesztelés**: Kontroller metódusok tesztelése

## Frontend Tesztek (Selenium WebDriver)

### 1. Alapvető Frontend Teszt (base.test.js)

- **Cél**: Az alkalmazás főoldalának megfelelő betöltődésének ellenőrzése
- **Tesztelt funkciók**:
    - Oldal megfelelő betöltése
    - Cím ellenőrzése
    - Proxy beállítások kezelése
- **Környezet**: Chrome böngésző
