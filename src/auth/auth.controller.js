import {hash, verify} from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generar-token.js"

export const register = async(req, res) =>{
    try{

        const data = req.body;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const user = await User.create(data);

        return res.status(200).json({
            message: "Ha nacido un nuevo admin",
            name: user.name,
            email: user.email

        })

    }catch(err){
        return res.status(500).json({
            message: "Ha habido un error en el registro",
            error: err.message
        })
    }
}


export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales invalidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales invalidas",
                error: "Contrasenia incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Se ha loggeado exitosamente",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Ha habido un error en el login, server error",
            error: err.message
        })
    }
}


const crearAdmin = async () => {
    try {
      const aEmail = "admin@gmail.com"
      const aPassword = "admin123"
  
      const existingAdmin = await User.findOne({ email: aEmail })
  
      if (!existingAdmin) {
        const encryptedPassword = await hash(aPassword);
  
        const aUser = new User({

          username: "admin1",
          email: aEmail,
          password: encryptedPassword,
          role: "ADMIN_ROLE",
        });
  
        await aUser.save()
        console.log("Bienvenido a COPEREX")
      } 
    } catch (err) {
      console.error("Error al crear el admin por defecto:", err)
    }
  };
  
  export default crearAdmin;