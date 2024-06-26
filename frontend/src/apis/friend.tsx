import axios from "@src/axios";

interface Pagination {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: string;
  id?: string;
}

const getFriendList = ({
  limit,
  page,
  search,
  sortBy,
  sortType,
  id,
}: Pagination) => {
  return new Promise((resolve, reject) => {
    const url = id
      ? `/user/friends?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}&id=${id}`
      : `/user/friends?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`;
    axios
      .get(url)
      .then((response) => {
        resolve(response?.data); // Resolve with response data
      })
      .catch((error) => {
        reject(error); // Reject the promise with the error
      });
  });
};

interface addFriendStates {
  friendId?: string;
}

const addFriendAPI = ({ friendId }: addFriendStates) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/user/friends", {
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

interface deleteFriendAPIState {
  id?: string;
}

const deleteFriendAPI = ({ id }: deleteFriendAPIState) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/user/${id}/friend`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface getSingleFriendAPIStates {
  id? : string
}

const getSingleFriendAPI = async ({id}:getSingleFriendAPIStates) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/user/${id}/friend`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  })
};

export { getFriendList, addFriendAPI, deleteFriendAPI, getSingleFriendAPI };
