import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
});

export const LoginApi = {
  user: (
    path: string,
    { username, password }: { username: string; password: string }
  ) => {
    const { data } = instance.post(path, {
      userName: username,
      password: password,
    });
    return data;
  },
};
