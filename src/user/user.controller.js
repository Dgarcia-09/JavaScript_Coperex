import { hash, verify } from "argon2";
import User from "./user.model.js"


export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body; 

        const user = await User.findById(uid);

        const contraAntigua = await verify(user.password, oldPassword);

        if (!contraAntigua) {
            return res.status(400).json({
                success: false,
                message: "La contraseniaa anterior es incorrecta"
            });
        }

        const contraRepetida = await verify(user.password, newPassword);
        if (contraRepetida) {
            return res.status(400).json({
                success: false,
                message: "La nueva contrasenia no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contrasenia actualizada"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contrasenia",
            error: err.message
        });
    }
}