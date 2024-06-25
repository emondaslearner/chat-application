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

const addFriend = () => {
  return new Promise((resolve, reject) => {
    axios
      .post("")
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getFriendList, addFriend };
