import axios from "@/services/Axios";

export const getRoles = async () => {
  const res = await axios.get(`/role/roles`, { withCredentials: true });
  return res;
};
export const addRoles = async (data) => {
  const res = await axios.post(`/role/roles`, data, { withCredentials: true });
  return res;
};
export const delRoles = async (id) => {
  const data = [id];
  const res = await axios.delete(`/role/roles`, {
    data,
    withCredentials: true,
  });
  return res;
};
export const getRolesByGroup = async (id) => {
  const res = await axios.get(`/role/rolesgroup`, {
    params: { id: id },
    withCredentials: true,
  });
  return res;
};
