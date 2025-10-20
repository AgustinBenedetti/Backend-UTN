import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        url_image:{
            type: String,
            required: true
        },
        created_at:{
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
            default: true,
            required: true
        }
    }
)

const Workspace = mongoose.model('Workspace', workspaceSchema)

export default Workspace