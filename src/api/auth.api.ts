import apiClient from "./client";
import { LoginSchema } from "../schemas/login.schema";
import { AuthResponse } from "@/types/general/AuthType";
import { LoginWithGoogleSchema } from "@/schemas/login_with_google.schema";

export const login = async (credentials: LoginSchema): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    '/login', 
    credentials
  );
  return response.data;
};

export const loginWithGoogle = async (credentials: LoginWithGoogleSchema): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    '/login/google', 
    credentials
  );
  return response.data;
};