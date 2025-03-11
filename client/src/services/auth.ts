import api from "./axios";

export const signup = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await api.post("/auth/signup", {
    email,
    username,
    password,
  });

  return response.data.data;
};

export const signin = async (email: string, password: string) => {
  const response = await api.post("/auth/signin", {
    email,
    password,
  });

  return response.data.data;
};
