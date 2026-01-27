import { api } from "./axios"

export const getUserCards = async () => {
    return await api.get("/cards/user")
}