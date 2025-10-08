import apiClient from "./client";
import { LoginSchema } from "../schemas/login.schema";

// Asumsi respons API memiliki struktur ini
interface LoginResponse {
  token: string;
  // tambahkan properti lain jika ada, misal: user: User
}

// Fungsi untuk login user
export const login = async (credentials: LoginSchema): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    'general_auth.GeneralAuthHandler/Login', 
    credentials
  );
  return response.data;
};
