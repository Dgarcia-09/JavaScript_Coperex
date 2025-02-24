import { Schema, model} from "mongoose";

const userSchema = Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contrasenia es requerida"]
    },

    role:{
        type: String,
        default:"ADMIN_ROLE"
    },

},
{
    versionKey: false,
    timeStamps: true
})

export default model("User", userSchema)