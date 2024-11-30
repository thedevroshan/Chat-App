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
    setUser: (user) => {
        set(()=>({
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            profile_pic: user.profile_pic,
            bio: user.bio,
            friends: user.friends,
            links: user.links,
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
    }
}))

export default useUserStore