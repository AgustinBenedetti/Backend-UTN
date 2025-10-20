import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";

//Que retorna? una Promise ya que es async
async function connectToMongoDB() {    
    try{
        const connection_string = ENVIROMENT.MONGO_DB_CONNECTION_STRING
        //Await hara que se espere a que se resuelva para continuar la ejecucion
        await mongoose.connect(connection_string);
        console.log('Conexion con DB Exitosa')
    }
    catch(error){
        console.log('[SERVER_ERROR]: Fallo en la Conexion', error)
    }
}

export default connectToMongoDB


