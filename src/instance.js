import axios from "axios";

const instance = axios.create({
  baseURL: "https://school.classklap.com/app/",
  // baseURL: "https://schoolsbcontent.imaxprogram.com/app/",
});

export default instance;
