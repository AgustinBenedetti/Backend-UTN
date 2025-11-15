import { ServerError } from "../error.js"
import MemberWorkspaceRepository from "../repositories/memberworkspace.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"


/*Chequear que el workspace con x id exista */
/*Chequear si el cliente es un miembro de ese workspace */
/*Chequear si el miembro cuenta con el rol permitido */
function workspaceMiddleware (valid_members_roles = []){

    return async function (request, response, next) {
        
        try {
            const {workspace_id} = request.params
            const user = request.user

            const workspace_selected = await WorkspaceRepository.getById(workspace_id)

            if(!workspace_selected){
                throw new ServerError(404,'No existe el Workspace')
            }

            const member = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(user.id, workspace_id)
            if(!member){
                throw new ServerError(403,'No tienes acceso a este workspace')
            }

            if(valid_members_roles.length > 0 && !valid_members_roles.includes(member.role)){
                throw new ServerError(403,'No opuedes realizar esta accion')
            }

            //Guardamos en la request los datos del miembro
            request.member = member

            //Guardamos en la request los datos del workspace
            request.workspace_selected = workspace_selected

            next();
        }
        catch(error){
            if(error.status){
                    return response.status(error.status).json({
                        ok:false,
                        message: error.message,
                        status: error.status
                    })
                }
            else{
                console.error(
                    'ERROR en  workspacemiddleware', error
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

export default workspaceMiddleware