import mongoose, {Schema} from "mongoose";

const serverSchema = new Schema({
    server_name: {
        type: String,
        required: true
    },
    server_handle: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category'
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Role'
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
    server_icon: {
        type: String,
        default: ''
    },
    server_description: {
        type: String,
        default: ''
    }
})

export const Server = mongoose.model('Server', serverSchema)