import MemberWorkspace from "../models/MemberWorspace.model.js"

class MemberWorkspaceRepository {
    static async create(user_id, workspace_id, role) {
        try {
            await MemberWorkspace.insertOne({
                id_user: user_id,
                id_workspace: workspace_id,
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

    static async getAllByUserId(user_id) {
        try{
            //.populate nos permite expandir los datos de una referencia
            const members = await MemberWorkspace.find({id_user: user_id}).populate('id_workspace')
            
            const members_list_formated = members.map( member => {
                return{
                    workspace_id: member.id_workspace._id,
                    workspace_name: member.id_workspace.name,
                    workspace_url_image: member.id_workspace.url_image,
                    workspace_role: member.role,
                    workspace_created_at: member.id_workspace.created_at,
                    member_id: member._id,
                    member_user_id: member.id_user
                }
            })

            return members_list_formated
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de Workspaces', error)
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