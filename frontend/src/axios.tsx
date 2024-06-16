import axiosClient, { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { error } from "./utils/alert";

const baseURL: string = "http://localhost:6500";

const axios: AxiosInstance = axiosClient.create({
  baseURL,
});

axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (err: AxiosError) => {
      return Promise.reject(err);
    }
  );

export default axios;
