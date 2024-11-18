import { create } from "zustand"

export interface Tenant {
    id: number
    name: string
    address: string
}

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    tenant?: Tenant
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