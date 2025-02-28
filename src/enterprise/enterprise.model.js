import  {Schema, model} from "mongoose"

const enterSchema = Schema({
    name:{
        type: String,
        maxLength: [50, "El nombre de su empresa es obligatorio"],
        required: [true, "El nombre es requerido"]
    },
    impact:{
        type: String,
        enum:["BAJO", "MEDIO", "ALTO"],
        default: "BAJO"
    },
    foundingDate:{
        //1990-01-01
        type: Date,
        required: [true, "La fecha de fundacion de su empresa es requerida"]
        
    },
    email:{
        type: String,
        required: [true, "El correo es requerido"]
    },
    phone:{
        type: String,
        required: [true, "Su numero de telefono es requerido"],
        max:[8, "No se admiten mas de 8 caracteres"]


    },
    category:{
        type: String,
        enum:["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "OTROS"],
        required: [true, "La categoria de su empresa es requerida"],
        default: "OTROS"
    },
    address:{
        type: String,
        required: [true, "Su direccion es requerida"],
        max: [100, "No se admiten mas de 100 caracteres"]
    },
},
{
    versionKey:false,
    timeStamps: true
})

enterSchema.methods.obtenerTrayectoria = function() {
    const currentYear = new Date().getFullYear();
    const foundingYear = this.foundingDate.getFullYear();
    return currentYear - foundingYear;
};

export default model("Enterprise", enterSchema)