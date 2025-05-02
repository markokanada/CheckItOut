# CheckItOut - Fejlesztői Dokumentáció

## Bevezetés

A CheckItOut egy Docker-alapú fejlesztői környezetben futó webalkalmazás, amely a következő komponensekből áll:

- **Backend**: PHP (Laravel) alapú szerveroldali alkalmazás
- **Frontend**: Node.js alapú kliensoldali alkalmazás
- **Adatbázis**: Docker Compose segítségével elindított adatbázis szolgáltatás

## Beüzemelés

### Előfeltételek

- Docker és Docker Compose telepítve
- Bash rendelhéj elérhető (Linux/Mac/WSL2 Windows alatt)

### Telepítési lépések

1. **Kód letöltése**:
    
    bash
    
    ```
    git clone <repository-url>
    cd CheckItOut
    ```
    
2. **Indítási szkript futtatása**:
    
    bash
    
    ```
    chmod +x start.sh  # Csak első futtatáskor szükséges, jogosultság beállítása
    ./start.sh
    ```
    
3. **Ellenőrzés**:
    - Az alkalmazás elérhető lesz a `http://localhost` címen
    - A backend API elérhető lesz a `http://localhost/api` címen

## Részletes indítási folyamat (`start.sh`)

A `start.sh` szkript a következő műveleteket hajtja végre:

1. **Környezeti változók beállítása**:
    
    bash
    
    ```
    if [ -f "backend/.env" ]; then
        echo "A .env fájl már létezik"
    else
        cp backend/.env.example backend/.env
    fi
    ```
    
    - Ellenőrzi, hogy létezik-e már a `.env` fájl a backend könyvtárban
    - Ha nem, létrehozza a `.env.example` fájl másolásával
2. **Szimbolikus link létrehozása**:
    
    bash
    
    ```
    if [ -f ".env" ]; then
        echo "A .env fájl már létezik"
    else
        ln -s backend/.env
    fi
    ```
    
    - Létrehoz egy szimbolikus linket a projekt gyökérkönyvtárába a backend `.env` fájlból
3. **Frontend függőségek telepítése**:
    
    bash
    
    ```
    if ! [ -d "frontend/node_modules" ]; then
        docker run --rm -v "$(pwd)/frontend:/app" -w /app node:18-alpine sh -c "npm install -g pnpm && pnpm install"
    fi
    ```
    
    - Ellenőrzi, hogy telepítve vannak-e a frontend függőségek
    - Ha nem, egy ideiglenes Docker konténerben telepíti a `pnpm` csomagkezelőt és a függőségeket
4. **Docker szolgáltatások indítása**:
    
    bash
    
    ```
    docker compose up -d
    ```
    
    - Elindítja a Docker Compose által definiált szolgáltatásokat (backend, frontend, adatbázis) detach módban
5. **Backend függőségek telepítése**:
    
    bash
    
    ```
    docker compose exec backend composer install
    ```
    
    - Telepíti a PHP függőségeket a backend konténerben
6. **Adatbázis migrációk futtatása**:
    
    bash
    
    ```
    docker compose exec backend php artisan migrate
    ```
    
    - Lefuttatja a Laravel migrációkat az adatbázisban
7. **Alkalmazás kulcs generálása**:
    
    bash
    
    ```
    if [ -z "${APP_KEY}" ]; then
        docker compose exec backend php artisan key:generate
    else
        echo "Az API kulcs már létezik"
    fi
    ```
    
    - Ellenőrzi, hogy van-e már alkalmazáskulcs
    - Ha nincs, generál egy újat a Laravel számára

## Hibaelhárítás

### Gyakori problémák és megoldások

1. **Inotify figyelő korlát**:
    
    bash
    
    ```
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
    sudo sysctl -p
    ```
    
    - Megoldja a "System limit for number of file watchers reached" hibát
    - Növeli a fájlfigyelők számának korlátját
2. **Engedélyek problémái**:
    - Ha a szkript nem futtatható:
        
        bash
        
        ```
        chmod +x start.sh
        ```
        
3. **Port ütközés**:
    - Ha a 80-as port már foglalt, módosítsd a `docker-compose.yml` fájlt
4. **Adatbázis kapcsolódási hiba**:
    - Ellenőrizd, hogy a `.env` fájlban helyesek-e az adatbázis kapcsolati adatok

## Alkalmazás leállítása és eltávolítása

1. **Leállítás**:
    
    bash
    
    ```
    docker compose stop
    ```
    
    - Megállítja a konténereket anélkül, hogy eltávolítaná őket
2. **Teljes eltávolítás**:
    
    bash
    
    ```
    docker compose down -v
    ```
    
    - Leállítja és eltávolítja a konténereket
    - Törli a társított Docker köteteket (az adatbázis adataival együtt)

## Fejlesztői környezet

- **Backend**: A backend kód a `backend` mappában található
- **Frontend**: A frontend kód a `frontend` mappában található
- **Környezeti változók**: Mindig a `backend/.env` fájlt módosítsd, a gyökérkönyvtárban lévő csak egy szimbolikus link

## Frissítés

1. Állítsd le a konténereket:
    
    bash
    
    ```
    docker compose down
    ```
    
2. Húzd le a legújabb változtatásokat:
    
    bash
    
    ```
    git pull
    ```
    
3. Indítsd újra a rendszert:
    
    bash
    
    ```
    ./start.sh
    ```
    

Ez a dokumentáció folyamatosan frissül a projekt változásaival együtt. Kérjük, jelentsd a problémákat vagy hiányosságokat a projekt issue trackerében.

# Frontend Dependencies Dokumentáció

## Áttekintés

Ez a dokumentáció a frontend alkalmazás `package.json` fájljában definiált csomagokat és azok célját mutatja be. A csomagok két fő csoportba vannak osztva:

1. **dependencies**: Az alkalmazás működéséhez szükséges csomagok
2. **devDependencies**: Fejlesztés és buildelés során használt csomagok

## Főbb Dependencies

### UI Komponenskönyvtárak

1. **@chakra-ui/react** (v3.13.0)
    - Modern, hozzáférhető UI komponensek gyűjteménye
    - Reszponzív design támogatással
    - Theme-alapú stíluskezelés
2. **@mui/material** (v6.3.1) & **@mui/icons-material** (v6.3.1)
    - Material Design alapú UI komponensek
    - Gazdag ikongyűjtemény
    - Speciális komponensek (pl. DataGrid, Alert)
3. **antd** (v4.24.16)
    - Átfogó UI komponens könyvtár
    - Különösen erős űrlap és táblázat komponensekkel

### Állapotkezelés

1. **mobx** (v6.13.5) & **mobx-react-lite** (v4.1.0)
    - Reaktív állapotkezelő könyvtár
    - Observer minta implementációja
    - Teljesítmény-optimalizált változat React-hez
2. **formik** (v2.4.6) & **yup** (v1.6.1)
    - Űrlapkezelés és validáció
    - Formik: űrlap állapotkezelés
    - Yup: Séma-alapú validáció

### Útválasztás & Navigáció

1. **react-router-dom** (v7.1.1)
    - Kliens oldali útválasztás
    - Dinamikus route-ok kezelése
    - Navigációs komponensek
2. **react-scroll** (v1.9.3)
    - Sima görgetés megvalósítása
    - Anchor link támogatás

### Nemzetköziesítés

1. **i18next** (v19.9.2) & **react-i18next** (v11.18.6)
    - Többnyelvű támogatás
    - Fordítási kulcsok kezelése
    - Dinamikus nyelvválasztás

### HTTP Kliens

1. **axios** (v1.7.9)
    - HTTP kliens könyvtár
    - Promise-alapú API
    - Request/response interceptors

### Animáció & UX

1. **framer-motion** (v11.18.2)
    - Fejlett animációs könyvtár
    - Fizikai alapú animációk
    - Komponens-alapú megközelítés
2. **react-awesome-reveal** (v3.8.1)
    - Scroll animációk
    - Egyszerű használatú komponensek
    - Pre-made animációs effektek

### Egyéb Fontos Csomagok

1. **styled-components** (v5.3.11)
    - CSS-in-JS megoldás
    - Dinamikus stílusozás
    - Theme támogatás
2. **notistack** (v3.0.2)
    - Értesítési rendszer
    - Stackelhető snackbar-ok
    - Testreszabható megjelenés

## Dev Dependencies

### Fordítás & Linting

1. **typescript** (v5.7.3)
    - Statikus típusellenőrzés
    - Modern JavaScript funkciók támogatása
2. **eslint** (^9.17.0) & plugins
    - Kódminőség ellenőrzése
    - React specifikus szabályok
    - Hooks szabályai
