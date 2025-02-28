import User from "../user/user.model.js"
import Enterprise from "../enterprise/enterprise.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya ha sido registrado`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El username ${username} ya ha sido registrado`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const enterpriseExists = async (name) => {
    const exist = await Enterprise.findOne({ name});
    if (exist) {
        throw new Error(` ${name} ya ha sido registrado en nuestra base de datos`);
    }
}  