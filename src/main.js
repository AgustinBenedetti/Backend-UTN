import connectToMongoDB from "./config/configMongoDB.config.js";
import express from "express";
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import ENVIROMENT from "./config/enviroment.config.js";
import mailtransporter from "./config/mailTransporter.config.js";
import cors from 'cors';
import User from "./models/User.model.js";
import memberRouter from "./routes/member.router.js";
connectToMongoDB()

const app = express()

//Configuro a mi api como API publica, cualquier dominio puede hacer peticiones a mis APIs

app.use(cors());

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/member', memberRouter)
 

app.listen(ENVIROMENT.PORT, 
    () =>{ console.log(`Tu servidor se esta ejecutando correctamente en el puerto ${ENVIROMENT.PORT}`)}
)