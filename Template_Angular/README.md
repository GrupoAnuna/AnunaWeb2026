# Instrucciones para iniciar un nuevo proyecto

Este documento detalla cómo replicar esta plantilla de repositorio para iniciar un nuevo proyecto de Angular.

### Requisitos

* **Node.js**: Versión LTS.
* **Angular CLI**: `@latest` (opcional).

Este repositorio está configurado como **Template Repository** en GitHub.

### Opción recomendada: Usar como plantilla (GitHub)

1.  **En GitHub**: Haz clic en el botón `Use this template` y dale un nombre al nuevo repositorio (por ejemplo: `cliente-xyz-web`).
2.  **En tu máquina**: Clona el nuevo repositorio que acabas de crear y navega hasta la carpeta.

    ```
    git clone [https://github.com/tu-org/cliente-xyz-web.git](https://github.com/tu-org/cliente-xyz-web.git)
    cd cliente-xyz-web
    ```

3.  **Instala y arranca**: Instala las dependencias y arranca el proyecto.

    ```
    npm i
    npm start
    ```

4.  **(Opcional) Renombra el paquete**: Si quieres renombrar el paquete para mayor coherencia.

    ```
    npm pkg set name=cliente-xyz-web
    ```

5.  **(Opcional) Ajusta el nombre del proyecto en `angular.json`**: Si deseas un nombre de proyecto personalizado, puedes ajustarlo en el archivo `angular.json`.

---

### Opción alternativa: Copiar localmente sin "template"

1.  **Clona la plantilla en una nueva carpeta**:

    ```
    git clone [https://github.com/tu-org/angular-starter.git](https://github.com/tu-org/angular-starter.git) cliente-xyz-web
    cd cliente-xyz-web
    ```

2.  **Reinicia el historial Git**: Esto desvincula el proyecto del historial de la plantilla. Luego, sube el nuevo proyecto a tu repositorio remoto.

    ```
    rm -rf .git
    git init
    git remote add origin [https://github.com/tu-org/cliente-xyz-web.git](https://github.com/tu-org/cliente-xyz-web.git)
    git add .
    git commit -m "init"
    git push -u origin main
    ```

3.  **Instala y arranca**: Instala las dependencias y arranca el proyecto.

    ```
    npm i
    npm start
    ```

4.  **Renombra el paquete si aplica**:

    ```
    npm pkg set name=cliente-xyz-web
    ```

---

### Estructura de carpetas con comentarios

# 📂 Estructura del repositorio

Este documento describe la estructura de directorios y archivos de este proyecto, siguiendo una arquitectura modular y organizada.

## Estructura de Carpetas

La estructura del proyecto se organiza de la siguiente manera:

### `app/`
Contiene todos los elementos principales de la aplicación.

- **`core/`**: Contiene los servicios, modelos, y utilidades centrales que son usados a través de toda la aplicación.
  - **`guard/`**: Servicios que protegen las rutas de la aplicación.
  - **`interceptors/`**: Interceptores para manejar solicitudes y respuestas HTTP.
  - **`languages/`**: Archivos y servicios relacionados con la internacionalización (i18n).
  - **`model/`**: Modelos de datos utilizados a lo largo de la aplicación.
  - **`pipes/`**: Pipes personalizados para transformar datos.
  - **`services/`**: Servicios generales para la lógica de negocio.
  - **`utils/`**: Funciones y utilidades reutilizables en toda la aplicación.
  - **`validators/`**: Funciones de validación para formularios y otros datos.

- **`features/`**: Contiene los módulos y componentes de las diferentes funcionalidades o secciones de la aplicación.
  - **`home/`**: Componente y funcionalidades para la página principal.
  - **`shell/`**: Componentes globales o estructuras comunes, como el layout y el menú.

- **`shared/`**: Contiene recursos compartidos entre las diferentes partes de la aplicación.
  - **`components/`**: Componentes reutilizables en toda la aplicación.
  - **`utils/`**: Utilidades compartidas entre los módulos.

### Archivos `app.*`, `assets/` y `environments/`

Los archivos que comienzan con `app.` son fundamentales para la configuración y la estructura básica de la aplicación, mientras que las carpetas `assets/` y `environments/` gestionan recursos estáticos y configuraciones específicas de entornos.

#### Archivos `app.*`
- **`app.component.css`**: Estilos para el componente principal de la aplicación.
- **`app.component.html`**: Plantilla HTML para el componente principal.
- **`app.component.spec.ts`**: Pruebas unitarias para el componente principal.
- **`app.config.ts`**: Configuración general de la aplicación.
- **`app.config.server.ts`**: Configuración específica para el servidor.
- **`app.html`**: Plantilla HTML a nivel raíz de la aplicación.
- **`app.routes.ts`**: Definición de rutas principales de la aplicación.
- **`app.routes.server.ts`**: Rutas específicas del servidor.
- **`app.spec.ts`**: Pruebas unitarias para la aplicación.
- **`app.ts`**: Componente principal que inicializa la aplicación.

#### `assets/`
Contiene recursos estáticos utilizados en la aplicación, como fuentes, imágenes y estilos.
- **`config/`**: Archivos de configuración adicionales de la aplicación.
- **`fonts/`**: Fuentes personalizadas utilizadas en la aplicación.
- **`i18n/`**: Archivos para la internacionalización (i18n) de la aplicación.
- **`images/`**: Imágenes estáticas utilizadas en la aplicación.
- **`styles/`**: Archivos CSS/SCSS para estilos globales.

#### `environments/`
Contiene archivos de configuración para diferentes entornos de la aplicación, como desarrollo y producción.
- **`environment.prod.ts`**: Configuración para el entorno de producción.
- **`environment.ts`**: Configuración para el entorno de desarrollo.
