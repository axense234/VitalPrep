// Axios Instance
import axiosInstance from "../utils/axios";

const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/users`);
    return data.users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getAllUsers;
