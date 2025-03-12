import { AxiosError } from "axios";

export const axiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    alert(error.response?.data);
  }
};
