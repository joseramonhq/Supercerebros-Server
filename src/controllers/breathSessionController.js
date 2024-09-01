// Importamos el modelo BreathingExerciseSession desde el archivo correspondiente en la carpeta de modelos.
// Este modelo representa la estructura y los métodos asociados a las sesiones de respiración en la base de datos.
const BreathingExerciseSession = require("../models/breathSession");

const breathSessionController = {
	
	// Este método es responsable de crear una nueva sesión de respiración en la base de datos.
	// Recibe como entrada un objeto de solicitud (req) que contiene los datos de la sesión en el cuerpo de la solicitud (req.body).
	// El objeto de respuesta (res) se utiliza para enviar la respuesta al cliente.
	createBreathingSession: async (req, res) => {
		try {
			// Desestructuramos el cuerpo de la solicitud para obtener los datos necesarios para crear una sesión de respiración.
			// Estos datos incluyen el ID del niño, las duraciones de las fases de respiración y si la sesión fue completada.
			const {
				childId,                // ID del niño al que pertenece esta sesión
				inhaleDuration,         // Duración de la inhalación en segundos
				holdBreathDuration,     // Duración de la retención del aire después de inhalar en segundos
				exhaleDuration,         // Duración de la exhalación en segundos
				pauseDuration,          // Pausa entre ciclos de respiración en segundos
				totalDuration,          // Duración total de la sesión en segundos
				completed,              // Booleano que indica si la sesión se completó

			} = req.body;

			// Validación: Verificamos que todos los campos obligatorios estén presentes y no sean indefinidos.
			// Si alguno de estos campos falta, respondemos con un código 400 (Bad Request) y un mensaje de error.
			if (
				!childId ||
				inhaleDuration === undefined ||
				holdBreathDuration === undefined ||
				exhaleDuration === undefined ||
				pauseDuration === undefined ||
				totalDuration === undefined ||
				completed === undefined
	
			) {
				// Respondemos con un código de estado 400 porque los datos proporcionados son incorrectos o incompletos.
				return res.status(400).json({ message: "Faltan campos obligatorios." });
			}

			// Si todos los datos están presentes, creamos una nueva instancia del modelo BreathingExerciseSession.
			// Este objeto representa una nueva sesión de respiración basada en los datos proporcionados.
			const newSession = new BreathingExerciseSession({
				childId,                // Asignamos el ID del niño a la sesión
				inhaleDuration,         // Asignamos la duración de la inhalación
				holdBreathDuration,     // Asignamos la duración de la retención del aire
				exhaleDuration,         // Asignamos la duración de la exhalación
				pauseDuration,          // Asignamos la duración de la pausa
				totalDuration,          // Asignamos la duración total de la sesión
				completed,              // Asignamos si la sesión fue completada

			});

			// Guardamos la nueva sesión de respiración en la base de datos.
			// El método save() es proporcionado por Mongoose y guarda el documento en la colección correspondiente.
			const savedSession = await newSession.save();

			// Respondemos con un código de estado 201 (Created) indicando que la sesión se ha creado correctamente.
			// Incluimos la sesión creada en la respuesta para que el cliente pueda ver los detalles.
			res.status(201).json({ session: savedSession });
		} catch (error) {
			// Si ocurre un error durante el proceso, lo registramos en la consola para diagnóstico.
			// Luego, respondemos con un código de estado 500 (Internal Server Error) y un mensaje de error genérico.
			console.error("Error al crear la sesión de respiración:", error);
			res
				.status(500)
				.json({ message: "Error al crear la sesión de respiración" });
		}
	},

	// Este método es responsable de obtener una sesión de respiración específica de la base de datos utilizando su ID.
	// El ID se proporciona como un parámetro en la URL (req.params.id).
	// El método devuelve la sesión solicitada junto con la información relacionada con el niño asociado.
	getBreathingSessionById: async (req, res) => {
		try {
			// Extraemos el ID de la sesión de los parámetros de la URL.
			const sessionId = req.params.id;

			// Utilizamos el método findById de Mongoose para buscar la sesión en la base de datos por su ID.
			// El método populate("childId") permite obtener también los datos del niño relacionado en la misma consulta.
			const session = await BreathingExerciseSession.findById(sessionId).populate("childId");

			// Si la sesión no se encuentra en la base de datos, respondemos con un código de estado 404 (Not Found) y un mensaje de error.
			if (!session) {
				return res
					.status(404)
					.json({ message: "Sesión de respiración no encontrada" });
			}

			// Si la sesión se encuentra, respondemos con un código de estado 200 (OK) y los datos de la sesión.
			res.status(200).json(session);
		} catch (error) {
			// Si ocurre un error durante el proceso de búsqueda, lo registramos en la consola y respondemos con un código de estado 500.
			console.error("Error al obtener la sesión de respiración:", error);
			res
				.status(500)
				.json({ message: "Error al obtener la sesión de respiración" });
		}
	},

	// Este método es responsable de obtener todas las sesiones de respiración almacenadas en la base de datos.
	// Devuelve una lista de todas las sesiones, incluyendo información sobre el niño asociado.
	getAllBreathingSessions: async (req, res) => {
		try {
			// Utilizamos el método find() de Mongoose para obtener todas las sesiones de la base de datos.
			// El método populate("childId") permite obtener los datos del niño asociado con cada sesión.
			const sessions = await BreathingExerciseSession.find().populate("childId");

			// Respondemos con un código de estado 200 (OK) y la lista de todas las sesiones encontradas.
			res.status(200).json(sessions);
		} catch (error) {
			// Si ocurre un error durante el proceso de obtención, lo registramos en la consola y respondemos con un código de estado 500.
			console.error("Error al obtener las sesiones de respiración:", error);
			res
				.status(500)
				.json({ message: "Error al obtener las sesiones de respiración" });
		}
	},

	// Este método es responsable de actualizar una sesión de respiración existente en la base de datos.
	// Recibe el ID de la sesión a actualizar como un parámetro en la URL (req.params.id) y los datos actualizados en el cuerpo de la solicitud (req.body).
	// Si la sesión se actualiza correctamente, devuelve la sesión actualizada.
	updateBreathingSession: async (req, res) => {
		try {
			// Extraemos el ID de la sesión a actualizar de los parámetros de la URL.
			const sessionId = req.params.id;

			// Extraemos los datos actualizados del cuerpo de la solicitud.
			const updatedData = req.body;

			// Utilizamos el método findByIdAndUpdate() de Mongoose para buscar y actualizar la sesión en la base de datos.
			// El primer argumento es el ID de la sesión a actualizar.
			// El segundo argumento son los nuevos datos que se aplicarán a la sesión.
			// La opción { new: true } asegura que el documento retornado sea el actualizado.
			const updatedSession = await BreathingExerciseSession.findByIdAndUpdate(
				sessionId,
				updatedData,
				{
					new: true, // Devolver el documento actualizado en lugar del original.
				}
			);

			// Si la sesión no se encuentra en la base de datos, respondemos con un código de estado 404 (Not Found).
			if (!updatedSession) {
				return res
					.status(404)
					.json({ message: "Sesión de respiración no encontrada" });
			}

			// Si la sesión se actualiza correctamente, respondemos con un código de estado 200 (OK) y la sesión actualizada.
			res.status(200).json(updatedSession);
		} catch (error) {
			// Si ocurre un error durante el proceso de actualización, lo registramos en la consola y respondemos con un código de estado 500.
			console.error("Error al actualizar la sesión de respiración:", error);
			res
				.status(500)
				.json({ message: "Error al actualizar la sesión de respiración" });
		}
	},

	// Este método es responsable de eliminar una sesión de respiración de la base de datos utilizando su ID.
	// Recibe el ID de la sesión como un parámetro en la URL (req.params.id).
	// Si la sesión se elimina correctamente, devuelve un mensaje de confirmación.
	deleteBreathingSession: async (req, res) => {
		try {
			// Extraemos el ID de la sesión a eliminar de los parámetros de la URL.
			const sessionId = req.params.id;

			// Utilizamos el método findByIdAndDelete() de Mongoose para buscar y eliminar la sesión por su ID.
			const deletedSession = await BreathingExerciseSession.findByIdAndDelete(sessionId);

			// Si la sesión no se encuentra en la base de datos, respondemos con un código de estado 404 (Not Found).
			if (!deletedSession) {
				return res
					.status(404)
					.json({ message: "Sesión de respiración no encontrada" });
			}

			// Si la sesión se elimina correctamente, respondemos con un código de estado 200 (OK) y un mensaje de éxito.
			res
				.status(200)
				.json({ message: "Sesión de respiración eliminada correctamente" });
		} catch (error) {
			// Si ocurre un error durante el proceso de eliminación, lo registramos en la consola y respondemos con un código de estado 500.
			console.error("Error al eliminar la sesión de respiración:", error);
			res
				.status(500)
				.json({ message: "Error al eliminar la sesión de respiración" });
		}
	},
};

// Exportamos el controlador para que pueda ser utilizado en otros archivos del proyecto.
module.exports = breathSessionController;
