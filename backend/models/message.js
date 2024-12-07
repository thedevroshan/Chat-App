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
    message_type: {
        type: String,
        enum: ['text','document','media'],
        required: true
    },
    message: {
        type: String,
        default: '',
    },
    attachment: {
        type: String,
        default: ''
    }
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema)