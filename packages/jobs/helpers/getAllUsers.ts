import axios from "axios";

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_SITE_URL}/users?uniqueIdentifier=${process.env.ADMIN_USE_UNIQUE_IDENTIFIER}`,
      {
        withCredentials: true,
      }
    );
    return data.users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getAllUsers;
