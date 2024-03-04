import axios from "@/services/Axios";
export const updateGroupRole = async (data) => {
  const res = await axios.post(`/grouprole/grouproles`, data, {
    withCredentials: true,
  });
  return res;
};
