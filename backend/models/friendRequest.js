import mongoose, {Schema} from "mongoose";

const friendRequestSchema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender_profile_pic:{
        type: String,
        required: true,
    },
    sender_username:{
        type: String,
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

export const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)