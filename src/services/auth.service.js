import ENVIROMENT from "../config/enviroment.config.js";
import mailtransporter from "../config/mailTransporter.config.js";
import { ServerError } from "../error.js";
import UserRepository from "../repositories/user.repositorys.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
class AuthService{
    static async register (email, name, password){

        console.log(email, name, password)

        const user =  await UserRepository.getByEmail(email);
        if (user){
            throw new ServerError(400, 'El email ya esta en uso')
        }
        const password_hash = await bcrypt.hash(password, 12)
        const user_created = await UserRepository.create(
            name,
            email,
            password_hash
        )
        const user_id_created = user_created._id 
        //Creamos un JSON WEB TOKEN
        //Un JSON WEB TOKEN es un objeto pasado a texto con una firma (signature)
        //Vamos a enviar el JWT por URL

        //.sign()nos permite firmar un token
        const verification_token = jwt.sign(
            {
             user_id: user_id_created   
            },
            ENVIROMENT.SIGNATURE_KEY
        )

        mailtransporter.sendMail(
            {
                from: ENVIROMENT.GMAIL_USER,
                to: email,
                subject: "Verifica tu cuenta",
                html:`
                        <h1>Hola ${name}, verifica tu cuenta</h1>
                        <a href="${ENVIROMENT.URL_BACKEND}/api/auth/verify-email/${verification_token}">"Verificar"</a>
                    `
            }
        )
    }

    static async verifyEmail(verification_token){
        try{
            //Nos dice si el token esta firmado con cierta clave
            const payload =jwt.verify(verification_token, ENVIROMENT.SIGNATURE_KEY)
            const {user_id} = payload

            if(!user_id){
                throw new ServerError(400, 'Accion denegada, token con datos insuficientes')
            }
            const user_found = await UserRepository.getById(user_id)
            if(!user_found){
                throw new ServerError(404, 'Usuario no encontrado')
            }

            if(user_found.verified_email){
                throw new ServerError(400, 'El email ya se encuentra verificado')
            }
            await UserRepository.updateById(user_id, {verified_email: true})
            return
        }
        catch(error){
            //Checkeamos si el error es de la verificacion del token
            if(error instanceof jwt.JsonWebTokenError){
                throw new ServerError(400, 'Accion denegada, token invalido')
            }
        }
    }

        static async login (email, password){
        /* 
        -Buscar al usuario por email
        -Validar que exista
        -Validar que este verificado su mail
        -Comparar la password recibida con la del usuario
        -Genera un token con datos de sesion del usuario y responderlo
        */

        const user_found = await UserRepository.getByEmail(email)
        console.log(user_found)
        if(!user_found) {
            throw new ServerError(404, 'Usuario con este mail no encontrado')
        }
        
        if(!user_found.verified_email){
            throw new ServerError(401, 'Usuario con mail no verificado')
        }

        const is_same_passoword = await bcrypt.compare( password, user_found.password )
        if(!is_same_passoword){
            throw new ServerError(401, 'Contraseña invalida')
        }

        //creo un token con datos de sesion (DATOS NO SENSIBLES)
        const auth_token = jwt.sign(
            {
                name: user_found.name,
                email: user_found.email,
                id: user_found.id,
            },
            ENVIROMENT.SIGNATURE_KEY
        )

        return {
            auth_token: auth_token
        }
    }
}

export default AuthService