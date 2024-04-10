import { create } from "zustand"

export interface User {
    id: number
    email: string
    role: string
}

interface AuthSate {
    user: null | User
    setUser: (user: User) => void
    logoutUser: () => void
}


export const useAuthStore = create<AuthSate>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logoutUser: () => set({ user: null })
}))