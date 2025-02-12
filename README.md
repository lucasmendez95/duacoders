# NestJS App

Este es un proyecto basado en **NestJS**, un framework progresivo para Node.js que permite la construcción de aplicaciones escalables y eficientes.

## 🚀 Instalación

### Prerrequisitos
Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 21 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Clonar el repositorio
```bash
git clone https://github.com/lucasmendez95/duacoders.git
cd tu-repositorio
```

### Instalar dependencias
Con **npm**:
```bash
npm install
```
Con **yarn**:
```bash
yarn install
```

## 🌍 Configuración
Crea en raíz el archivo `.env` y configura las variables de entorno necesarias.

Ejemplo:
```
PORT=3000
JWT_SECRET=tu_secreto
JWT_EXPIRATION=7d

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=x
DB_NAME=duacoders

```

## 🏃 Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start
```

## 🧪 Pruebas

Ejecutar pruebas unitarias:
```bash
npm run test
```

Ejecutar pruebas end-to-end:
```bash
npm run test:e2e
```

## 📜 Endpoints

Por defecto, la API se ejecuta en `http://localhost:3000`. Puedes consultar la documentación Swagger en:
```
http://localhost:3000/api/docs
```
