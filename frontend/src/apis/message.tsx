import axios from "@src/axios"


interface sentMessageTypes {
  id: string;
  message: string;
  replied: string;
}

const sentMessageAPI = ({ id, message, replied }: sentMessageTypes) => {
  return new Promise((resolve, reject) => {
    axios.post(`/user/${id}/message`, {
      message,
      replied
    })
      .then((response) => {
        resolve(response?.data); // Resolve with response data
      })
      .catch((error) => {
        reject(error); // Reject the promise with the error
      });
  })
}

const seenMessageAAPI = ({ id }: { id: string }) => {
  return new Promise((resolve, reject) => {
    axios.patch(`/user/${id}/message`)
      .then((response) => {
        resolve(response?.data); // Resolve with response data
      })
      .catch((error) => {
        reject(error); // Reject the promise with the error
      });
  })
}


interface getAllMessageAPITypes {
  page: number;
  limit: number;
}

const getAllMessageAPI = ({ page, limit }: getAllMessageAPITypes) => {
  return new Promise((resolve, reject) => {
    axios.get(`/user/messages?page=${page}&limit=${limit}&sortBy=createdAt&sortType=dsc`)
      .then((response) => {
        resolve(response?.data); // Resolve with response data
      })
      .catch((error) => {
        reject(error); // Reject the promise with the error
      });
  })
}

export { sentMessageAPI, getAllMessageAPI, seenMessageAAPI };