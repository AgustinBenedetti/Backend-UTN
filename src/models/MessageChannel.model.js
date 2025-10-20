import mongoose from "mongoose"

const messageChannelSchema =  new mongoose.Schema(
    {
        id_channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            required: true
        },
        id_sender: {
            //id_workspace sera un id de mongoDB
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MemberWorkspace',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
)

const MessageChannel = mongoose.model('MessageChannel', messageChannelSchema)

export default MessageChannel