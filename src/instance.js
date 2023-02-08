import axios from "axios";

const instance = axios.create({
  baseURL: "https://schoolsb0.imaxprogram.com/app/",
});

export default instance;
