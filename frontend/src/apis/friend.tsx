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
  id
}: Pagination) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/user/friends?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`
      )
      .then((response) => {
        resolve(response?.data); // Resolve with response data
      })
      .catch((error) => {
        reject(error); // Reject the promise with the error
      });
  });
};



export { getFriendList };
