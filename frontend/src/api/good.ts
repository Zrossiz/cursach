import { api } from "./axios"

export const getGoodById = async (id: number) => {
    return await api.get(`/goods/${id}`)
}

export const getAllGoodsByCategory = async (id: string) => {
    return await api.get(`/goods/category/${id}`)
}