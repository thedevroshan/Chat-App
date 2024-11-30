import { create } from "zustand";

const useServerStore = create((set) => ({
    servers: [],
    setServer: (servers)=>{
        set(()=>({
            servers: [...servers]
        }))
    }
}))

export default useServerStore