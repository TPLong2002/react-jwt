import axios from "@/services/Axios";

const Login = async (valueLogin, password) => {
  return axios.post(
    "/login",
    {
      valueLogin,
      password,
    },
    { withCredentials: true }
  );
};
export default Login;
