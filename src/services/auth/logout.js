import axios from "@/services/Axios";

const Logout = async () => {
  return axios.get("/logout", {
    withCredentials: true,
  });
};
export default Logout;