3. **@types/**csomagok
    - TypeScript típusdefiníciók
    - React, React DOM, React Router stb. típusai

### Build Rendszer

1. **vite** (^6.0.7)
    - Modern frontend build eszköz
    - Gyors fejlesztési szerver
    - Optimalizált termelési build
2. **@vitejs/plugin-react** (^4.3.4)
    - React támogatás Vite-hez
    - Fast Refresh funkció

### Babel Plugins

1. **@babel/plugin-proposal-decorators** (^7.25.9)
    - Decorator szintaxis támogatás
    - MobX @action, @observable használatához
2. **@babel/plugin-proposal-class-properties** (^7.18.6)
    - Osztály property-k támogatása
    - MobX használatához szükséges

## Script Parancsok

1. **dev**: Fejlesztési szerver indítása (vite)
2. **build**: TypeScript fordítás és termelési build készítése
3. **lint**: ESLint futtatása a kódminőség ellenőrzésére
4. **preview**: Termelési build helyi megtekintése

## Összefoglalás

Ez a csomagstruktúra egy modern, teljes értékű React alkalmazást támogat:

- **UI**: Chakra UI + MUI + AntD kombináció
- **Állapotkezelés**: MobX + Formik
- **Routing**: React Router
- **Fordítás**: i18next
- **Animáció**: Framer Motion + React Awesome Reveal
- **Build**: Vite + TypeScript

A csomagok kiválasztása a modern frontend fejlesztés legjobb gyakorlatait tükrözi, optimalizálva a fejlesztői élményt és az alkalmazás teljesítményét.

# CheckItOut - Háttérfolyamatok Dokumentáció

## Service Worker Implementáció

A CheckItOut alkalmazás Progresszív Webalkalmazás (PWA) funkciókkal rendelkezik, amelyeket a `service-worker.ts` fájl implementál.

### Főbb funkciók:

1. **Precaching**:
    - Az összes buildelt asset automatikusan gyorsítótárazásra kerül a `self.__WB_MANIFEST` segítségével
    - Ez biztosítja, hogy az alkalmazás gyorsan betöltődjön és offline módban is működőképes legyen
2. **App Shell Architektúra**:
    - Minden navigációs kérés az `index.html`ből kerül kiszolgálásra
    - Kivételek: nem-navigációs kérések, `/_-val` kezdődő URL-ek, és fájlkiterjesztést tartalmazó URL-ek
3. **Runtime Caching**:
    - PNG képek gyorsítótárazása `StaleWhileRevalidate` stratégiával
    - Maximum 50 bejegyzés tárolható, LRU (Least Recently Used) elv alapján történő törléssel
4. **Verziófrissítés**:
    - Lehetőség van a `SKIP_WAITING` üzenet küldésére azonnali frissítéshez
    - Alapértelmezetten az új verziók csak a lap bezárása után kerülnek aktiválásra

## Service Worker Regisztráció

A `serviceWorkerRegistration.ts` fájl kezeli a service worker regisztrációját és frissítéseit.

### Fontos jellemzők:

1. **Környezetfüggő viselkedés**:
    - Csak production build esetén aktiválódik
    - Localhoston extra diagnosztikai üzenetek jelennek meg
2. **Regisztrációs folyamat**:
    - Ellenőrzi, hogy a PUBLIC_URL megegyezik a jelenlegi originnal
    - Localhoston érvényesség-ellenőrzést végez a service worker fájlon
3. **Frissítéskezelés**:
    - Értesíti a fejlesztőt, ha új tartalom elérhető
    - Callback-eket biztosít a frissítési események kezelésére (`onUpdate`, `onSuccess`)
4. **Offline támogatás**:
    - Hibás service worker esetén automatikusan újrapróbálkozik
    - Internetkapcsolat hiányában is működik

## Fordítási Rendszer (i18n)

A `translation.ts` fájl konfigurálja a nemzetköziesítési (i18n) rendszert.

### Főbb komponensek:

1. **Integrációk**:
    - Nyelvdetektálás (`LanguageDetector`)
    - React kompatibilitás (`initReactI18next`)
    - XHR backend a fordítások betöltéséhez
2. **Alapkonfiguráció**:
    - Alapértelmezett nyelv: angol (`en`)
    - Tartalék nyelv: angol
    - Debug mód letiltva éles környezetben
3. **Fordítási erőforrások**:
    - Angol és magyar nyelv támogatása
    - JSON fájlokban tárolt fordítások (`translationEn`, `translationHu`)
    - "translations" névtér használata
4. **Speciális beállítások**:
    - Kulcs-elválasztó letiltva (`keySeparator: false`)
    - HTML interpoláció engedélyezve (`escapeValue: false`)

Ez a háttérrendszer biztosítja az alkalmazás megbízható offline működését, a gyors betöltési időket, valamint a többnyelvű támogatást, jelentősen javítva ezzel a felhasználói élményt.

# CheckItOut - Alkalmazás Architektúra Dokumentáció

## Főbb React Komponensek

### 1. Alkalmazás Belépési Pont (`main.tsx`)

A React alkalmazás inicializálását és konfigurálását végzi:

- **Komponensek**:
    - `ChakraProvider`: Chakra UI stílusrendszer integrációja
    - `BrowserRouter`: Útvonalvezérlés engedélyezése
    - `I18nextProvider`: Nemzetköziesítés támogatása
    - `AppWrapper`: Fő alkalmazáskomponens burkolója
- **Fontos Funkciók**:
    - Service Worker regisztráció frissítési figyelőkkel
    - Chakra UI konfiguráció definiálása
    - Navigáció átadása az App osztálynak
    - Automatikus oldalújratöltés új service worker verzió esetén

### 2. Fő Alkalmazás Komponens (`App.tsx`)

Az alkalmazás magja, amely kezeli az útvonalakat és állapotokat:

- **Útvonalak (Routes)**:
    - Publikus útvonalak: `/`, `/login`, `/register`, `/reset-password`
    - Védett útvonalak: `/app/home`, `/app/profile`, `/app/newTask`
    - Admin útvonal: `/app/admin/users`
    - Dokumentáció: `/how-to-use`, `/app/how-to-use`
    - 404 oldal: minden egyéb útvonal
- **Kulcsfontosságú Jellemzők**:
    - MobX state management használata observables és computed értékekkel
    - Dinamikus komponensbetöltés ViewComponent interfész segítségével
    - Bejelentkezési állapot ellenőrzése (`isLoggedIn`)
    - Reszponzív layout Flex és Box komponensekkel
    - Fejléc és lábléc minden oldalon

### 3. Globális Stílusok (`App.css` és `styles.ts`)

Az alkalmazás vizuális megjelenését szabályozzák:

### `App.css`:

- Alapértelmezett body stílusok (margó nélküli design)
- Sötét mód támogatás (`prefers-color-scheme`)
- Globális link stílusok (#f5f5dc színű linkek)

### `styles.ts` (Global Styles):

- **Betűtípusok**:
    - Egyedi "Motiva Sans" betűcsalád (Light és Bold változat)
    - Reszponzív betűméretű címek (h1-h6)
- **Form elemek**:
    - Input mezők animált hover és focus állapottal
    - Átlátszó háttérű szövegmezők
- **Layout**:
    - Oldalszélesség: 100vw
    - Alap háttérszín: fehér (#fff)
    - Drawer komponens stílusai (antd)
- **Színpaletta**:
    - Fő színek: #18216d, #2E186A
    - Link hover állapot: #18216d

## Komponens Hierarchia

```
Root
├── ChakraProvider (stílusrendszer)
│   ├── BrowserRouter (útvonalvezérlés)
│   │   ├── I18nextProvider (fordítások)
│   │   │   └── AppWrapper
│   │   │       └── App
│   │   │           ├── Header
│   │   │           ├── Main Content (Routes)
│   │   │           │   ├── Home
│   │   │           │   ├── Login
│   │   │           │   ├── Register
│   │   │           │   └── ...etc
│   │   │           └── Footer
│   │   └── Service Worker Regisztráció
└── Globális Stílusok (Styles komponens)

```

## Fontos Architekturális Döntések

1. **State Management**:
    - MobX használata osztályalapú komponensekhez
    - Globális állapot kezelése `GlobalEntities` segítségével
2. **Routing**:
    - Védett útvonalak kezelése `isLoggedIn` állapot alapján
    - Dinamikus komponensbetöltés ViewComponent mintával
3. **Stílusrendszer**:
    - Chakra UI és styled-components kombinációja
    - Egyedi betűtípusok használata design konzisztencia érdekében
4. **Performance**:
    - Lazy loading Suspense segítségével
    - Service Worker precaching gyors betöltési idő érdekében

Ez az architektúra biztosítja az alkalmazás skálázhatóságát, karbantarthatóságát és reszponzív viselkedését minden eszközön.

# GlobalEntities - Állapotkezelő Dokumentáció

## Áttekintés

A `GlobalEntities` egy MobX-alapú állapotkezelő osztály, amely centralizáltan kezeli az alkalmazás globális állapotát és biztosítja az API kommunikációt. Ez az osztály szolgál az alkalmazás adatmodelljének és üzleti logikájának központi pontjaként.

## Főbb Állapotok (Observables)

1. **Felhasználói adatok**:
    
    ```tsx
    user: {
      id?: number;
      name?: string;
      email?: string;
      role?: string;
      created_at?: string;
      updated_at?: string;
    }
    
    ```
    
    - Az aktuálisan bejelentkezett felhasználó adatait tárolja
    - `role` mező alapján kezeli az admin jogosultságokat
2. **Feladatok kezelése**:
    
    ```tsx
    _tasks: Task[];       // Aktív feladatok
    doneTasks: Task[];    // Befejezett feladatok
    firstTask?: Task;     // Első prioritású feladat
    
    ```
    
    - Hierarchikus feladatkezelés prioritás alapján
3. **Egyéb entitások**:
    
    ```tsx
    categories: Category[]; // Feladatkategóriák
    users: User[];         // Összes felhasználó (adminoknak)
    userToken: string;     // JWT hitelesítési token
    
    ```
    

## Fontos Műveletek (Actions)

### 1. Felhasználókezelés

- **Bejelentkezés (`login`)**:
    
    ```tsx
    async login(email: string, password: string)
    
    ```
    
    - JWT token lekérése és localStorage-ba mentése
    - Felhasználói adatok betöltése
    - Kapcsolódó adatok (feladatok, kategóriák) automatikus frissítése
- **Kijelentkezés (`logout`)**:
    
    ```tsx
    logout()
    
    ```
    
    - Minden felhasználói adat törlése
    - Nyelvi beállítások megőrzése
- **Jelszó visszaállítás**:
    
    ```tsx
    sendPasswordResetEmail(email: string)
    resetPassword(email, token, newPassword)
    
    ```
    

### 2. Feladatkezelés

- **Feladatok betöltése**:
    
    ```tsx
    loadTasks()     // Aktív feladatok
    loadDoneTasks() // Befejezett feladatok
    
    ```
    
    - Automatikusan szűri a feladatokat státusz alapján
    - Beállítja az első prioritású feladatot
- **Feladat műveletek**:
    
    ```tsx
    createTask(data: Object)
    updateTask(data: Task)
    
    ```
    

### 3. Admin Funkciók

- **Felhasználókezelés**:
    
    ```tsx
    fetchUsers()       // Összes felhasználó lekérése
    deleteUser(id)     // Felhasználó törlése
    updateUserById()   // Felhasználó adatainak módosítása
    
    ```
    

### 4. Kategóriakezelés

- **Kategória műveletek**:
    
    ```tsx
    loadCategories()   // Kategóriák betöltése
    createCategory()   // Új kategória létrehozása
    
    ```
    
    - Automatikusan kezeli a nyelvi beállításokat

## Számított Értékek (Computed)

- **Feladatok szűrése**:
    
    ```tsx
    get tasks() {
      return this._tasks;
    }
    
    ```
    
    - Observable változók alapján automatikusan frissülő érték

## Kezdő Inicializálás

Az osztály példányosításkor automatikusan:

1. Ellenőrzi a localStorage-ban tárolt JWT tokent
2. Ha érvényes token van, betölti a felhasználó adatait és kapcsolódó entitásokat
3. Beállítja a mentett nyelvi preferenciát

## Hibakezelés

- Minden API hívás `try-catch` blokkokban van becsomagolva
- Konzolra naplózza a hibákat (`console.error`)
- A hívó komponenseknek továbbítja a hibákat kezelésre

## Integrációk

1. **API Kommunikáció**:
    - A `GlobalApiHandlerInstance` segítségével végzi a HTTP kéréseket
    - Automatikusan hozzáfűzi a JWT tokent a fejlécekhez
2. **Nemzetköziesítés**:
    - Az `i18n` példányt használja a nyelvi beállításokhoz
    - Kategóriák létrehozásánál figyelembe veszi az aktuális nyelvet
3. **Navigáció**:
    - A `checkAndRedirectNotRightUser` biztosítja a védett útvonalakhoz való hozzáférést

Ez az állapotkezelő osztály biztosítja az alkalmazás adatainak konzisztenciáját és centralizált kezelését, miközben lehetővé teszi a reaktív frissítéseket a MobX segítségével.

# User Modell Dokumentáció

## Áttekintés

A `User` interfész az alkalmazás felhasználói entitásának típusdefinícióját tartalmazza TypeScript-ben. Ez a modell szolgál a felhasználói adatok típusbiztos kezeléséhez az egész alkalmazásban.

## Mezők és Tulajdonságok

1. **`id: number`**
    - A felhasználó egyedi azonosítója
    - Kötelező mező minden felhasználói entitáshoz
    - Az adatbázisban automatikusan generált elsődleges kulcs
2. **`name: string`**
    - A felhasználó teljes neve
    - Használati példa: "Kovács János"
    - Megjelenik a felhasználói profilban és admin felületen
3. **`email: string`**
    - A felhasználó email címe
    - Egyedi azonosítóként szolgál a bejelentkezéshez
    - Validációt igényel (email formátum)
4. **`role: "user" | "admin"`**
    - A felhasználó jogosultsági szintje
    - Lehetséges értékek:
        - `"user"`: Alap felhasználói jogosultságok
        - `"admin"`: Rendszergazdai jogosultságok
    - Meghatározza:
        - Elérhető útvonalakat
        - Megjelenített komponenseket
        - Műveletek elérhetőségét

## Használati Példák

1. **Típus használata változóknál**:
    
    ```tsx
    const currentUser: User = {
      id: 1,
      name: "Teszt Elek",
      email: "teszt@example.com",
      role: "user"
    };
    
    ```
    
2. **Komponens props-ként**:
    
    ```tsx
    interface UserProfileProps {
      user: User;
    }
    
    const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
      return <div>{user.name}</div>;
    };
    
    ```
    
3. **API válasz kezelése**:
    
    ```tsx
    const response = await api.get<User>('/user/1');
    const userData: User = response.data;
    
    ```
    

## Kapcsolódó Funkcionalitás

1. **Hitelesítés**:
    - A `GlobalEntities` store-ban tárolt `user` objektum ennek az interfésznek megfelelően van típusosítva
2. **Jogosultságkezelés**:
    
    ```tsx
    if (user.role === "admin") {
      // Admin-specifikus műveletek
    }
    
    ```
    
3. **Adatbázis Integráció**:
    - A backend API ezen struktúra szerint várt adatokat ad vissza
    - A frontend és backend közötti adatcsere során konzisztens adatstruktúrát biztosít

Ez a típusdefiníció kulcsfontosságú szerepet játszik az alkalmazás típusbiztosságának megőrzésében, és dokumentációs szerepet is betölt a fejlesztők számára a felhasználói entitás szerkezetének megértésében.

# 404 Oldal Dokumentáció

## Áttekintés

A `404.tsx` komponens egy egyedi "Nem található" (404) hibaoldalt valósít meg, amely akkor jelenik meg, amikor a felhasználó olyan útvonalra navigál, amely nem létezik az alkalmazásban.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Material UI komponensek**: Professzionális megjelenés érdekében

### 2. Layout és Megjelenés

- **Középre igazított tartalom**: Vertikális stack (`Stack`) komponenssel
- **Reszponzív design**: `Container` komponens teljes szélességű (maxWidth: false)
- **Minimális magasság**: 45vh (viewport height) biztosítja az oldal alján lévő helyet

### 3. Tartalmi Elemek

1. **404 Fejléc**:
    - Nagy, félkövér (`variant="h1"`) szöveg
    - Elsődleges színséma (`color="primary"`)
2. **Hibaüzenet cím**:
    - Közepes méretű fejléc (`variant="h5"`)
    - Szekunder szövegszín (`color="textSecondary"`)
    - Középre igazított (`textAlign="center"`)
3. **Leíró szöveg**:
    - Normál testreszöveg (`variant="body1"`)
    - Szekunder szövegszín
    - Középre igazítás
4. **Vissza gomb**:
    - Kitöltött (`variant="contained"`) elsődleges gomb
    - Nagy méret (`size="large"`)
    - Kezdőoldalra navigál (`onClick` handler)

### 4. Funkcionalitás

- **Navigáció**: A gombra kattintva a felhasználó visszakerül a kezdőoldalra (`/`)
- **Fordítások**: Minden szöveg a `react-i18next` segítségével fordítható:
    - `404 Title`: A hibaoldal címe
    - `404 Description`: A hiba részletes leírása
    - `404 Button`: A visszanavigáló gomb szövege

### 5. Technikai Megvalósítás

- **MobX integráció**: `makeObservable` hívással
- **TypeScript támogatás**: Erős típusosság a `NavigateFunction` használatával
- **Stíluskezelés**: MUI `sx` prop inline stílusokkal

## Használati Példa

```tsx
// Útvonalak definiálásakor:
<Route path="*" element={<_404.View />} />

```

## Design Megfontolások

1. **Felhasználóbarát hibaüzenet**: Egyértelmű kommunikáció a problémáról
2. **Egyszerű navigáció**: Egyetlen gomb a főoldalra visszajutáshoz
3. **Konzisztens megjelenés**: Az alkalmazás design rendszerével összhangban
4. **Kisebb képernyők**: Automatikusan alkalmazkodik mobileszközökhöz

Ez a komponens kulcsfontosságú a felhasználói élmény javításában, mert segít a felhasználóknak könnyedén visszakerülni a működő oldalakra, amikor hibás URL-t írnak be vagy elavult linkre kattintanak.

# Dokumentáció Oldal Dokumentáció

## Áttekintés

A `Documentation.tsx` komponens egy beágyazott dokumentáció megjelenítésére szolgáló oldalt valósít meg, amely külső forrásból (pl. Google Docs, Notion stb.) tölti be a tartalmat iframe segítségével.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Minimális implementáció**: Csak egy iframe elemből áll

### 2. Technikai Megvalósítás

1. **Iframe komponens**:
    - Teljes szélességű (`width: "100%"`)
    - Magas (`height: "120vh"`) - 120% a viewport magasságának
    - Keret nélküli (`border: "none"`)
    - Teljes képernyős megjelenítés támogatása (`allowFullScreen`)
2. **Fordítási támogatás**:
    - A dokumentáció linkje fordított szövegként jelenik meg (`t("Documentation Link")`)
    - A `useTranslation` hook biztosítja a lokalizációt
3. **Navigáció**:
    - A konstruktorban kapott `NavigateFunction` segítségével lehetőség van navigálásra

### 3. Konfiguráció

- **Dokumentáció forrása**: A fordítási fájlokban (`translation.json`) definiált "Documentation Link" érték
- **Példa konfiguráció**:
    
    ```json
    {
      "Documentation Link": "<https://docs.google.com/document/d/12345>"
    }
    
    ```
    

## Használati Előnyök

1. **Külső tartalom integrációja**: Könnyen frissíthető dokumentáció külső platformon
2. **Reszponzív megjelenés**: Automatikusan alkalmazkodik a képernyő méretéhez
3. **Könnyű karbantarthatóság**: A dokumentáció URL-je fordítási fájlon keresztül módosítható

## Biztonsági Megfontolások

1. **Content Security Policy (CSP)**:
    - Az alkalmazás CSP beállításainak engedélyeznie kell a dokumentáció domain-jét
    - Példa CSP fejléc:
        
        ```
        Content-Security-Policy: frame-src <https://docs.google.com>
        
        ```
        
2. **XSS védelem**:
    - Az iframe `sandbox` attribútummal további korlátozásokat lehet beállítani
    - Javasolt a minimális jogosultságok megadása:
        
        ```html
        <iframe sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
        
        ```
        

## Fejlesztői Megjegyzések

1. **Alternatív megoldások**:
    - Ha a dokumentáció gyakran változik, érdemes lehet API-n keresztül betölteni
    - SSG (Static Site Generation) használata előre generált tartalomhoz
2. **Teljesítményoptimalizálás**:
    - Lazy loading implementálása:
        
        ```html
        <iframe loading="lazy" ... />
        
        ```
        
    - Placeholder megjelenítése a betöltés alatt

Ez a komponens ideális megoldás olyan esetekben, amikor a dokumentációt külön platformon karbantartják, és csak be kell ágyazni az alkalmazásba. A lokalizációs támogatás lehetővé teszi, hogy nyelvspecifikus dokumentációkat jelenítsen meg.

# Kezdőoldal (Home) Dokumentáció

## Áttekintés

A `Home.tsx` komponens az alkalmazás fő irányítópultját valósítja meg, amely három fő részből áll:

1. **Következő feladat** - legfontosabb prioritású feladat
2. **Mai feladatok** - aznap elvégzendő aktív feladatok
3. **Befejezett feladatok** - már elvégzett feladatok

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Reszponzív design**: Külön nézet asztali és mobil eszközökre

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities`ből származtatott adatok
    - `GlobalEntities.tasks`: Aktív feladatok listája
    - `GlobalEntities.doneTasks`: Befejezett feladatok
    - `GlobalEntities.firstTask`: Legmagasabb prioritású feladat
- **Lokális állapot**: `loading` állapot a betöltési animációhoz

### 3. Felhasználói Felület

### Közös elemek:

- **Betöltési animáció**: MUI `Backdrop` és `CircularProgress`
- **Üzenetek üres listákhoz**: `EmptyMessage` komponens
- **Szekciók**: `Section` komponens címmel

### Asztali nézet (`Hidden lgDown`):

- **3 oszlopos elrendezés**: Flexbox alapú tervezés
- **Elválasztó vonalak**: Szürke szegélyek a szekciók között
- **Teljes magasságú kiterjesztés**

### Mobil nézet (`Hidden lgUp`):

- **Egyszerűsített elrendezés**: Függőleges stack (`VStack`)
- **Elválasztók**: Ant Design `Divider` komponens
- **Reszponzív padding**: Kisebb képernyőkön kisebb térköz

### 4. Funkcionalitás

1. **Automatikus átirányítás**: Nem bejelentkezett felhasználókat a `checkAndRedirectNotRightUser` átirányítja
2. **Dinamikus oszlopszám**: `useBreakpointValue` hook alapján változik:
    - Alap: 1 oszlop
    - Közepes: 2 oszlop
    - Nagy: 2 oszlop
    - Extra nagy: 3 oszlop
3. **Fordítási támogatás**: Minden szöveg a `react-i18next` segítségével fordítható

### 5. Kártya komponensek

- **`BaseCard`**: Általános feladatkártya komponens
- **Dinamikus generálás**: A `createCard` metódus hozza létre a kártyákat

## Fontos Metódusok

1. **`createCard`**:
    
    ```tsx
    @action private createCard = (task: Task) => {
      const card = new BaseCard(task);
      return <card.View />;
    };
    
    ```
    
    - Létrehozza a feladatkártya komponenst
2. **`card` computed property**:
    
    ```tsx
    @computed private get card() {
      return GlobalEntities.firstTask
        ? this.createCard(GlobalEntities.firstTask)
        : null;
    }
    
    ```
    
    - Visszaadja a legfontosabb feladat kártyáját

## Fordítási Kulcsok

- `Next Task Title`: Következő feladat szekció címe
- `Next Task Message`: Üres lista üzenete
- `Today Task Title`: Mai feladatok szekció címe
- `Today Task Message`: Üres lista üzenete
- `Done Task Title`: Befejezett feladatok szekció címe
- `Done Task Message`: Üres lista üzenete

## Technológiai Megoldások

1. **Több komponenskönyvtár integrációja**:
    - Chakra UI (fő layout)
    - Material UI (betöltési animáció)
    - Ant Design (elválasztók)
2. **Reszponzív tervezés**:
    - `useBreakpointValue` hook a képernyőméret érzékeléséhez
    - Külön komponensek asztali és mobil nézethez
3. **Optimalizálás**:
    - MobX `toJS` csak a szükséges adatok konvertálására
    - Memoizált komponensek a teljesítmény érdekében

Ez az oldal szolgálja a felhasználók fő munkaterületét, ahol áttekinthetik aktuális feladataikat és a haladásukat. A reszponzív design biztosítja, hogy minden eszközön optimális felhasználói élményt nyújtson.

# Landing Oldal Dokumentáció

## Áttekintés

A `Landing.tsx` komponens az alkalmazás nyitóoldalát (landing page) valósítja meg, amely az első benyomást kelti a látogatókban és bemutatja az alkalmazás főbb funkcióit, előnyeit.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Stateless design**: Nincs belső állapotkezelés
- **Moduláris felépítés**: Tartalomblokkokból összeállított oldal

### 2. Főbb Szerkezeti Elemek

1. **ScrollToTop**: Oldal tetejére görbítés a navigáció után
2. **ContentBlock**: Témakörönkénti tartalmi blokkok (6 db)
3. **MiddleBlock**: Kiemelt középső tartalmi blokk
4. **ContactForm**: Kapcsolatfelvételi űrlap

### 3. Tartalmi Blokkok

1. **Bevezető (Intro)**:
    - Cím: `IntroContent.title`
    - Szöveg: `IntroContent.text`
    - Gomb: `IntroContent.button`
    - Ikon: `developer.svg`
2. **Kezdés (Get Started)**:
    - Kiemelt középső blokk
    - Cím: `MiddleBlockContent.title`
    - Szöveg: `MiddleBlockContent.text`
    - Gomb: `MiddleBlockContent.button`
3. **Rólunk (About)**:
    - Cím: `AboutContent.title`
    - Szöveg: `AboutContent.text`
    - Alszekciók: `AboutContent.section`
    - Ikon: `graphs.svg`
4. **Jellemzők (Features)**:
    - Cím: `MissionContent.title`
    - Szöveg: `MissionContent.text`
    - Ikon: `product-launch.svg`
5. **Termék (Product)**:
    - Cím: `ProductContent.title`
    - Szöveg: `ProductContent.text`
    - Ikon: `waving.svg`
6. **Kapcsolat (Contact)**:
    - Cím: `ContactContent.title`
    - Szöveg: `ContactContent.text`
    - Űrlap komponens

### 4. Technikai Megvalósítás

1. **Tartalomkezelés**:
    - Külső JSON fájlokból betöltött tartalmak:
        - `IntroContent.json`
        - `MiddleBlockContent.json`
        - `AboutContent.json`
        - `MissionContent.json`
        - `ProductContent.json`
        - `ContactContent.json`
2. **Komponensek**:
    - `Container`: Központozó konténer komponens
    - `Header`: Fejléc komponens (importálva, de nem használva)
    - `Footer`: Lábléc komponens (importálva, de nem használva)
    - `Styles`: Globális stílusok
3. **Design Rendszer**:
    - Chakra UI komponensek alapvető felépítéshez
    - React Ikonok (Fa*) a vizuális elemekhez

### 5. Reszponzív Tulajdonságok

- **Tartalom elrendezése**: Váltakozó irányú blokkok (bal/jobb)
- **Képernyőméret érzékeny**: `useBreakpointValue` hook
- **Mobilbarát design**: Minden tartalmi blokk reszponzív

## Fejlesztői Megjegyzések

1. **Tartalomfrissítés**:
    - A tartalmak módosítása csak a JSON fájlokban szükséges
    - Nincs szükség kódmódosításra tartalmi változtatásokhoz
2. **Új blokkok hozzáadása**:
    - Egyszerűen másolható a meglévő blokk struktúra
    - Új JSON tartalomfájl létrehozása szükséges
3. **Optimalizálási lehetőségek**:
    - Lazy loading a ContentBlock komponenseknek
    - Képoptimalizálás az ikonokhoz
4. **Hiányzó elemek**:
    - A Header és Footer komponensek importálva vannak, de nincsenek használatban
    - A Styles komponens importálva van, de nincs explicit használatban

Ez a landing page az alkalmazás bemutatását szolgálja, hangsúlyozva a főbb funkciókat és előnyöket. A moduláris felépítés lehetővé teszi a tartalom egyszerű frissítését és bővítését anélkül, hogy magát a komponenst módosítani kellene.

# Bejelentkezési Oldal (Login) Dokumentáció

## Áttekintés

A `Login.tsx` komponens az alkalmazás bejelentkezési felületét valósítja meg, lehetővé téve a felhasználók számára, hogy hitelesítést végezzenek. Az oldal tartalmazza a bejelentkezési űrlapot, valamint egy "Elfelejtett jelszó" funkciót.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Kettős űrlap rendszer**:
    - Bejelentkezési űrlap
    - Elfelejtett jelszó űrlap (modális ablakban)

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities` segítségével:
    - `GlobalEntities.login()`: Bejelentkezési funkció
    - `GlobalEntities.sendPasswordResetEmail()`: Jelszó-visszaállító email küldése
    - `GlobalEntities.resetPassword()`: Jelszó visszaállítása
- **Lokális állapotok**:
    - `snackbarOpen`: Értesítési üzenet megjelenítése/elrejtése
    - `snackbarMessage`: Értesítés szövege
    - `snackbarSeverity`: Értesítés típusa ("success" vagy "error")
    - `forgotPasswordModalOpen`: Elfelejtett jelszó modális ablak állapota
    - `forgotPasswordEmail`: Elfelejtett jelszóhoz tartozó email cím

### 3. Felhasználói Felület

### Bejelentkezési űrlap:

- **Email mező**: Kötelező, email formátum ellenőrzéssel
- **Jelszó mező**: Kötelező, minimum 6 karakter hosszúságú
- **Linkek**:
    - Regisztrációra vezető link
    - Elfelejtett jelszó modális ablak megnyitása
- **Bejelentkezés gomb**

### Elfelejtett jelszó modális ablak:

- **Email mező**: Kötelező, email formátum ellenőrzéssel
- **Művelet gombok**:
    - Mégse
    - Jelszó-visszaállító link küldése

### Értesítések:

- **Sikeres bejelentkezés**: Automatikus átirányítás a főoldalra
- **Hibák kezelése**: Többféle hibaüzenet különböző hibákhoz

### 4. Validáció

- **Bejelentkezési űrlap validáció**:
    
    ```
    Yup.object({
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
      password: Yup.string()
        .min(6, t("Validation Password Length"))
        .required(t("Validation Password Required")),
    })
    
    ```
    
- **Elfelejtett jelszó űrlap validáció**:
    
    ```
    Yup.object({
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
    })
    
    ```
    

### 5. Hibakezelés

### Bejelentkezési hibák:

- "The selected email is invalid" → "Login Error 2"
- 401 Unauthorized → "Login Error 3"
- 422 Validation Error → "Validation Error"
- Egyéb hibák → "Login Error"

### Jelszó-visszaállítási hibák:

- "email not found" → "Email Not Found"
- "password reset" → "Password Reset Throttled"
- Egyéb hibák → "Password Reset Error"

### Jelszó-visszaállítás token hibák:

- "invalid token" → "Invalid Reset Token"
- "expired" → "Reset Token Expired"
- Egyéb hibák → "Password Reset Send Error"

## Fontos Metódusok

1. **`handleSubmit`**:
    
    ```tsx
    @action private async handleSubmit(values: typeof this.initialValues)
    
    ```
    
    - Kezeli a bejelentkezési folyamatot
    - Sikeres bejelentkezés esetén átirányít a főoldalra
    - Hibák esetén megfelelő üzenetet jelenít meg
2. **`handleForgotPasswordSubmit`**:
    
    ```tsx
    @action private handleForgotPasswordSubmit = async (email: string)
    
    ```
    
    - Kezeli az elfelejtett jelszó folyamatát
    - Email küldése a jelszó visszaállításához
3. **`handlePasswordReset`**:
    
    ```tsx
    @action private handlePasswordReset = async (
      email: string,
      token: string,
      newPassword: string,
    )
    
    ```
    
    - Kezeli a jelszó visszaállítási folyamatot
    - Token és új jelszó alapján végzi a műveletet
4. **`toggleForgotPasswordModal`**:
    
    ```tsx
    @action private toggleForgotPasswordModal = (open: boolean)
    
    ```
    
    - Az elfelejtett jelszó modális ablak megnyitása/bezárása

## Fordítási Kulcsok

- `Login Title`: Bejelentkezési oldal címe
- `Login Email`: Email mező címkéje
- `Login Password`: Jelszó mező címkéje
- `Login Submit`: Bejelentkezés gomb szövege
- `Login No Account`: Regisztrációra hivatkozó szöveg
- `Forgotten Title`: Elfelejtett jelszó hivatkozás szövege
- `Forgot Password Title`: Elfelejtett jelszó modális ablak címe
- `Forgot Password Instructions`: Elfelejtett jelszó utasításai
- `Send Reset Link`: Jelszó-visszaállító link küldése gomb
- `Cancel`: Mégse gomb
- `Validation Email Format`: Email formátum validációs hiba
- `Validation Email Required`: Kötelező email mező hiba
- `Validation Password Length`: Jelszó hossz validációs hiba
- `Validation Password Required`: Kötelező jelszó mező hiba

## Technológiai Megoldások

1. **Form kezelés**:
    - Formik könyvtár űrlapkezeléshez
    - Yup validációs séma
2. **UI komponensek**:
    - Material UI komponensek (TextField, Button, Dialog stb.)
    - Chakra UI VStack komponens a linkek elrendezéséhez
3. **Állapotkezelés**:
    - MobX observables és actions
    - Lokális állapotok a felhasználói felület vezérléséhez
4. **Navigáció**:
    - React Router NavigateFunction
5. **Fordítás**:
    - react-i18next könyvtár a többnyelvű támogatáshoz
6. **Értesítések**:
    - Material UI Snackbar és Alert komponensek

## Biztonsági Megfontolások

- Jelszavak soha nem kerülnek lokális tárolásra
- Minden hitelesítés szerver oldalon történik
- Jelszó-visszaállítás biztonságos token alapú megoldással
- Érzékeny adatok titkosított csatornán történő továbbítása

Ez a bejelentkezési oldal biztosítja a felhasználók biztonságos azonosítását, miközben intuitív felhasználói élményt nyújt a bejelentkezési folyamat során. A reszponzív design garantálja, hogy minden eszközön megfelelően jelenjen meg.

# Jelszó Visszaállítási Oldal (PasswordReset) Dokumentáció

## Áttekintés

A `PasswordReset.tsx` komponens lehetővé teszi a felhasználók számára, hogy visszaállítsák elfelejtett jelszavukat egy biztonságos token alapú folyamaton keresztül. Az oldal URL paraméterekből kapja meg a visszaállításhoz szükséges email címet és tokent.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Egyszerűsített űrlap design**: Minden szükséges mező egy oldalon

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities` segítségével:
    - `GlobalEntities.resetPassword()`: Jelszó visszaállítási funkció
- **Lokális állapotok**:
    - `snackbarOpen`: Értesítési üzenet megjelenítése/elrejtése
    - `snackbarMessage`: Értesítés szövege
    - `snackbarSeverity`: Értesítés típusa ("success" vagy "error")
- **URL paraméterek**:
    - `token`: Jelszó-visszaállító token (kötelező)
    - `email`: Felhasználó email címe (opcionális)

### 3. Felhasználói Felület

### Jelszó-visszaállítási űrlap:

- **Email mező**:
    - Automatikusan kitöltődik URL paraméterből
    - Letiltva, ha URL-ből érkezett
    - Kötelező, email formátum ellenőrzéssel
- **Token mező**:
    - Rejtett mezőként kezelt
    - Automatikusan kitöltődik URL paraméterből
- **Új jelszó mező**:
    - Kötelező, minimum 8 karakter hosszúságú
- **Jelszó megerősítése mező**:
    - Kötelező, egyeznie kell az új jelszóval
- **Visszaállítás gomb**

### Értesítések:

- **Sikeres visszaállítás**: Automatikus átirányítás a bejelentkezési oldalra
- **Hibák kezelése**: Többféle hibaüzenet különböző hibákhoz

### 4. Validáció

```
Yup.object({
  email: Yup.string()
    .email(t("Validation Email Format"))
    .required(t("Validation Email Required")),
  password: Yup.string()
    .min(8, t("Validation Password Length"))
    .required(t("Validation Password Required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], t("Validation Password Match"))
    .required(t("Validation Confirm Password Required")),
})

```

### 5. Hibakezelés

- "invalid token" → "Invalid Reset Token"
- "expired" → "Reset Token Expired"
- 422 Validation Error → "Validation Error"
- Egyéb hibák → "Password Reset Error"

## Fontos Metódusok

1. **`handleSubmit`**:
    
    ```tsx
    @action private async handleSubmit(values: typeof this.initialValues)
    
    ```
    
    - Kezeli a jelszó visszaállítási folyamatot
    - Sikeres művelet esetén átirányít a bejelentkezési oldalra
    - Hibák esetén megfelelő üzenetet jelenít meg
2. **`handleCloseSnackbar`**:
    
    ```tsx
    @action private handleCloseSnackbar = () => {
      this.snackbarOpen = false;
    };
    
    ```
    
    - Bezárja az értesítési üzenetet

## Fordítási Kulcsok

- `Password Reset Title`: Oldal címe
- `Email`: Email mező címkéje
- `New Password`: Új jelszó mező címkéje
- `Confirm New Password`: Jelszó megerősítése mező címkéje
- `Reset Password`: Visszaállítás gomb szövege
- `Validation Email Format`: Email formátum validációs hiba
- `Validation Email Required`: Kötelező email mező hiba
- `Validation Password Length`: Jelszó hossz validációs hiba
- `Validation Password Required`: Kötelező jelszó mező hiba
- `Validation Password Match`: Jelszavak egyezésének validációs hibája
- `Validation Confirm Password Required`: Kötelező jelszó megerősítés hiba
- `Password Reset Success`: Sikeres visszaállítás üzenete
- `Invalid Reset Token`: Érvénytelen token hiba
- `Reset Token Expired`: Lejárt token hiba
- `Validation Error`: Validációs hiba

## Technológiai Megoldások

1. **Form kezelés**:
    - Formik könyvtár űrlapkezeléshez
    - Yup validációs séma
2. **UI komponensek**:
    - Material UI komponensek (TextField, Button, Snackbar stb.)
    - Reaktív elrendezés Stack komponenssel
3. **Állapotkezelés**:
    - MobX observables és actions
    - URL paraméterek kezelése a react-router-dom segítségével
4. **Navigáció**:
    - React Router NavigateFunction és useNavigate hook
5. **Fordítás**:
    - react-i18next könyvtár a többnyelvű támogatáshoz
6. **Értesítések**:
    - Material UI Snackbar és Alert komponensek

## Biztonsági Megfontolások

- Token csak egyszer használható
- Tokenek lejárati ideje van
- Jelszavak soha nem kerülnek lokális tárolásra
- Minden hitelesítés szerver oldalon történik
- Érzékeny adatok titkosított csatornán történő továbbítása
- Jelszó megerősítő mező az elgépelések elkerülésére

Ez a jelszó-visszaállítási oldal biztosítja a felhasználók biztonságos azonosítását és jelszó-visszaállítási lehetőségét, miközben intuitív felhasználói élményt nyújt. A reszponzív design garantálja, hogy minden eszközön megfelelően jelenjen meg.

# Profil Oldal (Profile) Dokumentáció

## Áttekintés

A `Profile.tsx` komponens lehetővé teszi a felhasználók számára, hogy megtekintsék és szerkesszék személyes adataikat (név, email cím). Az oldal tartalmaz egy jelszó megerősítő mechanizmust a biztonságos adatmódosításhoz.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Kettős űrlap rendszer**:
    - Profiladatok szerkesztése
    - Jelszó megerősítő modális ablak

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities` segítségével:
    - `GlobalEntities.user`: Felhasználói adatok
    - `GlobalEntities.updateUser()`: Profiladatok frissítése
    - `GlobalEntities.checkAndRedirectNotRightUser()`: Jogosultság ellenőrzés
- **Lokális állapotok**:
    - `editable`: Szerkesztési mód állapota
    - `showModal`: Jelszó megerősítő modális ablak láthatósága
    - `name`: Felhasználó neve (szerkeszthető másolat)
    - `email`: Felhasználó email címe (szerkeszthető másolat)
    - `snackbarOpen`: Értesítési üzenet megjelenítése/elrejtése
    - `snackbarMessage`: Értesítés szövege
    - `snackbarSeverity`: Értesítés típusa ("success" vagy "error")

### 3. Felhasználói Felület

### Profil adatok megjelenítése/szerkesztése:

- **Név mező**:
    - Megjelenítés/szerkesztés mód váltása
    - Kötelező mező validációval
- **Email mező**:
    - Megjelenítés/szerkesztés mód váltása
    - Kötelező mező, email formátum validációval
- **Művelet gombok**:
    - Szerkesztés: Szerkesztési mód aktiválása
    - Mégse: Változtatások elvetése
    - Mentés: Módosítások megerősítése (modális ablak megnyitása)

### Jelszó megerősítő modális ablak:

- **Módosítások összegzése**
- **Jelszó mező**:
    - Kötelező mező a változtatások megerősítéséhez
- **Művelet gombok**:
    - Mégse: Módosítások elvetése
    - Mentés: Változtatások véglegesítése

### Értesítések:

- **Sikeres módosítás**: "snackbar success" üzenet
- **Hibás jelszó**: "snackbar invalid password" hibaüzenet

### 4. Validáció

### Profil űrlap validáció:

```
Yup.object({
  name: Yup.string().required(t("validation name required")),
  email: Yup.string()
    .email(t("validation email invalid"))
    .required(t("validation email required")),
})

```

### Jelszó megerősítő űrlap validáció:

```
Yup.object({
  password: Yup.string().required(t("validation password required")),
})

```

### 5. Főbb Metódusok

1. **`toggleEdit`**:
    
    ```tsx
    @action toggleEdit = () => {
      this.editable = !this.editable;
    };
    
    ```
    
    - Szerkesztési mód be/ki kapcsolása
2. **`abortEdit`**:
    
    ```tsx
    @action abortEdit = () => {
      this.name = GlobalEntities.user.name as string;
      this.email = GlobalEntities.user.email as string;
      this.editable = false;
      this.showModal = false;
    };
    
    ```
    
    - Változtatások elvetése és eredeti értékek visszaállítása
3. **`confirmEdit`**:
    
    ```tsx
    @action confirmEdit = async (password: string) => {
      const resp = await GlobalEntities.updateUser(
        this.name,
        this.email,
        password,
      );
      if (resp !== 0) {
        this.showSnackbar("snackbar success", "success");
      } else {
        this.showSnackbar("snackbar invalid password", "error");
      }
      this.abortEdit();
    };
    
    ```
    
    - Profiladatok frissítése jelszó megerősítéssel
4. **`showSnackbar`**:
    
    ```tsx
    @action showSnackbar = (message: string, severity: "success" | "error") => {
      this.snackbarMessage = message;
      this.snackbarSeverity = severity;
      this.snackbarOpen = true;
    };
    
    ```
    
    - Értesítési üzenet megjelenítése

## Fordítási Kulcsok

- `title`: Oldal címe
- `label name`: Név mező címkéje
- `label email`: Email mező címkéje
- `label password`: Jelszó mező címkéje
- `button edit`: Szerkesztés gomb szövege
- `button cancel`: Mégse gomb szövege
- `button save`: Mentés gomb szövege
- `modal title`: Modális ablak címe
- `modal confirm`: Megerősítő szöveg
- `validation name required`: Név mező kötelező validációs hiba
- `validation email invalid`: Email formátum validációs hiba
- `validation email required`: Email mező kötelező validációs hiba
- `validation password required`: Jelszó mező kötelező validációs hiba
- `snackbar success`: Sikeres művelet üzenete
- `snackbar invalid password`: Hibás jelszó hibaüzenete

## Technológiai Megoldások

1. **Form kezelés**:
    - Formik könyvtár űrlapkezeléshez
    - Yup validációs séma
    - Kulcs alapú újrarenderelés adatváltozás esetén (`key` prop)
2. **UI komponensek**:
    - Material UI komponensek (TextField, Button, Modal, Paper stb.)
    - Reszponzív elrendezés Stack komponenssel
3. **Állapotkezelés**:
    - MobX observables és actions
    - Lokális állapotok a felhasználói felület vezérléséhez
4. **Navigáció**:
    - React Router NavigateFunction
5. **Fordítás**:
    - react-i18next könyvtár a többnyelvű támogatáshoz
6. **Értesítések**:
    - Material UI Snackbar és Alert komponensek

## Biztonsági Megfontolások

- Jelszó megerősítés szükséges minden adatmódosításhoz
- Érzékeny adatok soha nem kerülnek lokális tárolásra
- Minden hitelesítés szerver oldalon történik
- Automatikus jogosultság ellenőrzés (`checkAndRedirectNotRightUser`)
- Jelszó mező biztonságos megjelenítése (type="password")

Ez a profil oldal biztosítja a felhasználók biztonságos adatmódosítási lehetőségét, miközben intuitív felhasználói élményt nyújt. A reszponzív design garantálja, hogy minden eszközön megfelelően jelenjen meg.

# Regisztrációs Oldal (Register) Dokumentáció

## Áttekintés

A `Register.tsx` komponens az alkalmazás regisztrációs felületét valósítja meg, lehetővé téve új felhasználók számára, hogy fiókot hozzanak létre. Az oldal tartalmazza a regisztrációs űrlapot és a bejelentkezési oldalra való átirányítást.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Egyszerűsített űrlap design**: Minden szükséges mező egy oldalon

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities` segítségével:
    - `GlobalEntities.register()`: Regisztrációs funkció
- **Lokális állapotok**:
    - `snackbarOpen`: Értesítési üzenet megjelenítése/elrejtése
    - `snackbarMessage`: Értesítés szövege
    - `snackbarSeverity`: Értesítés típusa ("success" vagy "error")
- **Űrlap kezdeti értékei**:
    - `name`: Teljes név
    - `email`: Email cím
    - `password`: Jelszó
    - `confirmPassword`: Jelszó megerősítése

### 3. Felhasználói Felület

### Regisztrációs űrlap:

- **Név mező**:
    - Kötelező mező
- **Email mező**:
    - Kötelező mező
    - Email formátum ellenőrzéssel
- **Jelszó mező**:
    - Kötelező mező
    - Minimum 8 karakter hosszúságú
- **Jelszó megerősítése mező**:
    - Kötelező mező
    - Egyeznie kell a jelszó mezővel
- **Link**:
    - Bejelentkezési oldalra navigálás
- **Regisztráció gomb**

### Értesítések:

- **Sikeres regisztráció**: Automatikus átirányítás a bejelentkezési oldalra
- **Hibák kezelése**: Többféle hibaüzenet különböző hibákhoz

### 4. Validáció

```
Yup.object({
  name: Yup.string().required(t("Validation Fullname Required")),
  email: Yup.string()
    .email(t("Validation Email Format"))
    .required(t("Validation Email Required")),
  password: Yup.string()
    .min(8, t("Validation Password Length"))
    .required(t("Validation Password Required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], t("Validation Password Match"))
    .required(t("Validation Confirm Password Required")),
})

```

### 5. Hibakezelés

- "The email has already been taken" → "Register Error Taken"
- 422 Validation Error → "Validation Error"
- Egyéb hibák → "Register Error"

## Fontos Metódusok

1. **`handleSubmit`**:
    
    ```tsx
    @action private async handleSubmit(values: typeof this.initialValues)
    
    ```
    
    - Kezeli a regisztrációs folyamatot
    - Sikeres regisztráció esetén átirányít a bejelentkezési oldalra
    - Hibák esetén megfelelő üzenetet jelenít meg
2. **`handleCloseSnackbar`**:
    
    ```tsx
    @action private handleCloseSnackbar = () => {
      this.snackbarOpen = false;
    };
    
    ```
    
    - Bezárja az értesítési üzenetet

## Fordítási Kulcsok

- `Register Title`: Oldal címe
- `Register Fullname`: Név mező címkéje
- `Register Email`: Email mező címkéje
- `Register Password`: Jelszó mező címkéje
- `Register Confirm Password`: Jelszó megerősítése mező címkéje
- `Register Have Account`: Bejelentkezési link szövege
- `Register Submit`: Regisztráció gomb szövege
- `Validation Fullname Required`: Név mező kötelező validációs hiba
- `Validation Email Format`: Email formátum validációs hiba
- `Validation Email Required`: Email mező kötelező validációs hiba
- `Validation Password Length`: Jelszó hossz validációs hiba
- `Validation Password Required`: Jelszó mező kötelező validációs hiba
- `Validation Password Match`: Jelszavak egyezésének validációs hibája
- `Validation Confirm Password Required`: Jelszó megerősítés kötelező validációs hiba
- `Register Success`: Sikeres regisztráció üzenete
- `Register Error`: Általános regisztrációs hiba
- `Register Error Taken`: Foglalt email cím hiba
- `Validation Error`: Validációs hiba

## Technológiai Megoldások

1. **Form kezelés**:
    - Formik könyvtár űrlapkezeléshez
    - Yup validációs séma
2. **UI komponensek**:
    - Material UI komponensek (TextField, Button, Snackbar stb.)
    - Reaktív elrendezés Stack komponenssel
3. **Állapotkezelés**:
    - MobX observables és actions
    - Lokális állapotok a felhasználói felület vezérléséhez
4. **Navigáció**:
    - React Router NavigateFunction
5. **Fordítás**:
    - react-i18next könyvtár a többnyelvű támogatáshoz
6. **Értesítések**:
    - Material UI Snackbar és Alert komponensek

## Biztonsági Megfontolások

- Jelszavak soha nem kerülnek lokális tárolásra
- Minden hitelesítés szerver oldalon történik
- Jelszó megerősítő mező az elgépelések elkerülésére
- Minimum 8 karakter hosszúságú jelszó követelmény
- Érzékeny adatok titkosított csatornán történő továbbítása

Ez a regisztrációs oldal biztosítja az új felhasználók könnyű és biztonságos regisztrációját, miközben intuitív felhasználói élményt nyújt. A reszponzív design garantálja, hogy minden eszközön megfelelően jelenjen meg.

# Feladat Rögzítő Oldal (TaskRecording) Dokumentáció

## Áttekintés

A `TaskRecording.tsx` komponens lehetővé teszi a felhasználók számára új feladatok létrehozását és kategóriák hozzáadását. Az oldal egy átfogó űrlapot biztosít a feladatok részletes rögzítéséhez, prioritás beállításához és határidő meghatározásához.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Komplex űrlap rendszer**: 5 különböző mezőtípus
- **Modális dialógus**: Új kategória létrehozásához

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities` segítségével:
    - `GlobalEntities.createTask()`: Feladat létrehozása
    - `GlobalEntities.createCategory()`: Kategória létrehozása
    - `GlobalEntities.loadCategories()`: Kategóriák betöltése
    - `GlobalEntities.checkAndRedirectNotRightUser()`: Jogosultság ellenőrzés
- **Lokális állapotok**:
    - `category`: Kiválasztott kategória
    - `showCategoryDialog`: Kategória dialógus láthatósága
- **Snackbar állapot**:
    - `open`: Megjelenítés állapota
    - `message`: Üzenet szövege
    - `type`: Üzenet típusa ("success" vagy "error")

### 3. Felhasználói Felület

### Fő űrlap:

- **Cím mező**:
    - Kötelező mező
    - Maximum 50 karakter
- **Leírás mező**:
    - Kötelező mező
    - Maximum 255 karakter
    - Többsoros bevitel
- **Határidő mező**:
    - Kötelező mező
    - Dátum és idő választó
    - Jövőbeli dátumra korlátozva
- **Kategória választó**:
    - Autocomplete komponens
    - Új kategória hozzáadás gombbal
    - Nyelvspecifikus kategóriák
- **Prioritás csúszka**:
    - 1-10 skála
    - Alapértelmezett érték: 5
- **Küldés gomb**

### Kategória dialógus:

- **Név mező**: Új kategória neve
- **Létrehozás gomb**

### Értesítések:

- **Sikeres műveletek**: Feladat/kategória létrehozása
- **Hibák**: Hálózati vagy szerverhibák

### 4. Validáció

```
Yup.object().shape({
  title: Yup.string().max(50, t("Max50Chars")).required(t("RequiredField")),
  description: Yup.string()
    .max(255, t("Max255Chars"))
    .required(t("RequiredField")),
  due_date: Yup.date()
    .min(new Date(Date.now() + 60000), t("MustBeFutureDate"))
    .required(t("RequiredField")),
  category_id: Yup.number().required(t("RequiredField")),
  priority: Yup.number()
    .min(1, t("MinPriority1"))
    .max(10, t("MaxPriority10"))
    .required(t("RequiredField")),
})

```

### 5. Főbb Metódusok

1. **`handleSubmit`**:
    
    ```tsx
    @action handleSubmit = async (
      values: FormValues,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
      setSnackbar: (state: SnackbarState) => void,
    )
    
    ```
    
    - Feldolgozza a feladat létrehozási kérelmet
    - Átirányít a főoldalra sikeres létrehozás után
2. **`handleCreateCategory`**:
    
    ```tsx
    @action handleCreateCategory = async (
      name: string,
      setSnackbar: (state: SnackbarState) => void,
    ): Promise<void>
    
    ```
    
    - Új kategória létrehozása és betöltése
3. **`toggleCategoryDialog`**:
    
    ```tsx
    @action toggleCategoryDialog = (open: boolean): void
    
    ```
    
    - Kategória dialógus megnyitása/bezárása
4. **`getNowRoundedToMinute`**:
    
    ```tsx
    const getNowRoundedToMinute = (): string
    
    ```
    
    - Aktuális dátum és idő lekérése perc pontossággal

## Fordítási Kulcsok

- `AddTaskTitle`: Oldal címe
- `AddTaskDescription`: Oldal leírása
- `TaskTitle`: Cím mező címkéje
- `TaskDescription`: Leírás mező címkéje
- `DueDateTitle`: Határidő mező címkéje
- `CategoryTitle`: Kategória mező címkéje
- `SubmitButton`: Küldés gomb szövege
- `Max50Chars`: Cím mező hossz korlát hibaüzenete
- `Max255Chars`: Leírás mező hossz korlát hibaüzenete
- `MustBeFutureDate`: Határidő validációs hiba
- `RequiredField`: Kötelező mező hibaüzenete
- `MinPriority1`: Minimális prioritás hiba
- `MaxPriority10`: Maximális prioritás hiba
- `TaskCreatedSuccess`: Sikeres feladat létrehozás üzenete
- `TaskCreateError`: Feladat létrehozási hiba
- `CategoryCreatedSuccess`: Sikeres kategória létrehozás üzenete
- `CategoryCreateError`: Kategória létrehozási hiba
- `NetworkOrServerError`: Hálózati/szerver hiba üzenete

## Technológiai Megoldások

1. **Form kezelés**:
    - Formik könyvtár űrlapkezeléshez
    - Yup validációs séma
    - Egyedi `StyledTextField` és `StyledAutocomplete` komponensek
2. **UI komponensek**:
    - Material UI komponensek (Card, TextField, Autocomplete stb.)
    - Egyedi `PrioritySlider` komponens
    - `CreateCategoryDialog` modális komponens
3. **Állapotkezelés**:
    - MobX observables, actions és computed property-k
    - React useState hook a Snackbar állapothoz
4. **Navigáció**:
    - React Router NavigateFunction
    - Automatikus átirányítás jogosultság ellenőrzéssel
5. **Fordítás**:
    - react-i18next könyvtár
    - i18n közvetlen használata API hívásokhoz
6. **Dátumkezelés**:
    - JavaScript Date objektum
    - Manuális formázás perc pontossággal

## Egyedi Komponensek

1. **`PrioritySlider`**:
    - Testreszabható csúszka 1-10 skálán
    - Érték megjelenítése a csúszka felett
2. **`CreateCategoryDialog`**:
    - Modális ablak új kategória hozzáadásához
    - Egyszerű szövegmező és mentés gomb
3. **`StyledTextField`**:
    - Egységes stílusú szövegmezők
    - Testreszabott fókusz állapot
4. **`StyledAutocomplete`**:
    - Kategória választó autocomplete komponens
    - Új kategória hozzáadás gomb beépítve

## Biztonsági Megfontolások

- Jogosultság ellenőrzés minden betöltéskor
- Dátum validáció (csak jövőbeli dátumok)
- Beviteli mezők hossz korlátozása
- Kiszolgáló oldali validáció minden adatküldésnél
- Biztonságos adattovábbítás HTTPS protokollon

Ez a feladat rögzítő oldal átfogó megoldást nyújt a felhasználók számára új feladatok létrehozásához, miközben biztosítja az adatok integritását és a felhasználói élmény optimalizálását. A reszponzív design garantálja, hogy minden eszközön megfelelően jelenjen meg.

# Felhasználókezelő Oldal (UserManagement) Dokumentáció

## Áttekintés

A `UserManagement.tsx` komponens az alkalmazás felhasználókezelési felületét valósítja meg, lehetővé téve az adminisztrátorok számára a felhasználói fiókok kezelését. Az oldal táblázatos formában jeleníti meg a felhasználókat, és lehetőséget biztosít szerkesztésükre és törlésükre.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Osztály alapú komponens**: A `ViewComponent` interfészt implementálja
- **Observer komponens**: MobX `observer` wrapperrel reaktívvá téve
- **Táblázatos megjelenítés**: Felhasználói adatok rendezett megjelenítése
- **Inline szerkesztés**: Közvetlenül a táblázatban történő módosítás
- **Megerősítő dialógusok**: Módosítások és törlések megerősítése

### 2. Állapotkezelés

- **Globális állapot**: `GlobalEntities` segítségével:
    - `GlobalEntities.users`: Felhasználók listája
    - `GlobalEntities.updateUserById()`: Felhasználó frissítése
    - `GlobalEntities.deleteUser()`: Felhasználó törlése
    - `GlobalEntities.fetchUsers()`: Felhasználók frissítése
    - `GlobalEntities.checkAndRedirectNotRightUser()`: Jogosultság ellenőrzés
- **Lokális állapotok**:
    - `editingId`: Jelenleg szerkesztett felhasználó ID-ja
    - `editedUser`: Szerkesztett felhasználó adatai
    - `confirmSave`: Mentés megerősítő dialógus állapota
    - `confirmDeleteId`: Törlésre jelölt felhasználó ID-ja
    - `snackbarOpen`: Értesítési üzenet megjelenítése/elrejtése
    - `snackbarMessage`: Értesítés szövege

### 3. Felhasználói Felület

### Fő táblázat:

- **Név oszlop**:
    - Megjelenítés/szerkesztés mód váltása
    - Szövegmező szerkesztés közben
- **Email oszlop**:
    - Megjelenítés/szerkesztés mód váltása
    - Szövegmező szerkesztés közben
- **Szerepkör oszlop**:
    - Megjelenítés/szerkesztés mód váltása
    - Legördülő menü szerkesztés közben
    - "user" és "admin" szerepkörök
- **Műveletek oszlop**:
    - Szerkesztés gomb (ceruza ikon)
    - Törlés gomb (kuka ikon)
    - Mentés/Mégse gombok szerkesztés közben

### Megerősítő dialógusok:

1. **Mentés megerősítése**:
    - "Are you sure you want to save changes?" üzenet
    - Mégse/Mentés gombok
2. **Törlés megerősítése**:
    - "Are you sure you want to delete this user?" üzenet
    - Mégse/Törlés gombok

### Értesítések:

- **Sikeres műveletek**: "Changes saved successfully" vagy "User deleted successfully"
- **Hibák**: Konzolba írt hibaüzenetek

### 4. Főbb Metódusok

1. **`handleEdit`**:
    
    ```tsx
    @action handleEdit(user: User)
    
    ```
    
    - Szerkesztési mód aktiválása a kiválasztott felhasználóhoz
2. **`handleCancel`**:
    
    ```tsx
    @action handleCancel()
    
    ```
    
    - Szerkesztési mód megszakítása
3. **`handleChange`**:
    
    ```tsx
    handleChange = action((e: ChangeEvent<HTMLInputElement> | ChangeEvent<{ name?: string; value: unknown }>))
    
    ```
    
    - Szerkesztett felhasználó adatainak frissítése
4. **`handleSaveRequest`**:
    
    ```tsx
    @action handleSaveRequest()
    
    ```
    
    - Mentés megerősítő dialógus megnyitása
5. **`handleSave`**:
    
    ```tsx
    @action async handleSave()
    
    ```
    
    - Felhasználó adatainak mentése a szerverre
6. **`handleDeleteRequest`**:
    
    ```tsx
    @action handleDeleteRequest(id: number)
    
    ```
    
    - Törlés megerősítő dialógus megnyitása
7. **`handleDelete`**:
    
    ```tsx
    @action async handleDelete(id: number)
    
    ```
    
    - Felhasználó törlése a szerverről

## Fordítási Kulcsok

- `User Management`: Oldal címe
- `Name`: Név oszlop fejléce
- `Email`: Email oszlop fejléce
- `Role`: Szerepkör oszlop fejléce
- `Actions`: Műveletek oszlop fejléce
- `User`: Felhasználói szerepkör
- `Admin`: Adminisztrátori szerepkör
- `Confirm Save`: Mentés megerősítés dialógus címe
- `Are you sure you want to save changes?`: Mentés megerősítés szövege
- `Confirm Delete`: Törlés megerősítés dialógus címe
- `Are you sure you want to delete this user?`: Törlés megerősítés szövege
- `Cancel`: Mégse gomb szövege
- `Confirm`: Megerősítés gomb szövege
- `Changes saved successfully`: Sikeres mentés üzenete
- `User deleted successfully`: Sikeres törlés üzenete

## Biztonsági Megfontolások

- **Jogosultság ellenőrzés**: Minden betöltéskor ellenőrzi a felhasználó jogosultságát
- **Saját fiók védelme**: A felhasználó nem változtathatja meg saját szerepkörét
- **Megerősítések**: Minden kritikus művelet (mentés, törlés) megerősítést igényel
- **Adatintegritás**: Minden módosítás azonnal szinkronizálódik a szerverrel
- **Naplózás**: Hibák részletes naplózása a konzolba

## Technológiai Megoldások

1. **UI komponensek**:
    - Material UI táblázat és dialógus komponensek
    - Reszponzív elrendezés Stack komponenssel
    - Intuitív ikonok a műveletekhez (Edit, Delete, Save, Cancel)
2. **Állapotkezelés**:
    - MobX observables és actions
    - Lokális állapotok a felhasználói felület vezérléséhez
    - Aszinkron adatfrissítés a szerverrel
3. **Form kezelés**:
    - Közvetlen táblázatos szerkesztés
    - Dinamikus mezők típusai (szöveg, legördülő menü)
4. **Navigáció**:
    - React Router NavigateFunction
5. **Fordítás**:
    - react-i18next könyvtár a többnyelvű támogatáshoz
6. **Értesítések**:
    - Material UI Snackbar komponens

Ez a felhasználókezelő oldal hatékony eszközt biztosít az adminisztrátorok számára a felhasználói fiókok kezeléséhez, miközben biztosítja az adatok biztonságát és integritását. A reszponzív design garantálja, hogy minden eszközön megfelelően jelenjen meg.

# Interface Dokumentációk

## ViewComponent.tsx

### Áttekintés

A `ViewComponent` interfész egy alapvető React komponens szerkezetet definiál, amelyet osztály alapú komponensek implementálhatnak.

### Főbb jellemzők

- **Kötelező metódus**: `View()` függvény, amely JSX elemet ad vissza
- **Célja**: Egységes komponens struktúra biztosítása
- **Használat**: Főleg osztály alapú komponenseknél alkalmazzák

### Példa implementáció

```tsx
class MyComponent implements ViewComponent {
  View() {
    return <div>Hello World</div>;
  }
}

```

## User.ts

### Áttekintés

A `User` interfész egy felhasználói entitást ír le az alkalmazásban.

### Mezők

- **id**: Felhasználó egyedi azonosítója (number vagy undefined)
- **name**: Felhasználó neve (string vagy undefined)
- **email**: Felhasználó email címe (string vagy undefined)
- **role**: Felhasználó szerepköre (string vagy undefined)
- **created_at**: Létrehozás dátuma (bármilyen típus vagy undefined)
- **updated_at**: Utolsó módosítás dátuma (bármilyen típus vagy undefined)

### Megjegyzések

- Minden mező opcionális (undefined lehet)
- Dátummezők típusa nem specifikus (javasolt Date típusra módosítás)

## TaskStatus.ts

### Áttekintés

A `TaskStatus` egy enumerációhoz hasonló típus, ami a feladatok állapotát írja le.

### Lehetséges értékek

1. **"new"**: Új feladat
2. **"in-progress"**: Folyamatban lévő feladat
3. **"finished"**: Befejezett feladat
4. **"expired"**: Lejárt feladat

### Használat

- TypeScript string literál típus
- Exportált típus, más fájlokban importálható

## Task.ts

### Áttekintés

A `Task` interfész egy feladat entitást ír le az alkalmazásban.

### Mezők

- **id**: Egyedi azonosító (kötelező number)
- **title**: Feladat címe (kötelező string)
- **description**: Feladat leírása (kötelező string)
- **due_date**: Határidő (kötelező Date)
- **priority**: Prioritás (kötelező number)
- **status**: Állapot (kötelező TaskStatus típus)
- **category_id**: Kategória azonosító (kötelező number)
- **user_id**: Felhasználó azonosító (kötelező number)

### Kapcsolódó típusok

- Importálja a `TaskStatus` típust

## SnackbarState.ts

### Áttekintés

A `SnackbarState` interfész egy értesítési komponens állapotát írja le.

### Mezők

- **open**: Megnyitott állapot (kötelező boolean)
- **type**: Üzenet típusa (kötelező, "success" vagy "error")
- **message**: Megjelenítendő üzenet (kötelező string)

### Használati helyzetek

- Sikeres műveletek jelzése ("success")
- Hibaüzenetek megjelenítése ("error")

## FormValues.ts

### Áttekintés

A `FormValues` interfész egy űrlap adatstruktúrát definiál.

### Mezők

- **title**: Cím (kötelező string)
- **description**: Leírás (kötelező string)
- **due_date**: Határidő (kötelező string formátumban)
- **category_id**: Kategória azonosító (kötelező string)
- **priority**: Prioritás (kötelező number)

### Megjegyzések

- A `due_date` string típusú (átalakításra szorulhat Date típusra)
- A `category_id` string típusú (számra lehet szükség)

## Category.ts

### Áttekintés

A `Category` interfész egy kategória entitást ír le.

### Mezők

- **id**: Egyedi azonosító (number vagy undefined)
- **name**: Kategória neve (string vagy undefined)
- **lang**: Nyelvi kód (string vagy undefined)
- **user_id**: Tulajdonos felhasználó azonosítója (number vagy undefined)

# GlobalApiHandlerInstance.ts Dokumentáció

## Áttekintés

A `GlobalApiHandlerInstance` egy konfigurált Axios példányt exportál, amely az alkalmazás és a backend API közötti HTTP kommunikációt kezeli. Ez a modul szolgál az összes API hívás alapjaként az alkalmazásban.

## Főbb Jellemzők

### 1. Alapkonfiguráció

- **Base URL**: `http://backend.vm1.test/api`
    - Minden relatív útvonal ehhez az alap URL-hez lesz hozzáfűzve
- **Alapértelmezett fejlécek**:
    - `Accept: "application/json"` - JSON formátumú válaszokat vár
    - `"Content-Type": "application/json"` - JSON formátumban küldi az adatokat

### 2. Technikai Megvalósítás

- **Axios példány**: `axios.create()` segítségével létrehozott egyedi konfiguráció
- **Singleton minta**: Az exportált példányt az egész alkalmazásban újra lehet használni
- **Könnyen bővíthető**: Interceptorok hozzáadásával testreszabható

### 3. Használati módok

### Alapvető használat:

```tsx
import GlobalApiHandlerInstance from './GlobalApiHandlerInstance';

// GET kérés
const response = await GlobalApiHandlerInstance.get('/endpoint');

// POST kérés
const response = await GlobalApiHandlerInstance.post('/endpoint', { data });

```

### Példa auth token hozzáadására:

```tsx
GlobalApiHandlerInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

```

### 4. Előnyök

1. **Központosított konfiguráció**: Minden API hívás ugyanazzal az alapkonfigurációval indul
2. **Karbantarthatóság**: Az API URL egyszerűen módosítható egy helyen
3. **Konzisztencia**: Egységes fejlécek minden kérésnél
4. **Bővíthetőség**: Interceptorokkal könnyen testreszabható

## Fejlesztői Megjegyzések

1. **Környezeti változók**:
    - Éles használatban ajánlott a baseURL-t környezeti változóból betölteni
    - Példa: `baseURL: process.env.API_BASE_URL`
2. **Hibakezelés**:
    - Implementálhatók globális hibakezelő interceptorok
    - Példa:
        
        ```tsx
        GlobalApiHandlerInstance.interceptors.response.use(
          response => response,
          error => {
            // Globális hibakezelés
            return Promise.reject(error);
          }
        );
        
        ```
        
3. **Biztonság**:
    - Éles környezetben HTTPS használata kötelező
    - Auth token kezelése interceptorral javasolt
4. **Testreszabási lehetőségek**:
    - Timeout beállítás hozzáadható
    - Request/response átalakítások
    - Cache stratégia implementálása

## Használati Példák

### 1. Egyszerű GET kérés

```tsx
const fetchData = async () => {
  try {
    const response = await GlobalApiHandlerInstance.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

```

### 2. POST kérés adattal

```tsx
const createTask = async (taskData) => {
  try {
    const response = await GlobalApiHandlerInstance.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Task creation failed:', error);
    throw error;
  }
};

```

### 3. Interceptorok használata

```tsx
// Request interceptor
GlobalApiHandlerInstance.interceptors.request.use(config => {
  console.log('Request sent:', config);
  return config;
});

// Response interceptor
GlobalApiHandlerInstance.interceptors.response.use(response => {
  console.log('Response received:', response);
  return response;
});

```

Ez a modul az alkalmazás API kommunikációjának központi eleme, biztosítva a konzisztens konfigurációt és egyszerű bővíthetőséget minden HTTP kéréshez.

# Komponens Dokumentációk

## Layout.tsx

### Áttekintés

A `Layout` komponens az alkalmazás alapvető elrendezését határozza meg, amely tartalmazza a fejlécet és a fő tartalmi területet. Ez a komponens biztosítja a konzisztens megjelenést az alkalmazás minden oldalán.

### Főbb jellemzők

### 1. Komponens Struktúra

- **Funkcionális komponens**: React Function Component
- **Props**: `children` (ReactNode) - A megjelenítendő tartalom
- **Container komponens**: Chakra UI `Container` használata alapelrendezéshez
- **Feltételes renderelés**: Fejléc megjelenítése bizonyos útvonalakon

### 2. Viselkedés

- **Fejléc kezelés**:
    - A `locationsWithoutHeader` tömbben definiált útvonalakon nem jelenik meg a fejléc
    - Alapértelmezett útvonalak: `/`, `/login`, `/register`
- **Tartalom középre igazítása**:
    - `maxWidth: 1280px`
    - Automatikus margó (`margin: auto`)
    - Középre igazítás (`alignContent: "center"`)

### 3. Technikai megvalósítás

- **Útvonalkezelés**: `useLocation` hook a jelenlegi útvonal lekérdezéséhez
- **Reszponzív design**: Chakra UI alapú elrendezés
- **Fejléc komponens**: Külső `Header` komponens importálása

### Használati példa

```tsx
<Layout>
  <MyPageContent />
</Layout>

```

### Fejlesztői megjegyzések

- Új fejléc nélküli útvonal hozzáadásához egyszerűen bővíteni kell a `locationsWithoutHeader` tömböt
- A konténer stílusai könnyen testreszabhatók a Chakra UI theme használatával
- A komponens nem tartalmaz belső állapotot (stateless)

## Card.tsx (BaseCard osztály)

### Áttekintés

A `BaseCard` osztály egy feladatkártya komponenst valósít meg MobX állapotkezeléssel, amely implementálja a `ViewComponent` interfészt. A komponens lehetővé teszi a feladatok megjelenítését és szerkesztését.

### Főbb jellemzők

### 1. Osztálystruktúra

- **ViewComponent implementáció**: Kötelező `View()` metódussal
- **MobX állapotkezelés**: `observable` és `action` dekorátorok használata
- **Konstruktor**: Feladat és kategória inicializálása

### 2. Állapotok

- **task**: A megjelenítendő feladat
- **category**: A feladathoz tartozó kategória
- **showAlert**: Értesítés megjelenítési állapota
- **alertMessage**: Értesítés szövege
- **alertType**: Értesítés típusa ("success" vagy "error")
- **isEditModalOpen**: Szerkesztő modal állapota
- **editSnackbar**: Szerkesztés utáni értesítés

### 3. Főbb metódusok

- **toggleStatus()**: Feladat állapotának váltása
- **handleEditSubmit()**: Feladat szerkesztésének elküldése
- **toggleEditModal()**: Szerkesztő modal megnyitása/zárása
- **View()**: A komponens vizuális megjelenítése

### 4. Felhasználói felület elemek

- **Kártya megjelenítés**:
    - Cím, leírás, állapot, prioritás, kategória, határidő
    - Szerkesztés gomb (EditIcon)
    - Állapotváltó gombok ("In progress", "Done")
- **Szerkesztő modal**:
    - Űrlap a feladat részleteinek módosításához
    - Validáció Yup segítségével
    - Dátumválasztó, prioritás csúszka, kategória választó
- **Értesítések**:
    - Snackbar komponensek sikeres/műveletekhez

### 5. Fordítási támogatás

- Minden szöveg a `react-i18next` segítségével fordítható
- Validációs hibák fordítása is támogatott

### Technikai megvalósítás

- **Komponenskönyvtárak**:
    - Chakra UI (alap layout)
    - Material UI (ikonok, gombok, dialógusok)
    - Formik + Yup (űrlapkezelés)
- **Dátumkezelés**:
    - Szerverformátumra konvertálás (`formatDateForServer`)
    - Bemeneti formátumra konvertálás (`formatDateForInput`)
- **Állapotkezelés**:
    - MobX observables és actions
    - Globális állapot (`GlobalEntities`)

### Használati példa

```tsx
const task = { /*...*/ };
const card = new BaseCard(task);
return <card.View />;

