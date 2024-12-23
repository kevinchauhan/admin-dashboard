export type Credentials = {
    email: string
    password: string
}

export type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
}

export type CreateUserData = {
    firstName: string
    lastName: string
    password: string
    email: string
    role: string
    tenantId: number
}

export type Tenant = {
    id: number
    name: string
    address: string
    createdAt: string
    updatedAt: string
}
