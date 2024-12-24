import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replied_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    replied_text:{
        type: String,
        default: ''
    },
    message: {
        type: String,
        required: true
    },
    file: {
        type: String,
        default: ''
    },
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema)