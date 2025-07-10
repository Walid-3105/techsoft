import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://news-server-lyart.vercel.app",
  baseURL: "https://news-server-lyart.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
