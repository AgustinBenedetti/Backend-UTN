import MemberWorkspaceRepository from "../repositories/memberworkspace.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"

class WorkspaceService {
    static async getAll(user_id) {

        const members = await MemberWorkspaceRepository.getAllByUserId(user_id)
        return members
    }

    static async create(user_id, name, url_image){
        //crear el espacio de trabajo 
        const workspace_created = await WorkspaceRepository.create(name, url_image)

        //Luego crear al miembro con rol de admin(crador del workspace
        await MemberWorkspaceRepository.create(user_id, workspace_created._id, 'admin')

        return workspace_created
    }
}

export default WorkspaceService