import { create } from "zustand";

const useAppStore = create((set) => ({
    isSearch: false,
    isSearching: false,
    navbarListOption: 'servers',
    isLoggedIn: false,
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
    },
    setIsLoggedIn: (isLoggedIn) => {
        set((state) => ({
            isLoggedIn: isLoggedIn
        }))
    }
}))

export default useAppStore