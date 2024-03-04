import axios from "@/services/Axios";

export const createUser = async (data) => {
  const res = await axios.post(`/user/add`, data, {
    withCredentials: true,
  });

  return res;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`/user/delete`, {
    data: { id },
    withCredentials: true,
  });
  return res;
};
export const editUser = async (user) => {
  const res = await axios.post(`/user/update`, user, {
    withCredentials: true,
  });
  return res;
};
export const getUser = async (id) => {
  const user = await axios.get(`/user/id?id=${id}`, {
    withCredentials: true,
  });
  return user;
};