```

### Fejlesztői megjegyzések

- A komponens erősen függ a `GlobalEntities` globális állapotkezelőtől
- A kártya stílusai közvetlenül a komponensben vannak definiálva (CSS-in-JS)
- Új mezők hozzáadásakor mind a szerkesztő űrlapot, mind a validációt frissíteni kell
- A komponens reszponzív módon kezeli a gombok elrendezését (függőleges/ vízszintes)

Ez a két komponens az alkalmazás alapvető építőköveit alkotja - a `Layout` biztosítja a konzisztens elrendezést, míg a `BaseCard` a feladatok interaktív megjelenítését és kezelését valósítja meg.

# Block Komponens Dokumentáció

## Áttekintés

A `Block` egy egyszerű, stilizált szöveges tartalmi blokk komponens, amely fordítást támogat a `react-i18next` segítségével. A komponens két fájlból áll:

1. `styles.ts` - Stílusdefiníciók styled-components segítségével
2. `index.tsx` - A komponens logikája és felépítése

## 1. styles.ts

### Stíluskomponensek

### `Content`

- **Cél**: Fő tartalmi szöveg stílusa
- **Tulajdonságok**:
    - `margin-top: 1.5rem` - Felső margó a szöveg körül

### `Container`

- **Cél**: A blokk fő tároló eleme
- **Tulajdonságok**:
    - `position: relative` - Relatív pozicionálás
    - `max-width: 700px` - Maximális szélesség
    - Alapértelmezett `div` elem

### `TextWrapper`

- **Cél**: A szöveg burkoló eleme
- **Tulajdonságok**:
    - `border-radius: 3rem` - Nagyon lekerekített sarkok
    - `max-width: 400px` - Szűkebb maximális szélesség
    - `margin: auto` - Középre igazítás

## 2. index.tsx

### Komponens paraméterei (Props)

```tsx
interface Props {
  title: string;    // A blokk címe (fordítási kulcs)
  content: string;  // A blokk tartalma (fordítási kulcs)
  t: TFunction;     // A react-i18next fordító függvénye
}

