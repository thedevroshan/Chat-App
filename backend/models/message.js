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
    file: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema)