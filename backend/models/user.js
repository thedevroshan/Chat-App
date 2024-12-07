import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    profile_pic: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    links: {
        type: [
            {
                title: {
                    type: String,
                },
                url: {
                    type: String
                }
            }
        ]
    },
    created_servers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Server'
    },
    joined_servers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Server'
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    created_groups: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Group'
    },
    joined_groups: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Group'
    },
    requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'FriendRequest'
    },
    requested: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'FriendRequest'
    }
})

export const User = mongoose.model('User', userSchema)