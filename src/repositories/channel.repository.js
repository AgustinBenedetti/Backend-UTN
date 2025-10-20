import Channel from "../models/Channel.model"

class ChannelRepository {
    static async create(workspace_id, name) {
        try {
            await Channel.insertOne({
                workspace_id: workspace_id,
                name: name
            })
            console.log('[SERVER]: Channel creado con exito')
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el Channel', error)
            throw error
        }
    }

    static async getAll() {
        try{
            const channels = await Channel.find()
            return channels
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de Channels', error)
            throw error
        }
    }

    static async getById(channel_id) {
        try{    
            const channel_found = await Channel.findById(channel_id)
            return channel_found
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el Channel con el id indicado ' + channel_id, error)
            throw error
        }
    }

    static async deleteById (channel_id){
        try{
            const response = await Channel.findByIdAndDelete(channel_id)
            return response
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo eliminar el Channel con el id indicado ' + channel_id, error)
            throw error
        }

    }

    static async updateById (channel_id, update_channel){

        try{
            await Channel.findByIdAndUpdate(
                channel_id,
                update_channel
            )
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo actualizar el Channel con el id indicado ' + channel_id, error)
            throw error
        }
    }
}

export default ChannelRepository