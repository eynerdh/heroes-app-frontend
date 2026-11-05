import { authApi } from "../api/auth.api"
import type { AuthResponse } from "../interfaces/auth.response";


export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
  
    try {
        const { data } = await authApi.post<AuthResponse>('/auth/login', {
            email: email,
            password: password,
        })

        console.log(data);

        return data;

    } catch(error){
        console.log(error);
        throw error;
    }

};

