import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    channels: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Channel'
    },
    name: {
        type: String,
        default: '',
        required: true
    }
}, {timestamps: true})

export const Category = mongoose.model('Category', categorySchema)