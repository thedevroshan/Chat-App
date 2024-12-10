import mongoose, {Schema} from "mongoose";

const conversationIdSchema = new Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
}, {timestamps: true})

export const ConversationId = mongoose.model('ConversationId', conversationIdSchema)