import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://aminiyo-second-hand-market.herokuapp.com/",
});
