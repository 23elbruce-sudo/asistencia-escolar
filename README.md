# Asistencia Escolar – Colegio Cristóbal de las Américas

Demo de la aplicación web (PWA) de asistencia.

## Cómo subirla a internet (Vercel) – paso a paso

### Lo que necesitas
- Una computadora
- Cuenta de correo (Gmail sirve)
- El archivo ZIP de este proyecto

---

### Método recomendado: GitHub + Vercel (sin instalar nada complicado)

**Paso 1 – Crear cuenta en GitHub**
1. Entra a https://github.com
2. Crea una cuenta gratuita
3. Inicia sesión

**Paso 2 – Subir el proyecto a GitHub**
1. En GitHub, haz clic en el botón verde **New** (nuevo repositorio)
2. Nombre: `asistencia-escolar`
3. Déjalo **Public**
4. Clic en **Create repository**
5. En la página del repositorio vacío, busca la opción de subir archivos:
   - “uploading an existing file” o arrastra la carpeta
6. Descomprime el ZIP en tu computadora
7. Arrastra **todos los archivos de adentro** de la carpeta `asistencia-escolar` (no la carpeta misma, sino su contenido: `src`, `public`, `package.json`, etc.)
8. Clic en **Commit changes**

**Paso 3 – Publicar en Vercel**
1. Entra a https://vercel.com
2. Clic en **Sign Up** y elige **Continue with GitHub**
3. Autoriza a Vercel
4. Clic en **Add New…** → **Project**
5. Busca el repositorio `asistencia-escolar` e impórtalo
6. Deja todo como está y clic en **Deploy**
7. Espera 1–2 minutos
8. Al terminar te dará un enlace como:
   `https://asistencia-escolar-xxxx.vercel.app`

**Paso 4 – Abrir en el celular**
- Copia el enlace y ábrelo en el navegador del celular
- Ya puedes probar la demo

---

## Cómo probar la demo

### Docente
1. Toca **Activar dispositivo de Docente**
2. Escribe cualquier código de 6 caracteres (ejemplo: ABC123)
3. Verás la lista de alumnos
4. Marca Ausente o Tardanza y toca Guardar

### Administrador
1. Toca **Acceso Administradores**
2. Navega por el menú: asistencia en vivo, alumnos, docentes, etc.

---

## Nota importante
Esta es una **demo visual**. Los datos no se guardan de forma permanente todavía.