```

### Felépítés

1. **Külső konténer**: `Container` komponens
    - Tartalmazza a címet (`h6`) és a szöveges tartalmat
2. **Szöveg burkoló**: `TextWrapper` komponens
    - Stílusos keret a tartalom körül
3. **Tartalom**: `Content` komponens
    - Maga a szöveges tartalom

### Fordítási támogatás

- Mind a cím (`title`), mind a tartalom (`content`) fordításkulcsokat vár
- A `withTranslation()` HOC biztosítja a `t` fordító függvényt

### Példa használat

```jsx
<Block
  title="about.title"
  content="about.description"
/>

```

## Teljes komponens működése

1. A komponens megkapja a fordításkulcsokat (`title`, `content`)
2. A `react-i18next` `t` függvénye lefordítja a kulcsokat
3. A fordított szövegek a stílusos komponensekbe kerülnek megjelenítésre
4. A végeredmény egy formázott szöveges blokk, középre igazítva

## Stílusos jellemzők

- **Reszponzív**: A max-width értékek miatt jól alkalmazkodik különböző képernyőméretekhez
- **Egységes megjelenés**: A nagy border-radius modern, lágy hatást eredményez
- **Hierarchia**: A cím (`h6`) és a tartalom (`p`) között automatikus térköz

## Fejlesztői megjegyzések

1. **Bővíthetőség**:
    - Új stílus tulajdonságok egyszerűen hozzáadhatók a `styles.ts` fájlban
    - További wrapper komponensek létrehozhatók szükség szerint
2. **Testreszabás**:
    - A komponens könnyen átméretezhető a max-width értékek módosításával
    - A border-radius állítható a kívánt hatás eléréséhez
3. **Fordítás**:
    - A fordításkulcsokat a lokális fordítási fájlokban kell definiálni
    - A komponens maga nem tartalmaz konkrét szövegeket

Ez a komponens ideális egyszerű, stilizált szöveges tartalmak megjelenítésére, különösen olyan helyzetekben, ahol a tartalomnak fordíthatónak kell lennie több nyelv támogatásával.

# Footer Komponens Dokumentáció

## Áttekintés

A `Footer` komponens az alkalmazás láblécét valósítja meg, amely több szekcióból áll és támogatja a többnyelvűséget. A komponens két fő fájlból áll:

1. `styles.ts` - A lábléc stílusdefiníciói styled-components segítségével
2. `index.tsx` - A lábléc logikája és struktúrája

## 1. styles.ts

### Fő stíluskomponensek

### `FooterSection`

- **Cél**: A lábléc fő szekciója
- **Tulajdonságok**:
    - `background: rgb(241, 242, 243)` - Világosszürke háttér
    - `padding: 2.5rem 0` - Függőleges padding

### `Title`

- **Cél**: Szekciócímek stílusa
- **Tulajdonságok**:
    - `font-size: 26px`
    - `color: #18216d` - Sötétkék szín
    - Reszponzív: Kisebb képernyőn `padding: 1.5rem 0`

