import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notifications: [],
    showNotificationCount: true,
    setNotification: (notification)=>{
        set((state)=>({
            notifications: [...state.notifications, notification]
        }))
    },
    setNewNotificationArray: (notifications)=>{
        set((state)=>({
            notifications: [notifications]
        }))
    },
    setShowNotificationCount: (isToShow)=>{
        set((state)=>({
            showNotificationCount: isToShow
        }))
    }
}))

export default useNotificationStore