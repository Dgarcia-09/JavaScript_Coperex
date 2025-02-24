import  {Schema, model} from "mongoose"

const enterSchema = Schema({
    name:{
        type: String,
        maxLength: [50, "El nombre de su empresa es obligatorio"],
        required: [true, "El nombre es requerido"]
    },
    impact:{
        type: String,
        enum:["LOW", "MEDIUM", "HIGHT"],
        default: "LOW"
    },
    trajectory:{
        //1990-01-01
        type: Date,
        required: [true, "La fecha es requerida"]
    },
},
{
    versionKey:false,
    timeStamps: true
})

enterSchema.methods.obtenerTrayectoria = function() {
    const currentYear = new Date();
    const Atrajectory = this.trajectory.getYear();  
    return currentYear.getYear() - Atrajectory;
};

export default model("Enterprise", enterSchema)