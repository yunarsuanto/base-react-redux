import apiClient from "./client";

// Tipe data untuk User, bisa dipindahkan ke file types terpisah jika kompleks
export interface User {
  id: number;
  name: string;
  email: string;
}

// Fungsi untuk mengambil daftar pengguna
export const getUsers = async (): Promise<User[]> => {
  // Menggunakan API placeholder gratis untuk contoh
  const response = await apiClient.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
};
