# Viaje a Creel – Cabaña Gerónimo’s

Esta es una landing page interactiva desarrollada con Next.js 14 (App Router), Tailwind CSS y Supabase, diseñada para organizar un viaje con amigos a Creel.

## Características

*   **Portada:** Invitación al viaje con fechas y un botón de confirmación.
*   **Descripción del Lugar:** Ficha informativa sobre la cabaña.
*   **Amenidades:** Lista de servicios y comodidades de la cabaña.
*   **Actividades Opcionales:** Lista de actividades con opción de votación (guardado en Supabase).
*   **Costo Estimado:** Desglose de hospedaje y una calculadora interactiva para el costo de la gasolina.
*   **Formulario de Confirmación:** Para que los amigos confirmen su asistencia y si pueden llevar coche (guardado en Supabase).
*   **Módulo de Disponibilidad de Autos:** Muestra el número de confirmaciones, autos ofrecidos y alerta si faltan vehículos.
*   **Sección de Fotos:** Galería con placeholders.
*   **Cómo Llegar / Direcciones:** Mapa estático e instrucciones de ruta.

## Tecnologías Utilizadas

*   **Next.js 14 (App Router):** Framework de React para aplicaciones full-stack.
*   **Tailwind CSS:** Framework CSS para un desarrollo rápido y diseño responsivo.
*   **Supabase:** Base de datos Postgres y servicios de autenticación (utilizado para persistir confirmaciones y votos de actividades).
*   **Vercel:** Plataforma para el despliegue continuo de aplicaciones Next.js.

## Configuración del Proyecto

### 1. Variables de Entorno de Supabase

Para conectar la aplicación a tu proyecto Supabase, necesitas crear un archivo `.env.local` en la raíz del proyecto con tus credenciales de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=TU_URL_DE_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_LLAVE_ANONIMA_DE_SUPABASE
```

**Obtén estas credenciales de tu panel de control de Supabase:**
*   Ve a **Project Settings** -> **API**.
*   Encontrarás el "Project URL" y la "anon public key".

### 2. Configuración de la Base de Datos en Supabase

Asegúrate de haber creado las siguientes tablas en tu proyecto Supabase utilizando el SQL Editor:

**Tabla: `confirmaciones`**

```sql
CREATE TABLE public.confirmaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    va BOOLEAN NOT NULL,
    coche BOOLEAN NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

**Tabla: `actividades_votos`**

```sql
CREATE TABLE public.actividades_votos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actividad TEXT NOT NULL,
    nombre_persona TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

**Importante:** Considera configurar las **Políticas de Seguridad de Filas (RLS - Row Level Security)** en Supabase para proteger tus datos en un entorno de producción. Para este prototipo, las tablas son accesibles públicamente con la `anon key`.

## Ejecución Local

1.  **Instala las dependencias:**

    ```bash
    npm install
    ```

2.  **Ejecuta el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Despliegue en Vercel

Esta aplicación está lista para ser desplegada en Vercel.

1.  **Crea un repositorio Git** (si aún no lo has hecho) y sube tu código.
2.  **Conecta tu repositorio en Vercel.**
3.  **Configura las variables de entorno de Supabase** en Vercel (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`) en la sección de "Environment Variables" de tu proyecto.
4.  Vercel detectará automáticamente que es un proyecto Next.js y lo desplegará.

---

¡Disfruten del viaje a Creel!