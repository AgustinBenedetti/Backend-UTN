import ENVIROMENT from "../config/enviroment.config.js"
import mailtransporter from "../config/mailTransporter.config.js"
import { ServerError } from "../error.js"
import MemberWorkspaceRepository from "../repositories/memberworkspace.repository.js"
import UserRepository from "../repositories/user.repositorys.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import jwt from 'jsonwebtoken'

class WorkspaceService {
    static async getAll(user_id) {

        const members = await MemberWorkspaceRepository.getAllByUserId(user_id)
        return members
    }

    static async create(user_id, name, url_image) {
        //crear el espacio de trabajo 
        const workspace_created = await WorkspaceRepository.create(name, url_image)

        //Luego crear al miembro con rol de admin(crador del workspace
        await MemberWorkspaceRepository.create(user_id, workspace_created._id, 'admin')

        return workspace_created
    }

    static async invite(workspace_selected, member, email_invited, role) {
        const user_invited = await UserRepository.getByEmail(email_invited)
        if (!user_invited) {
            throw new ServerError(404, 'No existe un usuario con ese email')
        }

        const alredy_member = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(user_invited._id, workspace_selected._id)
        if (alredy_member) {
            throw new ServerError(400, 'El usuario ya es miembro de este espacio de trabajo')
        }

        const invitation_token = jwt.sign(
            {
                id_invited: user_invited._id,
                id_inviter: member._id,
                id_workspace: workspace_selected._id,
                invited_role: role
            },
            ENVIROMENT.SIGNATURE_KEY,
            {
                expiresIn: '7d'
            }
        )

        await mailtransporter.sendMail(
            {
                from: ENVIROMENT.GMAIL_USER,
                to: email_invited,
                subject: ` Te invitarion a unirte al Workspace ${workspace_selected.name} `,
                html: `
                            <h1>Hola ${user_invited.name}, unite al Workspace ${workspace_selected.name}</h1>
                            <a href="${ENVIROMENT.URL_BACKEND}/api/member/confirm/${invitation_token}">"Unirme"</a>
                        `
            }
        )
    }
}

export default WorkspaceService