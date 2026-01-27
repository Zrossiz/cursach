import { api } from "./axios"

export const getAllCategories = async () => {
    return await api.get("/categories")
}