### `NavLink`

- **Cél**: Navigációs linkek
- **Tulajdonságok**:
    - `transition: all 0.2s ease-in-out` - Sima hover effekt
    - `&:hover`: `color: #15418e` - Kék szín hover állapotban

### `Extra`

- **Cél**: Kiegészítő lábléc szekció
- **Tulajdonságok**:
    - Ugyanaz a háttérszín mint a `FooterSection`
    - `padding-bottom: 2rem`

### `Large`

- **Cél**: Nagyobb méretű linkek
- **Tulajdonságok**:
    - `font-size: 16px`
    - `&:hover`: Szalmaszínű aláhúzás és színváltás

### `FooterContainer`

- **Cél**: Social media ikonok tárolója
- **Tulajdonságok**:
    - `max-width: 510px`
    - Reszponzív viselkedés: mobilon csak az utolsó ikon látszik

### `LanguageSwitchContainer`

- **Cél**: Nyelvváltó gombok tárolója
- **Tulajdonságok**:
    - `width: 85px`
    - `justify-content: space-between`

## 2. index.tsx

### Főbb részek

### 1. Nyelvváltás

- **Funkcionalitás**:
    - Kétnyelvű támogatás (angol, magyar)
    - Az aktuális nyelv localStorage-ban tárolódik
- **Implementáció**:
    
    ```tsx
    const handleChange = (language: string) => {
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    };
    
    ```
    

### 2. Főbb szekciók

1. **Kapcsolat**:
    - Email cím megjelenítése `mailto:` linkkel
2. **Dokumentáció**:
    - Link az útmutatóhoz (`/how-to-use` vagy `/app/how-to-use`)
3. **Cím**:
    - Cím megjelenítése több sorban
4. **Nyelvválasztó**:
    - Zászló ikonokkal (angol és magyar)

### 3. Kiegészítő szekció

- **Logo**: Alkalmazás logója és név
- **Social media ikonok**: Jelenleg kikommentezve, de könnyen aktiválható

### Reszponzív viselkedés

- **Oszlopok elrendezése**: Ant Design `Row` és `Col` komponensekkel
- **Középre igazítás**: Minden tartalom `Center` komponensben
- **Mobil nézet**: Oszlopok egymás alá kerülnek

### Fordítási támogatás

- Minden szöveg a `react-i18next` segítségével fordítható
- Fordítási kulcsok:
    - `Contact`, `Mail Us`, `Documentation Title`, `Documentation Text`
    - `Address`, `Adress Detail 1-3`, `Language`

## Használati példa

```jsx
<Footer />

```

## Fejlesztői megjegyzések

1. **Új nyelv hozzáadása**:
    - Új nyelvi kapcsoló gomb hozzáadása a `LanguageSwitchContainer`hez
    - Új zászló ikon hozzáadása a `public` mappába
2. **Social media ikonok**:
    - A kikommentezett rész aktiválásával hozzáadhatóak
    - Az ikonokat SVG formátumban kell elhelyezni
3. **Új szekciók**:
    - Új `Col` elem hozzáadásával bővíthető
    - Stílusok a `styles.ts` fájlban definiálhatók
4. **App/Web eltérés**:
    - A komponens automatikusan kezeli az app és web oldalon lévő eltérő útvonalakat
5. **Stílus testreszabás**:
    - Színek könnyen módosíthatók a `styles.ts` fájlban
    - Padding/margin értékek állíthatók

Ez a lábléc komponens teljes körű megoldást nyújt a weboldal alján megjelenítendő információkhoz, rugalmasan testreszabható és könnyen bővíthető további funkciókkal.

# Fejléc Komponens (Header) Dokumentáció

## Áttekintés

A fejléc komponens az alkalmazás fő navigációs elemét valósítja meg, amely reszponzív módon adaptálódik különböző képernyőméretekhez és felhasználói állapotokhoz. Két fő fájlból áll:

1. `styles.ts`: Stílusdefiníciók és komponensek
2. `index.tsx`: A fejléc logikáját és megjelenítését tartalmazza

## Főbb Jellemzők

### 1. Komponens Struktúra

### `styles.ts`:

- **Styled Components**: CSS-in-JS megoldás a stílusozáshoz
- **Reszponzív tervezés**: Media query-k különböző képernyőméretekhez
- **Komponensek**:
    - `HeaderSection`: Fő fejléc konténer
    - `LogoContainer`: Logó és link kezelése
    - `Burger`: Mobilmenü ikon
    - `NotHidden`: Asztali navigáció
    - `CustomNavLinkSmall`: Navigációs linkek
    - `DrawerContent`: Mobilmenü tartalma

### `index.tsx`:

- **Feltételes renderelés**: Aktuális útvonal alapján
- **Dinamikus navigáció**: Különböző linkkészletek
- **Nyelvek váltása**: Kétnyelvű támogatás
- **Kijelentkezés**: Megerősítő dialógussal

### 2. Navigációs Linkek

### Fő linkek:

- `why-us`, `features`, `usage`, `content`: Főoldalon megjelenő szekciók

### Alkalmazás linkek:

- `/app/newTask`: Új feladat létrehozása
- `/app/profile`: Profil oldal
- `/app/admin/users`: Admin felület (csak adminoknak)

### Hitelesítési linkek:

- `/register`: Regisztráció
- `/login`: Bejelentkezés

### 3. Reszponzív Viselkedés

- **Asztali nézet**: Teljes navigációs sáv
- **Mobil nézet**: Hamburger menü
    - Két szekció: Navigációs linkek és alul a nyelvválasztó/kijelentkezés
- **Közepes méretű képernyők**: Központozott elrendezés

### 4. Nyelvi Támogatás

- **Kétnyelvű**: Angol (en) és magyar (hu)
- **Váltás**: Kattintással, lokal storage-ben tárolva
- **Ikonok**: Zászló ikonok a nyelvválasztáshoz

### 5. Fontos Metódusok

1. **`scrollTo`**:
    
    ```tsx
    const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setVisibility(false);
    };
    
    ```
    
    - Sima görgetés a megadott ID-hoz
2. **`handleChangeLanguage`**:
    
    ```tsx
    const handleChangeLanguage = (language: string) => {
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    };
    
    ```
    
    - Nyelv váltás és tárolás
3. **`handleLogoutClick`**:
    
    ```tsx
    const handleLogoutClick = () => {
      setIsModalVisible(true);
    };
    
    ```
    
    - Kijelentkezési dialógus megnyitása
4. **`handleConfirmLogout`**:
    
    ```tsx
    const handleConfirmLogout = () => {
      GlobalEntities.logout();
      setIsModalVisible(false);
      navigate("/");
      setVisibility(false);
    };
    
    ```
    
    - Kijelentkezés végrehajtása

### 6. Stílus Komponensek

1. **`HeaderSection`**:
    - Fő fejléc konténer
    - Padding és alap stílusok
2. **`LogoContainer`**:
    - Logó megjelenítése
    - Középre igazítás bizonyos képernyőméreteken
3. **`Burger`**:
    - Hamburger menü ikon
    - Csak mobilnézetben látható
4. **`NotHidden`**:
    - Asztali navigáció
    - Elrejtés mobilnézetben
5. **`CustomNavLinkSmall`**:
    - Navigációs linkek alapstílusa
    - Áttűnés és színváltás hover állapotban
6. **`DrawerContent`**:
    - Mobilmenü szerkezete
    - Flexbox elrendezés

## Fordítási Kulcsok

- `nav1-nav4`: Fő navigációs elemek
- `New Task Title`: Új feladat link
- `Profile Title`: Profil link
- `Get Started`: Regisztráció link
- `Sign In`: Bejelentkezés link
- `usermanagement`: Admin felület link
- `Log out Title`: Kijelentkezés gomb
- `Logout Modal Title`: Kijelentkezési dialógus címe
- `Logout Text`: Kijelentkezési megerősítés szövege
- `Logout Confirm`: Kijelentkezés gomb szövege
- `Logout Cancel`: Mégse gomb szövege
- `menu`: Mobilmenü címe

## Technológiai Megoldások

1. **Komponenskönyvtárak**:
    - styled-components: CSS-in-JS megoldás
    - Ant Design: Drawer és Modal komponensek
2. **Állapotkezelés**:
    - React useState hook
    - MobX globális állapot (GlobalEntities)
3. **Navigáció**:
    - React Router: useLocation, useNavigate
4. **Fordítás**:
    - react-i18next: Többnyelvű támogatás
5. **Reszponzív tervezés**:
    - Media query-k a styled-components-ben
    - Feltételes renderelés az aktuális útvonal alapján

## Biztonsági Megfontolások

- **Admin link**: Csak admin szerepkörű felhasználóknak jelenik meg
- **Kijelentkezés**: Megerősítő dialógus a véletlen kattintások elkerülésére
- **Hitelesítés**: Globális állapot kezelése a kijelentkezésnél
- **Nyelvek**: LocalStorage-ban tárolt nyelvi preferencia

Ez a fejléc komponens biztosítja az egységes navigációs élményt minden eszközön, miközben rugalmasan adaptálódik a felhasználói állapothoz és az alkalmazás aktuális szakaszához.

# Contact Komponens Dokumentáció

## Áttekintés

A `Contact` komponens egy kapcsolatfelvételi űrlapot valósít meg, amely tartalmaz egy információs blokkot és egy érvényesítéssel ellátott űrlapot. A komponens három fájlból áll:

1. `types.ts` - Típusdefiníciók
2. `styles.ts` - Stílusdefiníciók
3. `index.tsx` - A komponens fő logikája

## 1. types.ts

### Interfészek

### `ContactProps`

- **Cél**: A komponens fő props típusa
- **Tulajdonságok**:
    - `title`: A blokk címe (string)
    - `content`: A blokk tartalma (string)
    - `id`: A szekció azonosítója (string)
    - `t`: A react-i18next fordító függvénye (TFunction)

### `ValidationTypeProps`

- **Cél**: Hibavizsgálati típus definíciója
- **Tulajdonságok**:
    - `type`: A validálandó mező típusa (string)

## 2. styles.ts

### Stíluskomponensek

### `ContactContainer`

- **Cél**: A fő tároló elem stílusa
- **Tulajdonságok**:
    - `padding: 5rem 0` - Nagy függőleges padding
    - Reszponzív: Kisebb képernyőn `padding: 3rem 0`

### `FormGroup`

- **Cél**: Az űrlap konténerének stílusa
- **Tulajdonságok**:
    - `max-width: 520px` - Korlátozott szélesség
    - Reszponzív: Kisebb képernyőn teljes szélességű

### `Span`

- **Cél**: Hibaüzenetek stílusa
- **Tulajdonságok**:
    - `color: rgb(255, 130, 92)` - Jellegzetes narancsszín
    - `font-weight: 600` - Félkövér szöveg

### `ButtonContainer`

- **Cél**: Küldés gomb pozicionálása
- **Tulajdonságok**:
    - `text-align: end` - Jobbra igazítás
    - Reszponzív: Kisebb képernyőn `padding-top: 0.75rem`

## 3. index.tsx

### Főbb részek

### 1. Űrlapkezelés

- **Hook használat**: `useForm` egyéni hook a form állapotkezelésére
- **Validáció**: `validate` segédfüggvény a mezők ellenőrzéséhez
- **Mezők**:
    - Név (text input)
    - Email (text input)
    - Üzenet (textarea)

### 2. Validáció megjelenítése

- **Komponens**: `ValidationType` komponens a hibák megjelenítésére
- **Hibajelzés**: Narancsszínű szöveg a mezők alatt

### 3. Animációk

- **React Awesome Reveal**: `Slide` animációk a tartalom megjelenítéséhez
    - Balról csúszás az információs blokknak
    - Jobbról csúszás az űrlapnak

### 4. Reszponzív elrendezés

- **Ant Design Grid**: `Row` és `Col` komponensek
- **Elrendezés**:
    - Nagy képernyőn: 2 oszlop (információ + űrlap)
    - Kis képernyőn: 1 oszlop (egymás alatt)

### Fordítási támogatás

- A `submit` gomb szövege fordítható
- A komponens a `withTranslation()` HOC segítségével kapja meg a `t` fordító függvényt

### Használati példa

```jsx
<Contact
  id="contact"
  title="Contact Us"
  content="Feel free to reach out with any questions"
  t={t} // A react-i18next fordító függvénye
/>

```

## Fejlesztői megjegyzések

1. **Űrlap bővítése**:
    - Új mezők hozzáadásakor frissíteni kell a `validate` függvényt
    - Az új mezőt hozzá kell adni a `values` és `errors` objektumokhoz
