import MessagesChannelRepository from "../repositories/messagechannel.repository.js";

class MessagesService{
    static async create(channel_id, member_id, content){

        const message_created = await MessagesChannelRepository.create(channel_id, member_id, content)
        const messages_list = await MessagesChannelRepository.getAllByChannelId(channel_id)
        
        return {
            messages: messages_list,
            message_created: message_created
        }
    }

    static async getAllMessagesByChannelId(channel_id){
        const messages = await MessagesChannelRepository.getAllByChannelId(channel_id)
        return {
            messages: messages
        }
    }
}

export default MessagesService