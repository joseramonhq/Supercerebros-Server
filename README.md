
# SuperCerebros API

Este proyecto es un backend para la aplicación **SuperCerebros** que gestiona usuarios (tutores), niños, y sesiones de ejercicios de respiración. Está construido con **Node.js**, **Express**, y **MongoDB** utilizando **Mongoose** para la interacción con la base de datos.

## Estructura del Proyecto

El proyecto sigue una arquitectura de capas, con la lógica dividida en **Controladores**, **Rutas**, **Servicios** y **Modelos**.

### Estructura de Carpetas

```bash
src/
│
├── controllers/               # Lógica para manejar las solicitudes
│   ├── authController.js       # Autenticación de usuarios y niños
│   ├── breathSessionController.js # Manejo de las sesiones de respiración
│   ├── childrenController.js   # CRUD para niños
│   └── userController.js       # CRUD para usuarios
│
├── middlewares/                # (Futuro) Middleware para validaciones, autenticación, etc.
│
├── models/                     # Definiciones de los esquemas de MongoDB
│   ├── breathSession.js        # Modelo de las sesiones de respiración
│   ├── children.js             # Modelo para los niños
│   └── user.js                 # Modelo para los usuarios
│
├── routes/                     # Definición de las rutas de la API
│   ├── breathSessionRoute.js   # Rutas para las sesiones de respiración
│   ├── childrenRoute.js        # Rutas para el CRUD de niños
│   └── userRoute.js            # Rutas para el CRUD de usuarios
│
├── services/                   # Lógica de negocio y operaciones con la base de datos
│   ├── breathSessionService.js # Servicios para sesiones de respiración
│   ├── childrenService.js      # Servicios para el CRUD de niños
│   └── userService.js          # Servicios para el CRUD de usuarios
│
├── .env                        # Variables de entorno
├── .gitignore                  # Archivos a ignorar por Git
├── index.js                    # Entrada principal del servidor
├── package.json                # Dependencias del proyecto y scripts de npm
└── Procfile                    # Instrucciones para el despliegue en plataformas como Heroku
```

## Dependencias Principales

- **bcryptjs**: Para la encriptación de contraseñas.
- **body-parser**: Para manejar los cuerpos de las solicitudes.
- **dotenv**: Para manejar las variables de entorno.
- **express**: Framework para crear el servidor web.
- **mongoose**: ODM para la interacción con MongoDB.

## Instrucciones de Instalación

1. Clona este repositorio:
   ```bash
   https://gitlab.com/joseramonhq/supercerebros_client.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```bash
   MONGO_URI=mongodb://tu-url-de-mongo
   PORT=3000
   ```

4. Ejecuta el servidor en modo de desarrollo:
   ```bash
   npm run dev
   ```

5. Accede a la API en `http://localhost:3000`.

## Rutas de la API

### Usuarios

- **POST /api/users/login**: Iniciar sesión.
- **POST /api/users/register**: Registrar un nuevo usuario.
- **GET /api/users**: Obtener todos los usuarios.
- **GET /api/users/:userId**: Obtener un usuario por ID.
- **GET /api/users/email/:email**: Obtener un usuario por correo electrónico.

### Niños

- **POST /api/children/registerChildren**: Registrar un nuevo niño.
- **GET /api/children/:childrenId**: Obtener un niño por ID.
- **GET /api/children**: Obtener todos los niños.

### Sesiones de Respiración

- **POST /api/breathSession/registerBreathSession**: Registrar una nueva sesión de respiración.
- **PUT /api/breathSession/:id**: Actualizar una sesión de respiración por ID.
- **DELETE /api/breathSession/:id**: Eliminar una sesión de respiración por ID.

## Despliegue

Este proyecto utiliza **Heroku** para su despliegue. Asegúrate de tener un archivo `Procfile` que contenga las siguientes líneas:

```bash
web: node src/index.js
```

Luego, sigue las instrucciones en [Heroku](https://www.heroku.com/) para desplegar tu aplicación.

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza los commits de tus cambios (`git commit -am 'Añadir nueva característica'`).
4. Empuja la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

---

### Autor

- Email: joseramonhq@gmail.com
- GitLab: [joseramonhq](https://gitlab.com/users/joseramonhq/projects)
- Github: [joseramonhq](https://github.com/joseramonhq?tab=repositories) 
