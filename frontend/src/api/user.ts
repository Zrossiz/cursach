import { api } from "./axios"

export const userRegistration = async (email: string, password: string) => {
    return await api.post("/users/register", {
        email,
        password
    })
}

export const userLogin = async (email: string, password: string) => {
    return await api.post("/users/login", {
        email,
        password
    })
}