import axios from "axios";

const instance = axios.create({
  baseURL: "https://school.classklap.com/app/",
});

export default instance;
