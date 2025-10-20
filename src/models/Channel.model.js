import mongoose from "mongoose"

const channelSchema =  new mongoose.Schema(
    {
        id_workspace: {
            //id_workspace sera un id de mongoDB
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now,
            required: true
        },
        modified_at:{
            type: Date,
            default: null
        },
        active:{
            type: Boolean,
            default: true
        }
    }
)

const Channel = mongoose.model('Channel', channelSchema)

export default Channel
