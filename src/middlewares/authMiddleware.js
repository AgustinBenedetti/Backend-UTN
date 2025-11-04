import ENVIROMENT from "../config/enviroment.config.js"
import { ServerError } from "../error.js"
import jwt from 'jsonwebtoken'

function authMiddleware(request, response, next) {
    try{
        const auth_header = request.headers.authorization
        if(!auth_header){
            throw new ServerError(401, 'Acceso denegado, no se recibio el header de autenticacion')
        }

        const auth_token = auth_header.split(' ')[1]
        if(!auth_token){
            throw new ServerError(401, 'Acceso denegado, no se recibio el token de autenticacion')
        }
        
        const user_session_data = jwt.verify(auth_token, ENVIROMENT.SIGNATURE_KEY)

        //Hot Point: guardamos los datos del token dentro de la request
        request.user = user_session_data
        next()
    }
    catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            response.status(400).json({
                ok:false,
                message: 'Acceso denegado, token invalido',
                status: 400
            })
        }
        else if(error instanceof jwt.TokenExpiredError){
            response.status(401).json({
                ok:false,
                message: 'Acceso denegado, token expirado',
                status: 401
            })
        }
        if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
        else{
            console.error(
                'ERROR AL OBTENER WORKSPACES', error
            )
            return response.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
                status: 500
            })
        }
    }
}

export default authMiddleware