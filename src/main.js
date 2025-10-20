import connectToMongoDB from "./config/configMongoDB.config.js";
import express from "express";
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import ENVIROMENT from "./config/enviroment.config.js";
import mailtransporter from "./config/mailTransporter.config.js";
import cors from 'cors';
import User from "./models/User.model.js";
connectToMongoDB()

const app = express()

//Configuro a mi api como API publica, cualquier dominio puede hacer peticiones a mis APIs

app.use(cors());

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
//mailtransporter.sendMail(
//  {
//        from: ENVIROMENT.GMAIL_USER,
//       to: "agusbenedetti50@gmail.com",
//        subject: "Mail de prueba",
//        html:  `<h1>Hola desde Node JS</h1>`
//    }
//)
 

app.listen(ENVIROMENT.PORT, 
    () =>{ console.log(`Tu servidor se esta ejecutando correctamente en el puerto ${ENVIROMENT.PORT}`)}
)