2. **Stílus testreszabás**:
    - Színek módosíthatók a `styles.ts` fájlban
    - Padding/margin értékek állíthatók reszponzív breakpointokkal
3. **Animáció módosítás**:
    - A `Slide` komponens `direction` és `triggerOnce` propjai módosíthatók
    - További animációs beállítások érhetők el a react-awesome-reveal dokumentációjában
4. **Küldés logika**:
    - A `handleSubmit` függvényt lehet bővíteni a valódi API hívással
    - Siker/error állapot kezelése implementálható
5. **További nyelvi támogatás**:
    - Új fordítási kulcsok hozzáadhatók a nyelvi fájlokhoz
    - Placeholder szövegek is fordíthatóvá tehetők

Ez a kapcsolatfelvételi komponens egy átfogó megoldást kínál a felhasználói visszajelzések fogadására, modern animációkkal és reszponzív elrendezéssel, miközben támogatja a többnyelvűséget és a robosztus adatvalidációt.

# Tartalom Blokk Komponens (ContentBlock) Dokumentáció

## Áttekintés

A `ContentBlock` egy általános célú tartalmi blokk komponens, amely rugalmasan megjeleníthető balra vagy jobbra igazított elrendezésben. Három fő fájlból áll:

1. `types.ts`: Típusdefiníciók
2. `styles.ts`: Stíluskomponensek
3. `index.tsx`: A komponens logikája és megjelenítése

## Főbb Jellemzők

### 1. Komponens Struktúra

### `types.ts`:

- **ContentBlockProps**: A komponens props típusdefiníciója
    - `icon`: Fő ikon elérési útja
    - `title`: Fő cím fordítási kulcsa
    - `content`: Fő tartalom fordítási kulcsa
    - `section`: Alszekciók tömbje (bal oldali elrendezéshez)
    - `button`: Gombok tömbje (jobb oldali elrendezéshez)
    - `t`: Fordítási függvény
    - `id`: Egyedi azonosító
    - `direction`: "left" vagy "right" (elrendezés iránya)

### `styles.ts`:

- **ContentSection**: Fő tartalom szekció
- **Content**: Fő szövegtartalom stílusa
- **StyledRow**: Irányított sor (flex-direction alapján)
- **ContentWrapper**: Tartalom burkoló
- **ServiceWrapper**: Szolgáltatások burkolója
- **MinTitle**: Kis cím stílusa
- **MinPara**: Kis bekezdés stílusa
- **ButtonWrapper**: Gombok burkolója

### `index.tsx`:

- **Fade animáció**: React-awesome-reveal könyvtár
- **Reszponzív elrendezés**: Ant Design Grid (Row, Col)
- **Dinamikus tartalom**: Irány alapján változó megjelenítés
- **Görgetés funkció**: ID alapján sima görgetés

### 2. Funkcionalitás

### Bal oldali elrendezés (`direction="left"`):

- Fő ikon bal oldalon
- Tartalom jobb oldalon
- Szolgáltatások listája (ha van megadva)
    - Ikon
    - Cím
    - Rövid leírás

### Jobb oldali elrendezés (`direction="right"`):

- Fő ikon jobb oldalon
- Tartalom bal oldalon
- Gombok (ha vannak megadva)
    - Szín testreszabható
    - Kattintásra görgetés vagy navigáció

### 3. Reszponzív Viselkedés

- **Asztali nézet**: 2 oszlopos elrendezés
- **Tablet nézet**: Átrendeződés
- **Mobil nézet**: Függőleges elrendezés, ikon felül
- **Media query-k**: 1024px, 575px töréspontok

### 4. Stílus Komponensek

1. **`ContentSection`**:
    - Fő konténer padding és pozicionálás
    - Nagyobb padding mobilnézetben
2. **`StyledRow`**:
    - Flex irányítás a `direction` prop alapján
    - `row` vagy `row-reverse`
3. **`ContentWrapper`**:
    - Max-width korlátozás
    - Mobilnézetben extra padding
4. **`ButtonWrapper`**:
    - Gombok elrendezése
    - Szélesség korlátozás asztali nézetben
5. **`ServiceWrapper`**:
    - Szolgáltatások elrendezése
    - Térközök kezelése

### 5. Fontos Metódusok

1. **`scrollTo`**:
    
    ```tsx
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
    };
    
    ```
    
    - Sima görgetés a megadott ID-hoz

## Használati Példa

```jsx
<ContentBlock
  direction="right"
  title="AboutTitle"
  content="AboutText"
  icon="about.svg"
  id="about"
  button={[
    {
      title: "LearnMore",
      redirect: "features"
    },
    {
      title: "ContactUs",
      redirect: "contact",
      color: "#FF824B"
    }
  ]}
  t={t}
/>

```

## Technológiai Megoldások

1. **Komponenskönyvtárak**:
    - styled-components: CSS-in-JS megoldás
    - Ant Design: Grid rendszer (Row, Col)
    - react-awesome-reveal: Animációk
2. **Fordítás**:
    - react-i18next: Többnyelvű támogatás
    - `t` függvény prop-ként átadva
3. **Reszponzív tervezés**:
    - Ant Design reszponzív grid
    - Media query-k a styled-components-ben
4. **Típusbiztonság**:
    - TypeScript interfészek
    - Kötelező és opcionális prop-ok definiálva

## Optimalizálási Lehetőségek

1. **Lazy loading**:
    - Ikonok dinamikus betöltése
    - Fade animáció csak első megjelenéskor
2. **Memoizálás**:
    - Komponens memoizálása a prop-ok változásainak csökkentésére
3. **Accessibility**:
    - ARIA címkék hozzáadása
    - Fókusz kezelés a gomboknál

Ez a tartalom blokk komponens kiválóan alkalmas különböző tartalmak strukturált megjelenítésére, miközben rugalmasságot biztosít a dizájn és a tartalom tekintetében. A reszponzív tervezés és az animációk gazdagabb felhasználói élményt nyújtanak.

# MiddleBlock Komponens Dokumentáció

## Áttekintés

A `MiddleBlock` egy általános célú tartalomblokk komponens, amely középre igazított tartalmat jelenít meg szöveggel és opcionális gombbal. Főleg landing page-eken és marketing tartalmakban használatos.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Funkcionális komponens**: React hooks használatával
- **Külső függőségek**:
    - `antd` (Row, Col komponensek)
    - `react-awesome-reveal` (animációk)
    - `react-i18next` (fordítás)
    - `react-router-dom` (navigáció)

### 2. Props-ok

| Prop | Típus | Leírás |
| --- | --- | --- |
| title | string | A blokk főcíme (fordítási kulcs) |
| content | string | A fő tartalmi szöveg (fordítási kulcs) |
| button | string | Opcionális gomb szövege (fordítási kulcs, ha nincs, nem jelenik meg) |
| t | TFunction | Fordítási függvény a react-i18next-ből |
| id | string | DOM ID a szekcióhoz, scrollozáshoz használható |

### 3. Stílusosztályok

- **MiddleBlockSection**: A fő konténer stílusai
    - Középre igazított, reszponzív padding
    - Flexbox alapú elrendezés
- **Content**: A tartalmi szöveg stílusai
    - Felső és alsó padding
- **ContentWrapper**: A tartalom burkoló eleme
    - Max-width korlátozás (570px)
    - Teljes szélesség mobilon

### 4. Funkcionalitás

1. **Animált megjelenés**:
    - Slide animáció felfelé (`react-awesome-reveal`)
    - Egyszeri triggerelés (`triggerOnce`)
2. **Reszponzív design**:
    - Különböző padding értékek asztali és mobilos nézetekben
    - Teljes szélességű tartalom mobilon
3. **Navigáció**:
    - Gombra kattintás a `/register` oldalra navigál
    - `useNavigate` hook a navigációhoz
4. **Fordítás**:
    - Minden szöveg fordítható a `react-i18next` segítségével
    - `withTranslation` HOC használata

## Technikai Megvalósítás

### 1. Fontos Metódusok

1. **scrollTo**:
    
    ```tsx
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
    };
    
    ```
    
    - Sima scrollozást biztosít a megadott ID-hoz
2. **Gomb eseménykezelő**:
    
    ```tsx
    <Button name="submit" onClick={() => navigate("/register")}>
      {t(button)}
    </Button>
    
    ```
    
    - A gomb a regisztrációs oldalra navigál

### 2. Reszponzív Tulajdonságok

- **Asztali nézet**:
    - Padding: 7.5rem felül, 3rem alul
    - Max-width: 570px a tartalomnak
- **Tablet nézet (max-width: 1024px)**:
    - Padding: 5.5rem felül, 3rem alul
- **Mobil nézet (max-width: 768px)**:
    - Tartalom teljes szélességű

### 3. Layout

- **antd Grid rendszer**:
    - Row és Col komponensek a tartalom elrendezéséhez
    - Mindig 24 oszlop teljes szélességben (lg, md, sm, xs)

## Használati Példa

```tsx
<MiddleBlock
  title="landing.middleBlock.title"
  content="landing.middleBlock.text"
  button="landing.middleBlock.button"
  id="middleblock"
  t={t}
/>

```

## Fejlesztői Megjegyzések

1. **Testreszabási lehetőségek**:
    - A stílusokat könnyen módosíthatjuk a `styles.tsx` fájlban
    - Animáció típusa változtatható a Slide komponens paramétereivel
2. **Optimalizálási lehetőségek**:
    - Lazy loading a react-awesome-reveal komponensnek
    - Memoizáció a gyakori újrarenderelések elkerülésére
3. **Kiterjesztési lehetőségek**:
    - További props-ok hozzáadása a gomb viselkedésének testreszabásához
    - Többféle tartalmi elem támogatása (pl. ikonok, képek)

Ez a komponens egy rugalmas és újrafelhasználható megoldást kínál középre igazított tartalmi blokkok létrehozásához, animációval és reszponzív viselkedéssel.

# CreateCategoryDialog Komponens Dokumentáció

## Áttekintés

A `CreateCategoryDialog` egy MUI-alapú dialógusablak komponens, amely új kategória létrehozását teszi lehetővé. A komponens Formik-et használ az űrlapkezeléshez és Yup-ot a validációhoz, valamint tartalmaz profanity filtert a nemkívánatos szavak kiszűrésére.

## Főbb Jellemzők

### 1. Komponens Struktúra

- **Observer komponens**: MobX observer wrapperrel ellátva
- **Funkcionális komponens**: React hooks használatával
- **Külső függőségek**:
    - `@mui/material` (UI komponensek)
    - `formik` (űrlapkezelés)
    - `yup` (validáció)
    - `bad-words` (profanity filter)
    - `react-i18next` (fordítás)

### 2. Props-ok

| Prop | Típus | Leírás |
| --- | --- | --- |
| open | boolean | A dialógus láthatóságát szabályozza |
| onClose | () => void | Callback, amely a dialógus bezárásakor hívódik |
| onCreate | (name: string) => Promise | Callback, amely az új kategória létrehozásakor hívódik (async) |

### 3. Validációs Szabályok

A kategória névre vonatkozó validációk:

1. **Kötelező mező**: `Yup.string().required()`
2. **Nagybetűvel kezdődik**: `.test("capitalized")`
3. **Nem tartalmaz tiltott szavakat**: `.test("no-bad-words")` (bad-words filter)

### 4. Fordítási Kulcsok

- `AddNewCategory`: Dialógus címe
- `CategoryName`: Input mező labelje
- `Cancel`: Mégse gomb szövege
- `Add`: Létrehozás gomb szövege
- `RequiredField`: Kötelező mező validációs hiba
- `MustStartWithCapital`: Nagybetűvel kezdődik validációs hiba
- `NoInappropriateWords`: Tiltott szavak validációs hiba

## Technikai Megvalósítás

### 1. Főbb Komponensek

1. **MUI Dialog**:
    - `Dialog`: Fő konténer
    - `DialogTitle`: Címsor
    - `DialogContent`: Tartalmi rész
    - `DialogActions`: Gombok konténere
2. **Formik űrlap**:
    - Kezdeti érték: `{ name: "" }`
    - Validációs séma: `validationSchema`
    - Submit handler: `onSubmit` callback
3. **Input mező**:
    - MUI `TextField`
    - Formik `Field` komponenssel integrálva
    - Hibamegjelenítés: `error` és `helperText` props-ok

### 2. Fontos Metódusok

1. **onSubmit handler**:
    
    ```tsx
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      try {
        await onCreate(values.name);
        resetForm();
        onClose();
      } finally {
        setSubmitting(false);
      }
    }}
    
    ```
    
    - Meghívja a külső `onCreate` callbacket
    - Reseteli az űrlapot és bezárja a dialógust
    - Kezeli a submit állapotot
2. **Validációs séma**:
    
    ```tsx
    Yup.object().shape({
      name: Yup.string()
        .required(t("RequiredField"))
        .test("capitalized", t("MustStartWithCapital"), (value) => {
          return value ? value[0] === value[0].toUpperCase() : false;
        })
        .test("no-bad-words", t("NoInappropriateWords"), (value) => {
          return !filter.isProfane(value || "");
        }),
    });
    
    ```
    
    - 3 szintű validációt implementál

### 3. Stílusosztályok

- **Input focus stílus**:
    
    ```tsx
    sx={{
      "& input:focus-within, & textarea:focus-within": {
        boxShadow: "none",
        background: "none",
      },
    }}
    
    ```
    
    - Eltávolítja az alapértelmezett focus stílusokat

## Használati Példa

```tsx
const [open, setOpen] = useState(false);

const handleCreate = async (name: string) => {
  // Kategória létrehozási logika
};

return (
  <CreateCategoryDialog
    open={open}
    onClose={() => setOpen(false)}
    onCreate={handleCreate}
  />
);

```

## Fejlesztői Megjegyzések

1. **Testreszabási lehetőségek**:
    - A validációs szabályok könnyen bővíthetők
    - További mezők hozzáadhatók az űrlaphoz
2. **Optimalizálási lehetőségek**:
    - Memoizáció a gyakori újrarenderelések elkerülésére
    - Lazy loading a bad-words könyvtárnak
3. **Kiterjesztési lehetőségek**:
    - További validációs szabályok hozzáadása
    - Kategória leírás mező hozzáadása
    - Szín vagy ikon választó hozzáadása

Ez a komponens egy robusztus megoldást kínál új kategóriák létrehozásához, erős validációval és felhasználóbarát felülettel. A Material UI komponensek használata biztosítja a konzisztens megjelenést az alkalmazás többi részével.

# Form Rendszer Dokumentáció

## Áttekintés

A dokumentációban szereplő komponensek egy átfogó form kezelő rendszert alkotnak, amely a következő fő részekből áll:

- Input komponensek (szövegmező, textarea)
- Validációs logika
- Űrlap állapotkezelés
- Külső komponensek (ikonok, testreszabott MUI elemek)

## Főbb Komponensek és Funkciók

### 1. Input Komponens (`Input`)

### Jellemzők:

- **Fordítás támogatás**: `react-i18next` integráció
- **Props**:
    - `name`: Mező azonosító és címke forrás
    - `placeholder`: Helykitöltő szöveg
    - `onChange`: Change eseménykezelő
    - `t`: Fordítási függvény
- **Stílus**: Külső CSS-in-JS megoldás (`styled-components`)

### Használat:

```tsx
<Input
  name="username"
  placeholder="Enter your username"
  onChange={handleChange}
  t={t}
/>

```

### 2. TextArea Komponens

### Jellemzők:

- **Alapvető funkciók**: Megegyezik az Input komponenssel
- **Különbségek**:
    - Többsoros szövegbevitel
    - Fix magasság (185px)
    - Manuális átméretezés letiltva (`resize: none`)

### 3. Validációs Rendszer (`validationRules.ts`)

### Funkciók:

- Kötelező mezők ellenőrzése
- Email formátum validáció (regex alapján)
- Hibák fordítási kulcsokkal
- Típusos validáció (`validateProps` interface)

### Példa validációs szabály:

```tsx
if (!values.email) {
  errors.email = i18next.t("Email Error1");
} else if (!/\\S+@\\S+\\.\\S+/.test(values.email)) {
  errors.email = i18next.t("Email Error2");
}

```

### 4. Űrlap Kezelés Hook (`useForm.tsx`)

### Főbb funkciók:

- Állapotkezelés (`useState`)
- Change eseménykezelő (`handleChange`)
- Submit logika (`handleSubmit`)
- API kommunikáció (`GlobalApiHandlerInstance`)
- Értesítések (`antd` notification)

### Fontos metódusok:

```tsx
const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
  // Validáció, API hívás, visszajelzés
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // Érték frissítése és hiba törlése
};

```

### 5. Segéd Komponensek

### SvgIcon:

- Egyszerű SVG megjelenítő
- Props: `src`, `width`, `height`
- Automatikus alt szöveg (forrásfájl név)

### Testreszabott MUI komponensek:

- `StyledTextField`: Átszabott fókusz stílus
- `StyledAutocomplete`: Kategória választó speciális stílusokkal

## Típusdefiníciók (`types.ts`)

### Főbb interfészek:

1. **InputProps**:
    - Az alap input komponensek által használt propsok
    - Kötelező: `name`, `placeholder`, `onChange`, `t`
    - Opcionális: `type`, `value`
2. **validateProps**:
    - Validálandó mezők típusai
    - `name`, `email`, `message`
3. **Egyéb segéd típusok**:
    - `ContainerProps`, `ButtonProps`, `SvgIconProps`

## Stíluskezelés (`styles.tsx`)

### Főbb stílus komponensek:

1. **Általános konténer**:
    - Teljes szélességű
    - Reszponzív padding
2. **TextArea stílusok**:
    - Fix magasság
    - Átméretezés letiltva
    - Alapértelmezett betűméret
3. **Label stílus**:
    - Blokk szintű megjelenítés
    - Kisbetűsítés eltávolítása (`text-transform: capitalize`)

## Integrációs Pontok

1. **Fordítás**:
    - Minden komponens képes fordítani a `react-i18next` segítségével
    - Kulcsok: pl. "Name Error", "Email Error1", "Notification Success Title"
2. **API Kommunikáció**:
    - `GlobalApiHandlerInstance` használata HTTP kérésekhez
    - Alapértelmezett fejlécek: `Content-Type` és `Accept`
3. **Állapotkezelés**:
    - Lokális állapot (`useState`) az űrlap adatokhoz
    - Validációs hibák kezelése

## Használati Példa (Teljes Űrlap)

```tsx
import { useForm } from "./useForm";
import validate from "./validationRules";
import { Input, TextArea } from "./components";

const ContactForm = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(validate);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Enter your name"
        onChange={handleChange}
        value={values.name}
      />
      {errors.name && <span>{errors.name}</span>}

      <TextArea
        name="message"
        placeholder="Enter your message"
        onChange={handleChange}
        value={values.message}
      />
      {errors.message && <span>{errors.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

```

## Fejlesztői Megjegyzések

1. **Kiterjesztési lehetőségek**:
    - Új mezőtípusok hozzáadása
    - Komplexebb validációs szabályok
    - Debounce a change eseményekhez
2. **Optimalizálás**:
    - Memoizáció a gyakori újrarenderelések csökkentésére
    - Lazy loading a fordítási erőforrásoknak
3. **Testreszabás**:
    - Stílusok módosítása a `styles.tsx` fájlban
    - Új validációs szabályok a `validationRules.ts`ben

Ez a rendszer egy átfogó megoldást kínál űrlapok kezelésére, validációjára és küldésére, modern React technológiák és könyvtárak felhasználásával.

# UI Komponens Könyvtár Dokumentáció

## Áttekintés

Ez a dokumentáció a UI komponens könyvtár fő elemeit mutatja be, amelyek reszponzív webalkalmazások fejlesztéséhez használhatók. A könyvtár a következő fő komponenseket tartalmazza:

## 1. ScrollToTop Komponens

### Funkcionalitás:

- **Görgetés észlelése**: Megjelenik, ha a felhasználó 350px-t lejjebb görget
- **Animált megjelenés**: Lágy átmenet a megjelenés/eltűnés között
- **Kattintásra görgés**: Sima animációval visszagörget az oldal tetejére

### Technikai részletek:

