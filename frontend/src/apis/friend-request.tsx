import axios from "@src/axios";

interface getSingleFriendRequestProps {
  id?: string;
}

const getSingleFriendRequest = ({ id }: getSingleFriendRequestProps) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/user/${id}/friend-request`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface cancelFriendRequestAPIStates {
  id?: string;
}

const cancelFriendRequestAPI = async ({ id }: cancelFriendRequestAPIStates) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/user/${id}/friend-request`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface acceptFriendRequestStates {
  friendId?: string;
}

const acceptFriendRequestAPI = ({ friendId }: acceptFriendRequestStates) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/user/friend-requests`, {
        friendId,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  getSingleFriendRequest,
  cancelFriendRequestAPI,
  acceptFriendRequestAPI,
};
