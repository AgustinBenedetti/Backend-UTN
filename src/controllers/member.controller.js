import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.config.js'
import MemberWorkspaceService from '../services/memberworkspace.service.js'
class MemberController{

    static async confirmInvitation(request, response) {
        try{
            const {invitation_token} = request.params

            await MemberWorkspaceService.confirmInvitation(invitation_token)

            response.redirect(`${ENVIROMENT.URL_FRONTEND}/login`)

        }
        catch(error){
            if(error instanceof jwt.JsonWebTokenError){
                return response.status(400).json({
                    ok: false,
                    message: 'Token inválido',
                    status: 400
                })
            }
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR AL CONFIRMAR INVITACION', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }
}

export default MemberController