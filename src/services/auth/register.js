import axios from "@/services/Axios";

const Register = async (info) => {
  return axios.post("/register", info);
};
export default Register;
