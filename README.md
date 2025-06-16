# LMS - Library Management System

Sistema de gestión de biblioteca compuesto por un backend en Laravel y un frontend en React, ambos listos para desarrollo local y despliegue usando Docker y Docker Compose.

---

## 🏗️ Estructura del Proyecto

```
/
├── docker-compose.yml
├── lms-api/      # Backend (Laravel, PHP)
├── lms-web/      # Frontend (React + Vite)
├── nginx/        # Configuración de Nginx
```

---

## 🚀 Instrucciones de Instalación y Ejecución

### Opción 1: Usando Docker (recomendado)

#### Requisitos previos
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) instalados.


Desde la raíz del proyecto:

```sh
docker-compose up --build
```

Esto levantará:

- **Backend**: Laravel (PHP) en el contenedor `lms-api`
- **Frontend**: React (Vite) en el contenedor `lms-web`
- **Base de datos**: MySQL en el contenedor `lms-mysql`
- **Servidor web**: Nginx en el contenedor `web`

Accesos por defecto:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)
- Documentación Swagger: [http://localhost:8080/api/documentation](http://localhost:8080/api/documentation)

**Después de que los contenedores estén en ejecución, entra al contenedor de Laravel para correr las migraciones y seeders:**

```sh
docker-compose exec lms-api bash
php artisan migrate --seed
exit
```

---

### Opción 2: Manual (desarrollo local sin Docker)

#### Backend (Laravel)

1. Entra a la carpeta del backend:
   ```sh
   cd lms-api
   ```
2. Copia el archivo de entorno y edítalo según tu configuración:
   ```sh
   cp .env.example .env
   ```
3. Genera la clave de la aplicación:
   ```sh
   php artisan key:generate
   ```
4. Instala dependencias:
   ```sh
   composer install
   npm install
   ```
5. Ejecuta migraciones y seeders:
   ```sh
   php artisan migrate --seed
   ```
6. Inicia el servidor:
   ```sh
   php artisan serve
   ```

#### Frontend (React)

1. Entra a la carpeta del frontend:
   ```sh
   cd lms-web
   ```
2. Crea un archivo `.env` con la URL de la API:
   ```
   VITE_URL_API=http://localhost:8000/api
   ```
3. Instala dependencias:
   ```sh
   npm install
   ```
4. Inicia la aplicación:
   ```sh
   npm run dev
   ```

---

> **Nota:** Si usas Docker, los archivos `.env` ya están preparados en los contenedores, pero puedes personalizarlos si lo necesitas.

## 🏛️ Decisiones de Arquitectura

### Backend ([lms-api/](lms-api/))

- **Framework:** Laravel 11
- **Autenticación:** Laravel Sanctum (Bearer Token)
- **Documentación API:** L5 Swagger
- **Base de datos:** MySQL (configurada en docker-compose)
- **Estructura:**
### Estructura de carpetas principal (`lms-api/`)

```
lms-api/
├── app/
│   ├── Console/
│   ├── Exceptions/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   ├── Models/
│   ├── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   ├── seeders/
├── public/
├── routes/
│   ├── api.php
│   ├── web.php
├── storage/
├── tests/
├── .env.example
├── artisan
├── composer.json
├── Dockerfile
└── ...
```
- **Docker:** [lms-api/Dockerfile](lms-api/Dockerfile)

### Frontend ([lms-web/](lms-web/))

- **Framework:** React + Vite
- **State Management:** Context API para autenticación y estado global
- **Routing:** React Router
- **Estilos:** TailwindCSS
- **Servicios API:** Axios centralizado
- **Docker:** [lms-web/Dockerfile](lms-web/Dockerfile)
- **Estructura:**
## Estructura de carpetas principal (`lms-web/`)

```
lms-web/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── Dockerfile
├── package.json
├── tailwind.config.js
├── vite.config.js
└── ...
```

### Orquestación

- **docker-compose:** Orquesta todos los servicios, monta volúmenes para desarrollo en caliente y expone los puertos necesarios.

---

## 🔗 Ejemplo de Navegación y Llamadas API

### Flujo de navegación

1. **Login:** `/login`
2. **Dashboard:** `/dashboard`
3. **Libros:** `/books`
4. **Mis Préstamos:** `/my-borrowings`
5. **Usuarios:** `/users` (admin)

### Ejemplo de llamada API (frontend)

```js
// Obtener libros
import api from "./services/api";
api.get("/books").then(res => console.log(res.data));

// Solicitar préstamo
import { borrowBook } from "./services/borrowingService";
borrowBook(userId, bookId).then(data => console.log(data));
```

### Ejemplo de endpoint (backend)

- **Login:** `POST /api/login`
- **Listar libros:** `GET /api/books`
- **Solicitar préstamo:** `POST /api/users/{id}/borrowings` `{ book_id: 1 }`
- **Devolver libro:** `DELETE /api/users/{id}/borrowings/{book}`

---

## 📝 Progress Log

| Fecha       | Hito / Actividad                                   |
|-------------|----------------------------------------------------|
| 2024-06-14  | Inicialización del repositorio y setup de Laravel y React  |
| 2024-06-11  | Módulos: User y Book       |
| 2024-06-15  | Módulo de Borrowing, Mejoras de visuales de la interfaz                |
| 2024-06-16  | Documentación   |              |

---

## 📚 Recursos

- [Documentación API Swagger](http://localhost:8080/api/documentation)
- [Laravel Docs](https://laravel.com/docs)
- [React Docs](https://react.dev/)

---

¿Dudas o sugerencias? ¡Abre un issue o contacta