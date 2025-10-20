import dotenv from 'dotenv' 

//Cargar las variables de entornos en process.env
dotenv.config() 

const ENVIROMENT = {
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    PORT: process.env.PORT,
    SIGNATURE_KEY: process.env.SIGNATURE_KEY,
    URL_FRONTEND: process.env.URL_FRONTEND,
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    URL_BACKEND: process.env.URL_BACKEND,
        /*DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,*/
}


export default ENVIROMENT