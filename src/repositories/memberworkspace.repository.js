import MemberWorkspace from "../models/MemberWorspace.model"

class MemberWorkspaceRepository {
    static async create(user_id, workspace_id, role) {
        try {
            await MemberWorkspace.insertOne({
                user_id: user_id,
                workspace_id: workspace_id,
                role: role
            })
            console.log('[SERVER]: MemberWorkspaces creado con exito')
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el MemberWorkspace', error)
        }
    }

    static async getAll() {
        try{
            const membersworkspaces = await MemberWorkspace.find()
            return workspaces
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de MembersWorspaces', error)
        }
    }

    static async getById(memberworkspace_id) {
        try{    
            const memberworkspace_found = await Workspace.findById(memberworkspace_id)
            return memberworkspace_found
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el MemberWorkspaces con el id indicado ' + memberworkspace_id, error)
        }
    }

    static async deleteById (memberworkspace_id){
        try{
            const response = await MemberWorkspace.findByIdAndDelete(memberworkspace_id)
            return response
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo eliminar el MemberWorkspace con el id indicado ' + memberworkspace_id, error)
        }
    }

    static async updateById (memberworkspace_id, update_memberworkspace){

        try{
            await MemberWorkspace.findByIdAndUpdate(
                memberworkspace_id,
                update_memberworkspace
            )
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo actualizar el MemberWorkspace con el id indicado ' + memberworkspace_id, error)
        }
    }
}

export default MemberWorkspaceRepository