```tsx
const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.scrollY > 350) setShowScroll(true);
    else if (window.scrollY <= 350) setShowScroll(false);
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  const scrollUp = () => {
    document.getElementById("intro")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <ScrollUpContainer onClick={scrollUp} show={showScroll}>
      <SvgIcon src="scroll-top.svg" width="20px" height="20px" />
    </ScrollUpContainer>
  );
};

```

### Stílusok:

- Fix pozícionálás jobb alsó sarokban
- Hover effektus
- Reszponzív eltűnés (1240px alatt)

## 2. Input Komponens

### Főbb jellemzők:

- **Fordítás támogatás**: Címke és placeholder fordítása
- **Egyszerű használat**: Minimális props-okkal működik
- **Reszponzív design**: Teljes szélességű konténer

### Implementáció:

```tsx
const Input = ({ name, placeholder, onChange, t }: InputProps) => (
  <Container>
    <Label htmlFor={name}>{t(name)}</Label>
    <StyledInput
      placeholder={t(placeholder)}
      name={name}
      id={name}
      onChange={onChange}
    />
  </Container>
);

```

### Stílusok:

- 100%-os szélesség
- Egységes padding
- Alapértelmezett betűméret (0.875rem)

## 3. EmptyMessage Komponens

### Célja:

- Üres állapotok megjelenítése
- Informatív üzenetek formázása

### Használat:

```tsx
<EmptyMessage message="Nincsenek megjeleníthető elemek" />

```

### Jellemzők:

- Szürke szövegszín
- Dőlt betűstílus
- Chakra UI alapú implementáció

## 4. Container Komponens

### Főbb funkciók:

- **Tartalom középre igazítása**: Max-width 1200px
- **Reszponzív padding**: Különböző képernyőméretekhez
- **Opcionális border**: Felső szegély

### Stílusok:

```tsx
export const StyledContainer = styled("div")<{
  border?: boolean;
}>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px;
  border-top: ${(p) => (p.border ? "1px solid #CDD1D4" : "")};

  @media (max-width: 1024px) {
    max-width: calc(100% - 68px);
    padding: 0 30px;
  }
  // További media query-k...
`;

```

## 5. Button Komponens

### Design elemek:

- **Átlátszó háttér**: Alapértelmezett szín: #2e186a
- **Hover effekt**: Narancssárga háttérszín
- **Árnyék effekt**: Soft shadow
- **Animáció**: Sima átmenet hover állapotok között

### Használat:

```tsx
<Button color="#ff0000" onClick={handleClick}>
  Kattints ide
</Button>

```

### Stílusok:

- Fix magasság (13px padding)
- Kerekített sarkok (4px)
- Max-width 180px

## Közös Jellemzők

1. **Fordítás támogatás**:
    - Minden szöveges elem fordítása `react-i18next` segítségével
    - `t` függvény átadása komponenseknek
2. **Reszponzív design**:
    - Media query-k minden fontos komponensben
    - Rugalmas méretezés
3. **Típusbiztonság**:
    - TypeScript interfészek minden komponenshez
    - Kötelező és opcionális props-ok definiálva
4. **Stíluskezelés**:
    - `styled-components` használata
    - Dinamikus stílusok props alapján

## Használati Példa (Teljes Oldal)

```tsx
import { Container, Input, Button, ScrollToTop } from "ui-components";

const App = () => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  return (
    <Container border>
      <h1>{t("welcome")}</h1>

      <Input
        name="username"
        placeholder="enter_username"
        onChange={(e) => setValue(e.target.value)}
        t={t}
      />

      <Button onClick={() => alert(value)}>
        {t("submit")}
      </Button>

      <ScrollToTop />
    </Container>
  );
};

```

## Fejlesztői Megjegyzések

1. **Testreszabás**:
    - Színek könnyen módosíthatók a stílus fájlokban
    - Animációk sebessége állítható
2. **Kiterjesztés**:
    - Új komponensek hozzáadása egységes mintára
    - További props-ok hozzáadása a meglévő komponensekhez
3. **Optimalizálás**:
    - Memoizáció a gyakran használt komponenseknél
    - Lazy loading a nagyobb komponenseknek

Ez a komponens könyvtár egy átfogó megoldást kínál modern webalkalmazások fejlesztéséhez, egységes design nyelvvel és reszponzív viselkedéssel.

# Adatbázis Migrációs Fájlok Dokumentáció

## Áttekintés

Az alkalmazás Laravel migrációs fájlokkal kezeli az adatbázis struktúrát. Minden migráció egy adott tábla létrehozásáról vagy módosításáról szól. Az alábbi dokumentáció áttekintést nyújt a főbb táblákról és kapcsolataikról.

## Főbb Táblák

### 1. Felhasználók (users)

*Alapértelmezett Laravel users tábla, nincs migrációban*

### 2. Feladatok (tasks)

```php
Schema::create('tasks', function (Blueprint $table) {
    $table->id();
    $table->string("description", 255)->nullable();
    $table->dateTime("due_date",0)->nullable();
    $table->integer("priority");
    $table->string("status", 15);
    $table->foreignId("user_id")->constrained()->onDelete("cascade");
    $table->foreignId("category_id")->constrained()->onDelete("cascade");
});

```

**Későbbi módosítás:**

```php
Schema::table('tasks', function (Blueprint $table) {
    $table->string("title", 50); // 2025_03_24_150048_add_title_to_tasks.php
});

```

**Mezők:**

- `id`: Egyedi azonosító
- `title`: Feladat címe (50 karakter)
- `description`: Leírás (255 karakter, opcionális)
- `due_date`: Határidő (opcionális)
- `priority`: Prioritás (egész szám)
- `status`: Állapot (15 karakter)
- `user_id`: Létrehozó felhasználó (külső kulcs)
- `category_id`: Kategória (külső kulcs)

### 3. Kategóriák (categories)

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->string('category_name', 25);
    $table->string('lang', 2);
    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
});

```

**Mezők:**

- `id`: Egyedi azonosító
- `user_id`: Tulajdonos felhasználó (külső kulcs)
- `category_name`: Kategória neve (25 karakter)
- `lang`: Nyelv kód (2 karakter)

### 4. Ütemezések (schedules)

```php
Schema::create('schedules', function (Blueprint $table) {
    $table->id();
    $table->string("name",255);
    $table->time("period_of_time");
    $table->dateTime("deadline");
    $table->text("description");
    $table->unsignedBigInteger("user_id");
    $table->unsignedBigInteger("task_id");
    $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
    $table->foreign("task_id")->references("id")->on("tasks")->onDelete("cascade");
    $table->timestamps();
});

```

**Mezők:**

- `id`: Egyedi azonosító
- `name`: Név (255 karakter)
- `period_of_time`: Időtartam
- `deadline`: Határidő
- `description`: Leírás
- `user_id`: Felhasználó (külső kulcs)
- `task_id`: Kapcsolódó feladat (külső kulcs)

### 5. Kapcsolótáblák

### Felhasználó-Feladat (users_tasks)

```php
Schema::create('users_tasks', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('task_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});

```

### Feladat-Ütemezés (task_schedule)

```php
Schema::create('task_schedule', function (Blueprint $table) {
    $table->foreignId("task_id");
    $table->foreignId("schedule_id");
    $table->primary(["task_id", "schedule_id"]);
});

```

### Felhasználó-Felhasználó (users_users)

```php
Schema::create('users_users', function (Blueprint $table) {
    $table->id();
    $table->foreignId('owner_id')->constrained("users")->onDelete('cascade');
    $table->foreignId('guest_id')->constrained("users")->onDelete('cascade');
    $table->timestamps();
});

```

### 6. Egyéb Táblák

### Personal Access Tokens

```php
Schema::create('personal_access_tokens', function (Blueprint $table) {
    $table->id();
    $table->morphs('tokenable');
    $table->string('name');
    $table->string('token', 64)->unique();
    $table->text('abilities')->nullable();
    $table->timestamp('last_used_at')->nullable();
    $table->timestamp('expires_at')->nullable();
    $table->timestamps();
});

```

### User Roles (Üres keret)

```php
Schema::create('user_roles', function (Blueprint $table) {
    $table->id();
    $table->timestamps();
});

```

## Kapcsolatok

1. **Felhasználó (users) kapcsolatai**:
    - 1-N kapcsolat a kategóriákkal (categories)
    - 1-N kapcsolat a feladatokkal (tasks)
    - 1-N kapcsolat az ütemezésekkel (schedules)
    - N-M kapcsolat más felhasználókkal (users_users)
    - N-M kapcsolat a feladatokkal (users_tasks)
2. **Feladat (tasks) kapcsolatai**:
    - N-1 kapcsolat a kategóriákkal (categories)
    - N-M kapcsolat az ütemezésekkel (task_schedule)
    - N-M kapcsolat a felhasználókkal (users_tasks)
3. **Ütemezés (schedules) kapcsolatai**:
    - N-1 kapcsolat a felhasználókkal (users)
    - N-M kapcsolat a feladatokkal (task_schedule)

## Fontos Megjegyzések

1. **Törlési viselkedés**: Minden külső kulcs `onDelete('cascade')` beállítással rendelkezik, ami azt jelenti, hogy a szülő rekord törlésekor a gyermek rekordok is törlődnek.
2. **Időbélyegek**: A legtöbb tábla tartalmaz `timestamps()` mezőket (created_at, updated_at).
3. **Nyelvi támogatás**: A kategóriáknak van nyelvi azonosítója (`lang` mező).
4. **Későbbi módosítások**: A feladatokhoz később került be a `title` mező egy külön migrációval.
5. **Jogosultságkezelés**: A `user_roles` tábla jelenleg üres keret, később bővíthető szerepkörökkel.

Ez az adatbázis struktúra támogatja a feladatok kezelését, ütemezését, kategorizálását, valamint a felhasználók közötti együttműködést a feladatokon.

# Users Tábla Migrációs Fájl Dokumentáció

## Áttekintés

Ez a migrációs fájl a Laravel rendszerben három fontos tábla létrehozását valósítja meg:

1. **users** - Felhasználói adatok tárolása
2. **password_reset_tokens** - Jelszó-visszaállító tokenek
3. **sessions** - Felhasználói munkamenetek

## 1. Users Tábla Szerkezete

### Mezők és jellemzőik:

| Mező neve | Típus | Kötelező | Egyedi | Alapérték | Leírás |
| --- | --- | --- | --- | --- | --- |
| id | bigIncrements | Igen | Igen | - | Autó növekményes elsődleges kulcs |
| name | string(255) | Igen | Nem | - | Felhasználó teljes neve |
| email | string(255) | Igen | Igen | - | Felhasználó email címe |
| password | string(255) | Igen | Nem | - | Titkosított jelszó |
| role | string(50) | Nem | Nem | 'user' | Felhasználó szerepköre |
| password_reset_token | string(255) | Nem | Nem | NULL | Jelszó-visszaállító token |
| password_reset_token_created_at | timestamp | Nem | Nem | NULL | Token létrehozásának ideje |
| created_at | timestamp | Nem | Nem | - | Rekord létrehozási ideje |
| updated_at | timestamp | Nem | Nem | - | Rekord módosítási ideje |

### Fontos megjegyzések:

- Az email mező egyedi indexsel rendelkezik (`>unique()`)
- A role mező alapértelmezett értéke 'user'
- Jelszó-visszaállító token mezők opcionálisak (`nullable`)

## 2. Password Reset Tokens Tábla

### Mezők és jellemzőik:

| Mező neve | Típus | Kötelező | Egyedi | Leírás |
| --- | --- | --- | --- | --- |
| email | string | Igen | Igen | Elsődleges kulcs, user email |
| token | string | Igen | Nem | Jelszó-visszaállító token |
| created_at | timestamp | Nem | Nem | Token létrehozásának ideje |

## 3. Sessions Tábla

### Mezők és jellemzőik:

| Mező neve | Típus | Kötelező | Leírás |
| --- | --- | --- | --- |
| id | string | Igen | Munkamenet azonosító (PK) |
| user_id | foreignId | Nem | Kapcsolat a users táblával |
| ip_address | string(45) | Nem | Felhasználó IP címe |
| user_agent | text | Nem | Böngésző adatok |
| payload | longText | Igen | Munkamenet adatok |
| last_activity | integer | Igen | Utolsó aktivitás időbélyege |

## Migrációs Műveletek

### `up()` metódus:

1. Létrehozza a `users` táblát a mezőkkel
2. Létrehozza a `password_reset_tokens` táblát
3. Létrehozza a `sessions` táblát

### `down()` metódus:

1. Eldobja a `users` táblát
2. Eldobja a `password_reset_tokens` táblát
3. Eldobja a `sessions` táblát

## Biztonsági Megfontolások

1. **Jelszó tárolás**: A password mezőben csak titkosított jelszó kerül tárolásra (Laravel Hash)
2. **Token kezelés**: A jelszó-visszaállító tokenek külön táblában vannak
3. **Munkamenet adatok**: A sessions tábla biztonságosan tárolja a bejelentkezési adatokat

## Használati Példa (Laravel)

```php
// Felhasználó létrehozása
User::create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => Hash::make('secret123'),
    'role' => 'admin'
]);

// Jelszó-visszaállító token generálása
PasswordResetToken::create([
    'email' => 'john@example.com',
    'token' => Str::random(60),
    'created_at' => now()
]);

```

## Fejlesztői Megjegyzések

1. **Kiterjesztési lehetőségek**:
    - További mezők hozzáadása a users táblához (pl. phone, address)
    - Kapcsoló táblák létrehozása a szerepkörökhöz
2. **Optimalizálás**:
    - Indexek hozzáadása a gyakran lekérdezett mezőkhöz
    - Nagyobb string hossz biztosítása speciális esetekre
3. **Kompatibilitás**:
    - A migráció kompatibilis a Laravel alap authentication rendszerével
    - A sessions tábla támogatja a file/database alapú munkamenet kezelést

Ez a migrációs fájl egy átfogó felhasználókezelési rendszer alapjait rakja le, amely készen áll a Laravel beépített hitelesítési rendszereivel való használatra.

# Adatbázis Seederek Dokumentáció

## Áttekintés

Ez a dokumentáció a Laravel rendszerben használt adatbázis seedereket mutatja be, amelyek a fejlesztési és tesztelési környezetben használható alapadatokkal töltik fel az adatbázist.

## 1. Fő Seederek

### DatabaseSeeder

- **Funkció**: Koordinálja az összes seeder futását
- **Meghívott seederek**:
    - UserSeeder
    - CategorySeeder
    - TaskSeeder
    - SchedulesSedder
- **Fontos**:
    
    ```php
    $this->call([
        UserSeeder::class,
        CategorySeeder::class,
        TaskSeeder::class,
        SchedulesSedder::class,
    ]);
    
    ```
    

## 2. Felhasználó Seederek (UserSeeder)

### Létrehozott felhasználók:

1. **Admin felhasználó**
    - Email: [admin@admin.com](mailto:admin@admin.com)
    - Jelszó: admin1234 (titkosítva)
    - Név: admin
    - Szerepkör: admin
2. **Alap felhasználó**
    - Email: [user@user.com](mailto:user@user.com)
    - Jelszó: user1234 (titkosítva)
    - Név: user
    - Szerepkör: user (alapértelmezett)

### Technikai részletek:

- `updateOrCreate` használata duplikáció elkerülésére
- Jelszó titkosítás `Hash::make` segítségével
- Alapértelmezett szerepkör beállítás

## 3. Kategória Seederek (CategorySeeder)

### Létrehozott kategóriák:

- **Magyar (hu)** és **Angol (en)** nyelvű kategóriák
- 10-10 kategória mindkét nyelven
- Példák:
    - Tanulás / Learning
    - Házi feladat / Homework
    - Projektmunka / Project work

### Technikai részletek:

- Direkt DB insertálás `DB::table` segítségével
- Fix ID-k használata a relációkhoz
- Minden kategória az 1-es ID-jú felhasználóhoz kapcsolódik

## 4. Feladat Seederek (TaskSeeder)

### Létrehozott feladatok:

1. **3 teszt feladat** mind az 1-es ID-jú felhasználóhoz
2. Közös tulajdonságok:
    - Priority: 10
    - Status: "new"
    - Title: "Feladat neve"
    - Description: "Feladat leirasa"

### Egyedi tulajdonságok:

- Különböző határidők (2025 április)
- Különböző kategória ID-k (5, 6, 7)

## 5. Ütemezés Seederek (SchedulesSedder)

### Létrehozott ütemezés:

1. **Sample Schedule**
    - Időtartam: 1 óra
    - Határidő: 2030-01-01
    - Leírás: "Sample description"
    - Kapcsolódó feladat: 1-es ID
    - Felhasználó: 1-es ID

## Futtatási Sorrend

1. **UserSeeder**: Létrehozza a felhasználókat
2. **CategorySeeder**: Létrehozza a kategóriákat
3. **TaskSeeder**: Létrehozza a feladatokat (használja a kategóriákat)
4. **SchedulesSedder**: Létrehozza az ütemezéseket (használja a feladatokat)

## Használati Utasítás

1. Migrálás és seedelés együtt:
    
    ```bash
    php artisan migrate --seed
    
    ```
    
2. Csak seedelés (migrálás után):
    
    ```bash
    php artisan db:seed
    
    ```
    
3. Konkrét seeder futtatása:
    
    ```bash
    php artisan db:seed --class=UserSeeder
    
    ```
    

## Fejlesztői Megjegyzések

1. **Biztonság**:
    - Éles környezetben módosítsd a jelszavakat!
    - Ne használd ezeket a jelszavakat éles rendszerben
2. **Testreszabás**:
    - A factory-k használatával dinamikus adatgenerálás
    - További tesztadatok hozzáadása
3. **Relációk**:
    - A seederek között erős relációk vannak (fix ID-k)
    - Fontos a megfelelő futtatási sorrend
4. **Nyelvezet**:
    - A kategóriák kétnyelvűek (hu/en)
    - Könnyen bővíthető további nyelvekkel

Ez a seeder rendszer egy átfogó alapot biztosít az alkalmazás fejlesztéséhez és teszteléséhez, valósághű adatokkal és logikus relációkkal.

# Email Sablonok Dokumentáció

## Áttekintés

Az alkalmazás többféle email sablont használ különböző eseményekhez (regisztráció, jelszó-visszaállítás, kapcsolatfelvétel). Minden sablon kétnyelvű (magyar és angol) és reszponzív designnal rendelkezik.

## Főbb Sablonok

### 1. Teszt Email (test.blade.php)

```html
<h1>Helló!</h1>
<p>Ez egy teszt email Laravelből, Mailcatcherrel küldve.</p>

```

**Felhasználás**:

- Fejlesztési és tesztelési célokra
- Egyszerű formázás, nincs kétnyelvűség

---

### 2. Regisztráció (registration.blade.php)

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>CheckItOut - Regisztráció</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>🎉 Sikeres regisztráció!</h2>
    <p>Kedves Felhasználó!</p>
    <p>Köszönjük, hogy regisztráltál a <strong>CheckItOut</strong> rendszerbe.</p>
    <p>Most már teljes hozzáférésed van az alkalmazás funkcióihoz.</p>

    <hr>

    <h2>🎉 Successful registration!</h2>
    <p>Dear user,</p>
    <p>Thank you for registering with <strong>CheckItOut</strong>.</p>
    <p>You now have full access to all application features.</p>

    <br><br>
    <p>Üdvözlettel / Best regards,<br><strong>CheckItOut csapat / team</strong></p>
</body>
</html>

```

**Jellemzők**:

- Kétnyelvű (magyar/angol) tartalom
- Egyszerű, barátságos megjelenés
- Üdvözlő üzenet a sikeres regisztrációról
- Nincs dinamikus változó

---

### 3. Jelszó Visszaállítás (password-reset.blade.php)

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>CheckItOut - Jelszó visszaállítás / Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    @php
        $resetUrl = $resetLink;
        if (strpos($resetLink, 'backend.') !== false) {
            $resetUrl = str_replace('backend.', 'frontend.', $resetLink);
        }
    @endphp

    <h2>🔐 Jelszó visszaállítás</h2>
    <p>Kedves Felhasználó!</p>
    <p>Kérjük, kattintson az alábbi gombra a jelszó visszaállításához:</p>

    <div style="margin: 20px 0;">
        <a href="{{ $resetUrl }}"
           style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Jelszó visszaállítása
        </a>
    </div>

    <p>Ha Ön nem kért jelszó-visszaállítást, akkor hagyja figyelmen kívül ezt az emailt.</p>

    <hr>

    <h2>🔐 Password Reset</h2>
    <p>Dear User,</p>
    <p>Please click the button below to reset your password:</p>

    <div style="margin: 20px 0;">
        <a href="{{ $resetUrl }}"
           style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
        </a>
    </div>

    <p>If you did not request a password reset, please ignore this email.</p>

    <br><br>
    <p>Üdvözlettel / Best regards,<br><strong>CheckItOut csapat / team</strong></p>
</body>
</html>

```

