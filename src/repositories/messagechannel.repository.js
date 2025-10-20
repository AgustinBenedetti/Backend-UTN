import MessageChannel from "../models/MessageChannel.model"


class MessagesChannelRepository {
    static async create(channel_id, sender_id, content) {
        try {
            await MessageChannel.insertOne({
                id_channel: channel_id,
                id_sender: sender_id,
                content: content,
            })
            console.log('[SERVER]: Message creado con exito')
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el Message', error)
            throw error
        }
    }

    static async getAll() {
        try{
            const messages = await MessageChannel.find()
            return messages
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener la lista de Messages', error)
            throw error
        }
    }

    static async getById(message_id) {
        try{    
            const message_found = await MessageChannel.findById(message_id)
            return message_found
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo obtener el Message con el id indicado ' + message_id, error)
            throw error
        }
    }

    static async deleteById (message_id){
        try{
            const response = await MessageChannel.findByIdAndDelete(message_id)
            return response
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo eliminar el Message con el id indicado ' + message_id, error)
            throw error
        }
    }

    static async updateById (message_id, update_message){

        try{
            await MessageChannel.findByIdAndUpdate(
                message_id,
                update_message
            )
        }
        catch(error){
            console.error('[SERVER ERROR]: no se pudo actualizar el Message con el id indicado ' + message_id, error)
            throw error
        }
    }
}

export default MessagesChannelRepository