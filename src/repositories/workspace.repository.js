import Workspace from "../models/Workspace.model.js";

class WorkspaceRepository {
    static async create(name, url_image) {
        try {
            return await Workspace.insertOne({
                name: name,
                url_image: url_image
            })
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el usuario', error)
            throw error
        }
    }

    static async getAll() {
        try{
            const workspaces = await Workspace.find(
                {
                    active: true
                }
            )
            return workspaces
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de espacios de trabajo', error)
            throw error            
        }
    }

    static async getById(workspace_id) {
        try{    
            const workspace_found = await Workspace.findById(workspace_id)
            return workspace_found
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el workspace con el id indicado ' + workspace_id, error)
            throw error        
        }
    }

    static async deleteById (workspace_id){
        try{        
            const response = await Workspace.findByIdAndDelete(workspace_id)
            return response
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo eliminar el workspace con el id indicado ' + workspace_id, error)
            throw error
        }
    }

    static async updateById (workspace_id, update_workspace){

        try{        
            await Workspace.findByIdAndUpdate(
                workspace_id,
                update_workspace
            )
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo actualizar el workspace con el id indicado ' + workspace_id, error)
            throw error
        }
    }
}

export default WorkspaceRepository