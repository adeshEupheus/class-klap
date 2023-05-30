import axios from "axios";

const instance = axios.create({
  // baseURL: "https://school.classklap.com/app/",
  baseURL: "https://schoolsb2.imaxprogram.com/app/",
});

export default instance;
