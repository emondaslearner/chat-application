import axios from "@src/axios";

interface getSingleFriendRequestProps {
  id?: string;
}

const getSingleFriendRequest = ({ id }: getSingleFriendRequestProps) => {
  return new Promise((resolve, reject) => {
    id
      ? axios
          .get(`/user/${id}/friend-request`)
          .then((response) => {
            resolve(response?.data);
          })
          .catch((error) => {
            reject(error);
          })
      : reject();
  });
};

interface cancelFriendRequestAPIStates {
  id?: string;
}

const cancelFriendRequestAPI = async ({ id }: cancelFriendRequestAPIStates) => {
  return new Promise((resolve, reject) => {
    id
      ? axios
          .delete(`/user/${id}/friend-request`)
          .then((response) => {
            resolve(response?.data);
          })
          .catch((error) => {
            reject(error);
          })
      : reject();
  });
};

interface acceptFriendRequestStates {
  friendId?: string;
}

const acceptFriendRequestAPI = ({ friendId }: acceptFriendRequestStates) => {
  return new Promise((resolve, reject) => {
    friendId
      ? axios
          .post(`/user/friend-requests`, {
            friendId,
          })
          .then((response) => {
            resolve(response?.data);
          })
          .catch((error) => {
            reject(error);
          })
      : reject();
  });
};

export {
  getSingleFriendRequest,
  cancelFriendRequestAPI,
  acceptFriendRequestAPI,
};
