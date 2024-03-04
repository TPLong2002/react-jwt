import axios from "@/services/Axios";
// import { revalidateTag } from "next/cache";
export const getGroups = async () => {
  const res = await axios.get(`/group/groups`, {
    withCredentials: true,
  });
  return res;
};
export const addGroups = async (data) => {
  const res = await axios.post(`/group/groups`, data, {
    withCredentials: true,
  });
  return res;
};
export const delGroups = async (id) => {
  const data = [id];
  const res = await axios.delete(`/group/groups`, {
    data,
    withCredentials: true,
  });
  return res;
};
