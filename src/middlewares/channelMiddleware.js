import { ServerError } from "../error.js"
import ChannelRepository from "../repositories/channel.repository.js"

/*
Se antepondra en las consultas hacia
/api/workspaces/:workspace_id/channel/:channel_id

Responsabilidades:
    - Verificar que exista el channel en DB y pertenezca al workspace 
    - Guardar el channel_selected dentro del objeto request
*/
async function channelMiddleware(request, response, next) {
    try{
        const {workspace_selected, member, user} = request
        const {workspace_id, channel_id} = request.params

        const channel_selected = await ChannelRepository.getById(channel_id)
        if(!channel_selected){
            throw new ServerError(404,'No existe el canal')
        }

        const channel_found = await ChannelRepository.getByChannelIdAndWorkspaceId(channel_id, workspace_id)
        if(!channel_found){
            throw new ServerError(404,'El canal no pertenece al workspace')
        }

        request.channel_selected = channel_found

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
                    'ERROR en  channelMiddleware', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
    }
}

export default channelMiddleware