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
      if (!err.response) {
        error({
          message: "Server unable to respond at this time. Please try again later",
        });
      }
      return Promise.reject(err); // Ensure the error is properly propagated
    }
  );

export default axios;
