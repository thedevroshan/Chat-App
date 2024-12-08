import { create } from "zustand";

const useUserStore = create((set) => ({
    _id: '',
    username: "",
    email: "",
    name: "",
    profile_pic: "",
    bio: "",
    friends: [""],
    links: [{}],
    requested: [],
    setUser: (user) => {
        set(()=>({
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            profile_pic: user.profile_pic,
            bio: user.bio,
            links: user.links,
            requested: user.requested
        }))
    },
    setUsername: (username) => {
        set((state)=>({
            username: username
        }))
    },
    setEmail: (email) => {
        set((state)=>({
            email: email
        }))
    },
    setName: (name) => {
        set((state)=>({
            name
        }))
    },
    setBio: (bio) => {
        set((state)=>({
            bio
        }))
    },
    setProfilePic: (profile_pic) => {
        set(()=>({
            profile_pic
        }))
    },
    setFriends: (friends) => {
        set(()=>({
            friends
        }))
    },
    setRequested: (requested) => {
        set(()=>({
            requested
        }))
    }
}))

export default useUserStore