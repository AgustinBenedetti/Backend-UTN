import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";

//Creamos una ruta de express
const authRouter = Router()


authRouter.post('/register', 
    validateRequest(registerSchema),
    AuthController.register)


authRouter.get(
    '/verify-email/:verification_token',
    AuthController.verifyEmail
)

authRouter.post(
    '/login',
    validateRequest(loginSchema),
    AuthController.login
)

export default authRouter