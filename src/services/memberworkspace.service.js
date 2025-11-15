import jwt from 'jsonwebtoken'
import { ServerError } from '../error.js'
import ENVIROMENT from '../config/enviroment.config.js'
import MemberWorkspaceRepository from '../repositories/memberworkspace.repository.js'
class MemberWorkspaceService{
    static async confirmInvitation(invitation_token){
        const token_decode = jwt.verify(invitation_token, ENVIROMENT.SIGNATURE_KEY)
        const {id_invited, id_workspace, role} = token_decode
        
        const is_alredy_member = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(id_invited, id_workspace)
        if(is_alredy_member){
            throw new ServerError(400, 'Ya eres miembro de este espacio de trabajo')
        }
        await MemberWorkspaceRepository.create(id_invited, id_workspace, role)
    }
}

export default MemberWorkspaceService 