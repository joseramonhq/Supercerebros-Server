// Importamos el módulo Express, que es un framework para crear aplicaciones web en Node.js.
const express = require("express");

// Importamos el controlador de la sesión de respiración, que contiene la lógica para manejar las solicitudes relacionadas con las sesiones de respiración.
const BreathSessionController = require("../controllers/breathSessionController");

// Creamos una nueva instancia del enrutador de Express. El enrutador nos permite definir rutas de manera modular.
const router = express.Router();

// Definimos una ruta POST para "/registerBreathSession".
// Cuando un cliente realiza una solicitud POST a esta ruta, se ejecuta el método `createBreathingSession` del controlador `BreathSessionController`.
// Este método es el encargado de manejar la lógica para crear una nueva sesión de respiración en la base de datos.
router.post(
	"/registerBreathSession",                 // Ruta en la que se recibe la solicitud para registrar una sesión de respiración.
	BreathSessionController.createBreathingSession  // Método que se ejecutará cuando se haga una solicitud a esta ruta.
);

// Exportamos el enrutador para que pueda ser utilizado en otros archivos del proyecto, como en la configuración principal de rutas de la aplicación.
module.exports = router;
