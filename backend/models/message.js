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
    replied_to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    replied_to_messageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    },
    replied_to_text:{
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
    },
    is_edited: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema)