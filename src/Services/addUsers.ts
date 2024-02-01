import instance from "./axiosClient";

const addUsers = async (payload: {
  firstname: string;
  lastname: string;
  dob: Date;
  cccd: number;
  address: string;
  phonenumber: number;
  bankingnumber: number;
  username: string;
  password: string;
}) => {
  try {
    const response = await instance.post("User", payload);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export { addUsers };
