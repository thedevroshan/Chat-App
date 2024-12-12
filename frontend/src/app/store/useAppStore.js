import { create } from "zustand";

const useAppStore = create((set) => ({
    isSearch: false,
    isSearching: false,
    navbarListOption: 'servers',
    setSearch: (search)=>{
        set((state)=>({
            isSearch: search
        }))
    },
    setSearching: (search)=>{
        set((state)=>({
            isSearching: search
        }))
    },
    setNavbarListOption: (option) => {
        set((state) => ({
            navbarListOption: option
        }))
    }
}))

export default useAppStore