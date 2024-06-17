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

export { getUserDataByToken };
