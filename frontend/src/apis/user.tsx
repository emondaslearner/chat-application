import axios from "@src/axios";

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
  dateOfBirth?: Date | null;
  name?: string;
  email?: string;
  bio?: string;
  status?: string;
  locked?: boolean;
  profile_picture?: File | null;
  cover_picture?: File | null;
  city?: string;
  country?: string;
}

const updateUserData = async (data: UserData): Promise<void> => {
  const formData = new FormData();

  if (data.dateOfBirth)
    formData.append("date_of_birth", data.dateOfBirth.toISOString());
  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);
  if (data.bio) formData.append("bio", data.bio);
  if (data.status) formData.append("status", data.status);
  if (data.locked === false || data.locked === true)
    formData.append("locked", data.locked.toString());
  if (data.profile_picture)
    formData.append("profile_picture", data.profile_picture);
  if (data.cover_picture) formData.append("cover_picture", data.cover_picture);
  if (data.city) formData.append("city", data.city);
  if (data.country) formData.append("country", data.country);

  return new Promise((resolve, reject) => {
    axios
      .patch("/user", formData)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getUserDataByToken, updateUserData };