**Jellemzők**:

- Dinamikus `$resetLink` változó
- URL átalakítás (backend → frontend)
- Kiemelt gomb a visszaállításhoz
- Kétnyelvű utasítások
- Biztonsági figyelmeztetés

---

### 4. Kapcsolatfelvétel (contact.blade.php)

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>CheckItOut - Új kapcsolatfelvétel / New Contact Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>📬 Új kapcsolatfelvétel</h2>
    <p>Kedves Adminisztrátor!</p>
    <p>Egy új üzenet érkezett a rendszerbe:</p>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Feladó:</strong> {{ $name }} &lt;{{ $email }}&gt;</p>
        <p><strong>Üzenet:</strong></p>
        <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
            {{ $description }}
        </p>
    </div>

    <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;">

    <h2>📬 New Contact Request</h2>
    <p>Dear Administrator,</p>
    <p>A new message has been received:</p>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>From:</strong> {{ $name }} &lt;{{ $email }}&gt;</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
            {{ $description }}
        </p>
    </div>

    <br><br>
    <p>Üdvözlettel / Best regards,<br><strong>CheckItOut csapat / team</strong></p>
</body>
</html>

```

**Jellemzők**:

- Dinamikus változók: `$name`, `$email`, `$description`
- Formázott üzenet megjelenítése
- Kétnyelvű tartalom
- Profi megjelenésű üzenet doboz
- Fejléc ikonok (📬) a jobb áttekinthetőségért

## Közös Jellemzők

1. **Design**:
    - Egyszerű, reszponzív HTML email
    - Inline CSS stílusok
    - Arial betűtípus
    - 1.6 sor magasság
2. **Struktúra**:
    - DOCTYPE deklaráció
    - Nyelvspecifikus HTML lang attribútum
    - Kétnyelvű tartalom (elválasztó vonallal)
    - Aláírás a CheckItOut csapattól
3. **Technikai Megoldások**:
    - Blade template engine
    - Dinamikus változók ahol szükséges
    - PHP kód a sablonon belül speciális logikához (pl. URL átalakítás)

## Használati Példa

```php
// Jelszó visszaállítás küldése
Mail::to($user->email)->send(new PasswordResetMail($resetLink));

// Kapcsolatfelvétel küldése
Mail::to(config('mail.admin_address'))->send(new ContactFormMail(
    $request->name,
    $request->email,
    $request->message
));

```

Ez az email sablon gyűjtemény biztosítja a fontos rendszeresemények kommunikációját a felhasználókkal és adminisztrátorokkal, professzionális megjelenéssel és kétnyelvű támogatással.

# Laravel Resource és Listener Dokumentáció

## 1. CreateDefaultCategoriesForUser Listener

### Áttekintés

Ez az eseménykezelő automatikusan létrehozza az alapértelmezett kategóriákat minden új regisztrált felhasználó számára.

### Főbb jellemzők:

- **Esemény**: `Registered` (felhasználó regisztrációja)
- **Művelet**: 20 alapértelmezett kategória létrehozása (10 magyar, 10 angol)
- **Duplikáció védelem**: `firstOrCreate` használata

### Kategória lista:

```php
$defaultCategories = [
    ["category_name" => "Tanulás", "lang" => "hu"],
    // ... további magyar kategóriák
    ["category_name" => "Learning", "lang" => "en"],
    // ... további angol kategóriák
];

```

### Használat:

Az EventServiceProvider-ben regisztrálandó:

```php
protected $listen = [
    Registered::class => [
        CreateDefaultCategoriesForUser::class,
    ],
];

```

## 2. UserResource

### Áttekintés

A felhasználó adatainak API válaszként való formázásáért felelős.

### Válasz struktúra:

```json
{
    "id": 1,
    "name": "admin",
    "email": "admin@admin.com",
    "role": "admin",
    "tasks": [], // Csak ha betöltve
    "schedules": [] // Csak ha betöltve
}

```

### Fontos tulajdonságok:

- **Feltételes betöltés**: `whenLoaded` segítségével
- **Kapcsolatok**: TaskResource és ScheduleResource gyűjtemények

## 3. TaskResource

### Áttekintés

Feladatok adatainak formázása API válaszként.

### Válasz struktúra:

```json
{
    "id": 1,
    "title": "Feladat neve",
    "description": "Feladat leirasa",
    "due_date": "2025-04-12 15:51:39",
    "priority": 10,
    "status": "new",
    "category_id": 7,
    "User": {} // Csak ha betöltve
}

```

### Speciális funkciók:

- Dátum formázás automatikus
- Felhasználó adatai feltételesen betöltve

## 4. ScheduleResource

### Áttekintés

Ütemezések adatainak formázása.

### Válasz struktúra:

```json
{
    "id": 1,
    "name": "Sample Schedule",
    "period_of_time": "1:00:00",
    "deadline": "2030-01-01 12:00:00",
    "description": "Sample description",
    "task_id": 1,
    "user_id": 1,
    "created_at": "...",
    "updated_at": "..."
}

```

### Megjegyzés:

- A kommentelt `task` kapcsolat használható, ha szükséges

## 5. CategoryResource

### Áttekintés

Kategóriák adatainak formázása.

### Válasz struktúra:

```json
{
    "id": 1,
    "name": "Tanulás",
    "lang": "hu",
    "user_id": 1
}

```

### Fontos:

- A `category_name` mező `name` néven kerül visszaadásra
- Nyelvi támogatás (`lang` mező)

## Összefüggések

1. **Felhasználó regisztráció**:
    - Elindítja a `Registered` eseményt
    - A listener létrehozza az alapértelmezett kategóriákat
2. **API válaszok**:
    - Minden Resource osztály konzisztens struktúrát biztosít
    - Kapcsolatok feltételes betöltése optimalizálja a válaszokat
3. **Adatintegráció**:
    - A Resource osztályok egységesen formázzák az adatokat
    - Minden entitás rendelkezik saját Resource osztállyal

## Használati példa API végponton

```php
// Felhasználó adatainak lekérése a feladataival
Route::get('/users/{user}', function (User $user) {
    return new UserResource($user->load('tasks'));
});

// Kategóriák listázása
Route::get('/categories', function () {
    return CategoryResource::collection(Category::all());
});

```

## Fejlesztői megjegyzések

1. **Bővítési lehetőségek**:
    - Új alapértelmezett kategóriák hozzáadása
    - További kapcsolatok hozzáadása a Resource osztályokhoz
2. **Optimalizálás**:
    - Eager loading használata N+1 probléma elkerülésére
    - Resource gyűjtemények használata nagy adathalmazokhoz
3. **Testreszabás**:
    - Dátumformátum módosítása
    - További mezők hozzáadása a válaszokhoz

Ez a rendszer biztosítja az adatok konzisztens és optimalizált megjelenítését az API válaszaiban, miközben lehetővé teszi az automatikus alapértelmezett adatok létrehozását új felhasználók számára.

# Laravel Backend Dokumentáció

## Áttekintés

Ez a dokumentáció a Laravel backend rendszer főbb komponenseit és funkcióit mutatja be, beleértve a szolgáltatókat, modelleket, eseménykezelőket és email osztályokat.

## 1. Szolgáltatók (Providers)

### EventServiceProvider.php

### Főbb funkciók:

- **Eseménykezelés**: Regisztrálja a felhasználó regisztrációhoz tartozó eseménykezelőt
- **Használat**:
    - Amikor egy felhasználó regisztrál, a `CreateDefaultCategoriesForUser` kezelő létrehoz alap kategóriákat

### Fontos részletek:

```php
protected $listen = [
    Registered::class => [
        CreateDefaultCategoriesForUser::class,
    ],
];

```

### AppServiceProvider.php

### Főbb funkciók:

- **Strict mód**: Az összes modelhez strict mód beállítása
- **Jogosultságkezelés**: `list-users` Gate definiálása admin szerephez

### Fontos részletek:

```php
Model::shouldBeStrict();

Gate::define('list-users', function (User $user) {
    return $user->role == "admin";
});

```

## 2. Jogosultságkezelés (Policies)

### UserPolicy.php

### Főbb funkciók:

- **Felhasználó frissítés**: Csak saját felhasználó vagy admin frissíthet
- **Felhasználó törlés**: Csak admin törölhet

### Metódusok:

```php
public function update(User $authUser, User $user): bool
{
    return $authUser->id === $user->id || $authUser->role === 'admin';
}

public function delete(User $authUser, User $user): bool
{
    return $authUser->role === 'admin';
}

```

## 3. Modellek

### User.php

### Főbb jellemzők:

- **Töltetlen mezők**: `name`, `email`, `password`, `role`
- **Rejtett mezők**: `password`, `remember_token`
- **Kapcsolatok**:
    - `tasks()`: A felhasználó feladatai
    - `schedules()`: A felhasználó ütemezései
    - `shared_tasks()`: Megosztott feladatok

### Fontos metódusok:

```php
public function tasks(): HasMany
{
    return $this->hasMany(Task::class, "user_id", "id");
}

```

### Task.php

### Főbb jellemzők:

- **Töltetlen mezők**: `description`, `due_date`, `priority`, `status`, `category_id`, `user_id`, `title`
- **Kapcsolatok**:
    - `user()`: A feladat tulajdonosa
    - `category()`: A feladat kategóriája
    - `schedules()`: A feladathoz tartozó ütemezések

### Statikus metódus:

```php
public static function getStatuses()
{
    return [
        "new",
        "in-progress",
        "finished",
        "expired"
    ];
}

```

### Schedule.php

### Főbb jellemzők:

- **Töltetlen mezők**: `name`, `period_of_time`, `deadline`, `description`, `task_id`, `user_id`
- **Kapcsolat**: `task()`: Az ütemezéshez tartozó feladat

### Category.php

### Főbb jellemzők:

- **Töltetlen mezők**: `category_name`, `lang`, `user_id`
- **Időbélyeg nélküli**: `public $timestamps = false`

## 4. Email Osztályok

### TestEmail.php

### Cél:

- Egyszerű teszt email küldésére

### Használat:

```php
return $this->subject('Teszt Email')->view('emails.test');

```

### RegisteredMail.php

### Cél:

- Regisztráció megerősítő email küldésére

### Használat:

```php
return $this->subject('CheckItOut - Sikeres regisztráció!')->view('emails.registration');

```

### PasswordResetLink.php

### Cél:

- Jelszó visszaállító link küldésére

### Főbb jellemzők:

- Dinamikus reset link paraméterrel
- Markdown sablon használata

### Használat:

```php
public function __construct($resetLink)
{
    $this->resetLink = $resetLink;
}

public function build()
{
    return $this->markdown('emails.password-reset')
               ->subject('Jelszó visszaállítási link');
}

```

## Összefoglalás

A rendszer főbb komponensei:

1. **Eseménykezelés**: Automatikus kategória létrehozás regisztrációkor
2. **Jogosultságkezelés**: Szerepalapú hozzáférés-vezérlés
3. **Adatmodell**:
    - Felhasználók, feladatok, kategóriák és ütemezések
    - Összetett kapcsolatok a modellek között
4. **Email rendszer**: Különböző típusú üzenetek küldésére szolgáló osztályok

Ez a dokumentáció átfogó képet ad a Laravel backend főbb komponenseiről és azok együttműködéséről.

# Laravel Request Osztályok Dokumentáció

## Áttekintés

Ez a dokumentáció a Laravel backend rendszer HTTP kéréseket kezelő osztályait mutatja be. Ezek az osztályok felelősek a bejövő adatok validálásáért és a kérések engedélyezéséért.

## 1. Kapcsolat űrlap kérések

### sendContactEmailRequest.php

### Validációs szabályok:

- **name**: Kötelező, string, max 255 karakter
- **email**: Kötelező, érvényes email cím, max 255 karakter
- **description**: Kötelező, string

### Engedélyezés:

```php
public function authorize(): bool
{
    return true; // Mindenki küldhet kapcsolatfelvételi üzenetet
}

```

## 2. Felhasználókezelés

### StoreUserRequest.php (Új felhasználó)

### Validációs szabályok:

- **name**: Kötelező, string, max 255 karakter
- **email**: Kötelező, egyedi email cím, max 255 karakter
- **password**: Kötelező, minimum 8 karakter

### UpdateUserRequest.php (Felhasználó módosítás)

### Validációs szabályok:

- **name**: Opcionális, string, max 255 karakter
- **email**: Opcionális, egyedi email cím (kivéve a jelenlegi felhasználót), max 255 karakter
- **role**: Csak 'admin' vagy 'user' lehet
- **password**: Opcionális, minimum 8 karakter

### Speciális szabály:

```php
Rule::unique('users', 'email')->ignore($this->route('user'))

```

### changePasswordRequest.php (Jelszó változtatás)

### Validációs szabályok:

- **old_password**: Kötelező
- **new_password**: Kötelező, minimum 6 karakter, confirmed (jelszó megerősítés)

## 3. Feladatkezelés

### StoreTaskRequest.php (Új feladat)

### Validációs szabályok:

- **title**: Kötelező, string, max 50 karakter
- **description**: Opcionális, string, max 255 karakter
- **due_date**: Opcionális, dátum
- **priority**: Kötelező, 0-10 közötti egész szám
- **status**: String, max 15 karakter, csak a Task::getStatuses() értékei
- **user_id**: Kötelező, létező felhasználó
- **category_id**: Kötelező, létező kategória

### Status validáció:

```php
Rule::in(Task::getStatuses())

```

### UpdateTaskRequest.php (Feladat módosítás)

### Validációs szabályok:

Ugyanazok, mint a StoreTaskRequest-ben

## 4. Ütemezéskezelés

### StoreScheduleRequest.php (Új ütemezés)

### Validációs szabályok:

- **name**: Kötelező, string, max 255 karakter
- **period_of_time**: Kötelező, idő formátum (Óó:Pp)
- **deadline**: Kötelező, dátum-idő formátum (Éééé-Hh-Nn Óó:Pp:Mm)
- **description**: Kötelező, string
- **user_id**: Kötelező, létező felhasználó
- **task_id**: Kötelező, létező feladat

### Egyéni hibaüzenetek:

```php
public function messages(): array
{
    return [
        'name.required' => 'The name field is required.',
        // ...
    ];
}

```

### UpdateScheduleRequest.php (Ütemezés módosítás)

### Validációs szabályok:

Ugyanazok, mint a StoreScheduleRequest-ben

### Engedélyezés:

```php
public function authorize(): bool
{
    return false; // Jelenleg tiltva
}

```

## 5. Kategóriakezelés

### StoreCategoryRequest.php (Új kategória)

### Validációs szabályok:

- **category_name**: Kötelező, egyedi név az adott felhasználó kategóriái között
- **lang**: Kötelező, csak 'hu' vagy 'en'
- **user_id**: Kötelező, létező felhasználó

### Egyedi név validáció:

```php
"unique:categories,category_name,NULL,id,user_id," . auth()->id()

```

### UpdateCategoryRequest.php (Kategória módosítás)

### Jelenlegi állapot:

- Nincs implementálva (üres rules tömb)
- Nincs engedélyezve (authorize false)

## Összefoglalás

A request osztályok főbb jellemzői:

1. **Validáció**: Minden mezőre részletes validációs szabályok
2. **Engedélyezés**: Egyszerű true/false vagy komplex logika
3. **Speciális szabályok**:
    - Egyedi értékek figyelése (pl. email)
    - Előre definiált értékek (pl. feladat állapotok)
    - Összetett egyediség ellenőrzés (felhasználónkénti egyediség)
4. **Egyéni hibaüzenetek**: Olvashatóbb validációs hibák

Ez a dokumentáció átfogó képet ad a Laravel backend kérésvalidáció főbb komponenseiről és azok együttműködéséről.

# Laravel Kontrollerek Dokumentáció

## Áttekintés

Az alkalmazás RESTful API-t biztosít különböző erőforrások kezelésére. A kontrollerek a következő fő területeket kezelik:

- Felhasználókezelés és hitelesítés
- Feladatok és kategóriák kezelése
- Ütemezések kezelése
- Adminisztrációs funkciók
- Kapcsolatfelvétel

## Főbb Kontrollerek

### 1. Hitelesítés (AuthController)

### Főbb metódusok:

- **login**: Felhasználó bejelentkeztetése JWT token generálásával
- **register**: Új felhasználó regisztrálása és üdvözlő email küldése

```php
public function login(LoginRequest $request) {
    // Hitelesítés és token generálás
}

public function register(StoreUserRequest $request) {
    // Regisztráció és email küldés
}

```

### 2. Felhasználókezelés (UserController)

### Főbb metódusok:

- **profile**: Bejelentkezett felhasználó adatainak lekérdezése
- **changePassword**: Jelszó módosítása
- **sendResetLinkEmail**: Jelszó-visszaállítási link küldése
- **resetPassword**: Jelszó visszaállítása token alapján

```php
public function changePassword(changePasswordRequest $request) {
    // Jelszó ellenőrzés és frissítés
}

public function sendResetLinkEmail(Request $request) {
    // Token generálás és email küldés
}

```

### 3. Feladatok (TaskController)

### Főbb metódusok:

- **index**: Mai feladatok listázása lejártakkal együtt
- **store**: Új feladat létrehozása
- **update**: Feladat frissítése

```php
public function index() {
    // Lejárt feladatok frissítése és rendezett lista
}

public function update(UpdateTaskRequest $request, Task $task) {
    // Feladat állapotának frissítése
}

```

### 4. Ütemezések (ScheduleController)

### Főbb metódusok:

- **scheduleComposer**: Felhasználó feladatainak és ütemezéseinek összeállítása

```php
public function scheduleComposer(User $user) {
    // Feladatok és ütemezések rendezése
}

```

### 5. Adminisztráció (AdminController)

### Főbb metódusok:

- **createUser**: Admin által új felhasználó létrehozása
- **updateUser**: Felhasználó adatainak módosítása
- **deleteUser**: Felhasználó törlése

```php
public function createUser(CreateUserRequest $request) {
    // Felhasználó létrehozás admin által
}

public function updateUser(Request $request, $id) {
    // Felhasználó adatainak frissítése
}

```

### 6. Közös Jellemzők

1. **Request Validáció**:
    - Minden kontroller saját Request osztályokat használ
    - Pl. `StoreUserRequest`, `UpdateTaskRequest`
2. **Erőforrások**:
    - API válaszok formázása Resource osztályokkal
    - Pl. `UserResource`, `TaskResource`
3. **Biztonság**:
    - Jogosultság ellenőrzés Gate-kkel
    - Admin funkciók külön middleware-rel védve
4. **Adatbázis műveletek**:
    - Eloquent modellek használata
    - Kapcsolatok kezelése (`with`, `load`)

## Middleware-k

### AdminMiddleware

```php
public function handle(Request $request, Closure $next): Response {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return $next($request);
    }
    return response()->json(['message' => 'Unauthorized'], 403);
}

```

- Csak admin felhasználók számára engedélyezi a hozzáférést

## Fontos Megjegyzések

1. **Jelszókezelés**:
    - Hash-elt tárolás
    - Token alapú visszaállítás 2 órás érvényességgel
2. **Feladat állapotok**:
    - Automatikus frissítés lejárt feladatokra
    - Speciális rendezés prioritás és határidő alapján
3. **Email küldés**:
    - Regisztrációkor üdvözlő email
    - Jelszó-visszaállítási link
    - Kapcsolatfelvételi értesítés
4. **Kétnyelvűség**:
    - Hibaüzenetek magyar és angol nyelven

Ez a kontroller struktúra biztosítja az alkalmazás alapvető funkcionalitását, miközben megfelel a modern biztonsági és fejlesztési elvárásoknak. A jól definiált végpontok és a következetes hibakezelés lehetővé teszi a könnyű integrációt frontend alkalmazásokkal.