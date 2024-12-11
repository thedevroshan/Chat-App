import { create } from "zustand";

const useAppStore = create((set) => ({
    isSearch: false,
    isSearching: false,
    setSearch: (search)=>{
        set((state)=>({
            isSearch: search
        }))
    },
    setSearching: (search)=>{
        set((state)=>({
            isSearching: search
        }))
    }
}))

export default useAppStore