import { AxiosError } from "axios";

interface ServerErrorResponse {
  message: string;
}

export const returnMessageFromAxiosErr = (err: unknown): string => {
    const axiosError = err as AxiosError<ServerErrorResponse>;
        
    if (axiosError.response?.data?.message) {
        return axiosError.response.data.message;
    }

    return String(err)
}