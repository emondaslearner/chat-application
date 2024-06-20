import axios from "@src/axios";
import { error } from "@src/utils/alert";

const getUserDataByToken = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/user")
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface UserData {
  dateOfBirth?: string;
  name?: string;
  email?: string;
  bio?: string;
  status?: string;
  locked?: boolean;
  profile_picture?: string;
  cover_picture?: string;
  city?: string;
  country?: string;
  themeColor: "dark" | "light";
}

const updateUserData = async (data: UserData): Promise<void> => {
  const updateData = {
    dateOfBirth: data.dateOfBirth,
    name: data.name,
    email: data.email,
    date_of_birth: data.dateOfBirth, // This seems redundant, you may want to remove it
    bio: data.bio,
    status: data.status,
    locked: data?.locked,
    profile_picture: data.profile_picture,
    cover_picture: data.cover_picture,
    address: {
      city: data.city,
      country: data.country,
    },
  };

  const themeColor = data.themeColor;

  // Check if any field has changed
  const hasChanged = Object.values(updateData).some(
    (value) => value !== undefined
  );

  if (!hasChanged) {
    error({ message: "At least one field must be changed.", themeColor });
  }

  return new Promise((resolve, reject) => {
    axios
      .get("/user")
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getUserDataByToken, updateUserData };
