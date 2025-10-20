import mongoose from "mongoose";

//Se usa para crear/definir esquemas
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        created_at:{
            type: Date,
            default: Date.now, 
            required: true
        },
        modified_at:{
            type: Date,
            default: null
        },
        active:{
            type: Boolean,
            required:true,
            default: true
        },
        verified_email: {
            type: Boolean,
            default: false
        }


    }
)

//El modelo registra el esquema para cierta entidad que luego va a ser guardada en la coleccion.
//Ej: Quiero guardar usuarios, entonces mi entidad es usuario y registro en mongoose que para la entidad usuario debera cumplir con x esquema

const User = mongoose.model('User', userSchema)

export default User