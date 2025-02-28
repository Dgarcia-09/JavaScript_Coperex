import { Router } from "express"
import { updatePassword} from "./user.controller.js"
import { updatePasswordValidator} from "../middlewares/user-validator.js"

const router = Router()

/**
 * @swagger
 * /updatePassword/{uid}:
 *   patch:
 *     summary: Actualiza la contraseña de un usuario
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: body
 *         name: body
 *         description: Datos necesarios para actualizar la contraseña
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *               description: Contraseña antigua del usuario
 *             newPassword:
 *               type: string
 *               description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Error en la solicitud (contraseña incorrecta o nueva contraseña igual a la antigua)
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

export default router