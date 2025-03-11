import api from "./axios";

interface User {
  id: string;
  username: string;
  email: string;
}

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/users/profile");
  return response.data.data;
};
