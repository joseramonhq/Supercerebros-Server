// Importamos el modelo BreathingExerciseSession desde el archivo correspondiente en la carpeta de modelos.
// Este modelo representa la estructura y los métodos asociados a las sesiones de respiración en la base de datos.
const BreathingExerciseSession = require("../models/breathSession");

const breathSessionController = {
	
	// Este método es responsable de crear una nueva sesión de respiración en la base de datos.
	// Recibe como entrada un objeto de solicitud (req) que contiene los datos de la sesión en el cuerpo de la solicitud (req.body).
	// El objeto de respuesta (res) se utiliza para enviar la respuesta al cliente.
	createBreathingSession: async (req, res) => {
		try {
			const {
				childId,
				inhaleDuration,
				holdBreathDuration,
				exhaleDuration,
				pauseDuration,
				totalDuration,
				completed,
			} = req.body;
	
			if (
				!childId ||
				inhaleDuration === undefined ||
				holdBreathDuration === undefined ||
				exhaleDuration === undefined ||
				pauseDuration === undefined ||
				totalDuration === undefined ||
				completed === undefined
			) {
				return res.status(400).json({ message: "Faltan campos obligatorios." });
			}
	
			const newSession = new BreathingExerciseSession({
				childId,
				inhaleDuration,
				holdBreathDuration,
				exhaleDuration,
				pauseDuration,
				totalDuration,
				completed,
			});
	
			const savedSession = await newSession.save();
	
			// Modificación aquí: enviar la sesión directamente sin envolverla en "session"
			res.status(201).json(savedSession);
		} catch (error) {
			console.error("Error al crear la sesión de respiración:", error);
			res.status(500).json({ message: "Error al crear la sesión de respiración" });
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
