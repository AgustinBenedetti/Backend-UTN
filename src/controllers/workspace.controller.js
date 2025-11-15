import ENVIROMENT from "../config/enviroment.config.js"
import { ServerError } from "../error.js"
import MemberWorkspaceRepository from "../repositories/memberworkspace.repository.js"
import UserRepository from "../repositories/user.repositorys.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import WorkspaceService from "../services/workspace.service.js"
import jwt from 'jsonwebtoken'

class WorkspaceController {
    static async getAll(request, response) {
        try {
            const user = request.user

            //Necesito el user_id del cliente para saber exactamente quien es y que lista debo darle
            const workspaces = await WorkspaceService.getAll(user.id)

            response.status(200).json({
                ok: true,
                status: 200,
                message: 'Espacios de trabajo obtenidos exitosamente',
                data: {
                    workspaces: workspaces
                }
            })
        }
        catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
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

    static async create(request, response) {
        try {
            const user = request.user

            const { name, url_image } = request.body

            const workspaces_created = await WorkspaceService.create(user.id, name, url_image)

            response.status(201).json({
                ok: true,
                status: 201,
                message: 'Workspace creado exitosamente',
                data: { workspaces_created }
            })
        }
        catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
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

    static async invite(request, response) {
        try {
            const { workspace_selected, member} = request
            const { email_invited, role } = request.body

            /*
                -Verificar que exista un usuario (en la DB) con el mail a invitar
                - Verificar que YA NO ESTE en el workspace (sino seria un member duplicado)
                - Generar un token con:
                    {
                        id_invited,
                        id_inviter,
                        id_workspace,
                        invited_role
                    }
                - Enviar el mail de invitacion, ejemplo:

                    <h1>Haz sido invitado al workspace: ${workspace_selected.name} </h1>
                    <a href= "${URL_FRONTEND}/api/member/confirm/${invite_token}">Aceptar invitacion</a>
            */

            await WorkspaceService.invite(workspace_selected, member, email_invited, role)

            response.json({
                status:200,
                ok:true,
                message:'Invitacion enviada'
            })

        }
        catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR AL INVITAR', error
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

export default WorkspaceController