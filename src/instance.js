import axios from "axios";

const instance = axios.create({
  // baseURL: "https://school.classklap.com/app/",
  baseURL: "https://schoolsbsm.xamcheck.com/app/",
});

export default instance;
