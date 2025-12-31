# BeKind Network

Aplicación web para gestionar y conectar acciones de bondad dentro de una comunidad, permitiendo categorizar, visualizar y administrar diferentes tipos de actividades benéficas.

## Tabla de Contenidos

-   [Inicio Rápido](#inicio-rápido)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Tecnologías Utilizadas](#tecnologías-utilizadas)
-   [Configuración de Entorno](#configuración-de-entorno)
-   [Scripts Disponibles](#scripts-disponibles)
-   [Características Actuales](#características-actuales)

## Inicio Rápido

### Requisitos

-   Node.js v16+
-   pnpm o npm

### Instalación

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/isantidev/bekind-network.git
    cd bekind-network
    ```

2. **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3. **Ejecutar servidor de desarrollo:**

    ```bash
    pnpm dev
    ```

    Abre `http://localhost:5173` en tu navegador.

4. **Construir para producción:**
    ```bash
    pnpm build
    ```

## Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Avatar.tsx        # Avatar del usuario
│   ├── ErrorMessage.tsx  # Mostrador de errores
│   ├── Loading.tsx       # Indicador de carga
│   ├── LoginForm.tsx     # Formulario de inicio de sesión
│   └── Sidebar.tsx       # Barra lateral de navegación
├── context/              # Contexto y estado global
│   └── Login.tsx         # Contexto de autenticación con Zustand
├── hooks/                # Hooks personalizados (vacío)
├── pages/                # Páginas/Vistas
│   ├── CreateAction.tsx  # Crear nueva acción
│   ├── Dashboard.tsx     # Panel de control con categorías
│   ├── Layout.tsx        # Layout principal
│   └── Login.tsx         # Página de login
├── routes/               # Configuración de rutas
│   └── routes.tsx        # Definición de rutas con React Router
├── styles/               # Estilos CSS
│   ├── globals.css
│   ├── layout.css
│   ├── login.css
│   └── sidebar.css
├── types/                # Tipos TypeScript
│   ├── activities.ts
│   ├── auth.ts           # Tipos de autenticación
│   ├── layout.ts
│   └── login.ts          # Tipos de formulario login
├── utils/                # Funciones utilitarias
│   ├── ProtectedRoutes.ts # Loaders para rutas protegidas
│   └── menuItems.ts      # Items del menú
├── api/                  # API clients (vacío)
├── App.tsx               # Componente raíz
└── main.tsx              # Punto de entrada
```

## Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Usar mocks en desarrollo
VITE_USE_MOCKS=true

# Endpoint de autenticación (mock)
VITE_MOCK_AUTH_ENDPOINT=http://localhost:3000/api/login

# Endpoint de autenticación (producción)
VITE_AUTH_ENDPOINT= "ENDPOINT DE PRODUCCIÓN"

# Endpoint del dashboard (producción)
VITE_LIST_DASHBOARD= "ENDPOINT DE PRODUCCIÓN"

# Endpoint del dashboard (mock)
VITE_MOCK_LIST_DASHBOARD=http://localhost:3000/api/v1/actions/admin-list
```

**Nota:** Cuando `VITE_USE_MOCKS=true`, la aplicación usa los endpoints de mock. Cambiar a `false` para usar endpoints de producción.

## Tecnologías Utilizadas

| Tecnología       | Versión | Propósito              |
| ---------------- | ------- | ---------------------- |
| React            | 19.2.0  | Framework UI           |
| React DOM        | 19.2.0  | Renderizado en DOM     |
| React Router DOM | 7.11.0  | Enrutamiento           |
| Vite             | 7.2.4   | Bundler y servidor dev |
| TypeScript       | 5.9.3   | Tipado estático        |
| Formik           | 2.4.9   | Gestión de formularios |
| Zustand          | 5.0.9   | Gestión de estado      |
| Lucide React     | 0.562.0 | Iconos SVG             |
| ESLint           | 9.39.1  | Linting                |

## Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo (puerto 5173)

# Compilación
pnpm build        # Compila TypeScript y crea bundle de producción

# Linting
pnpm lint         # Ejecuta ESLint en el proyecto

# Preview
pnpm preview      # Vista previa local de la compilación de producción
```

## Características Actuales

### ✅ Implementadas

-   **Autenticación:** Sistema de login con formulario validado (email + contraseña)
-   **Gestión de Estado:** Zustand para persistencia de autenticación
-   **Rutas Protegidas:** Loaders que verifican autenticación antes de acceder
-   **Dashboard:** Panel de control con gestión de categorías, tipos y evidencias
-   **Interfaz:** Layout con header, sidebar y área de contenido
-   **Validación de Formularios:** Formik con reglas de validación personalizadas
-   **Endpoints Configurables:** Soporte para mocks y producción vía variables de entorno

### 🚀 Rutas Disponibles

| Ruta       | Descripción                | Protegida |
| ---------- | -------------------------- | --------- |
| `/login`   | Página de inicio de sesión | NO        |
| `/`        | Redirecciona a `/bakanes`  | Sí        |
| `/bakanes` | Dashboard principal        | Sí        |

### 📝 Tipos de Datos

**AuthState (Zustand Store):**

-   `user`: Datos del usuario autenticado
-   `token`: Token JWT
-   `isAuthenticated`: Estado de autenticación
-   `login()`: Función para iniciar sesión
-   `logout()`: Función para cerrar sesión

**LoginFormValues:**

```typescript
{
  username: string;  // Email del usuario
  password: string;  // Contraseña
}
```

### 📋 Flujo de Autenticación

1. Usuario ingresa email y contraseña en `/login`
2. El formulario valida los campos en tiempo real
3. Botón habilitado solo si los datos son válidos
4. Se envía POST a `VITE_AUTH_ENDPOINT` o `VITE_MOCK_AUTH_ENDPOINT`
5. Si es exitoso, se guarda el token en Zustand (con persistencia)
6. Usuario es redirigido a `/bakanes`
7. Si intenta acceder a `/login` estando autenticado, es redirigido a `/bakanes`

## Requisitos Previos Cumplidos

-   ✅ Repositorio público en GitHub
-   ✅ README con instrucciones para ejecutar localmente
-   ✅ Documentación de tecnologías utilizadas
-   ✅ Estructura del proyecto clara

## Repositorio

🔗 **GitHub:** https://github.com/isantidev/bekind-network

---

**Última Actualización:** Diciembre 31, 2025

```

```
