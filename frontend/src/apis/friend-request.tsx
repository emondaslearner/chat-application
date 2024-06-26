import axios from "@src/axios";

interface getSingleFriendRequestProps {
  sent_by: string;
  sent_to?: string;
}

const getSingleFriendRequest = ({
  sent_by,
  sent_to,
}: getSingleFriendRequestProps) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/user/friend-request?sent_by=${sent_by}&sent_to=${sent_to}`)
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
      .delete(`/user/friend-request/${id}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getSingleFriendRequest, cancelFriendRequestAPI };
