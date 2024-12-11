import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notifications: [],
    setNotification: (notification)=>{
        set((state)=>({
            notifications: [...state.notifications, notification]
        }))
    }
}))

export default useNotificationStore