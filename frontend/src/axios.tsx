import axiosClient, { AxiosResponse, AxiosError, AxiosInstance } from "axios";

const baseURL: string = "http://localhost:6500";

const axios: AxiosInstance = axiosClient.create({
  baseURL,
});

const token = localStorage.getItem("token");
axios.defaults.headers.common["authorization"] = token;

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default axios;
