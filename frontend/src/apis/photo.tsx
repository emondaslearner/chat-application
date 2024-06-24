import axios from "@src/axios";

interface Pagination {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: string;
  id?: string;
}

const getAllPhoto = ({
  limit,
  page,
  search,
  sortBy,
  sortType,
  id,
}: Pagination) => {
  return new Promise((resolve, reject) => {
    const url = id
      ? `/user/photos?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}&id=${id}`
      : `/user/photos?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`;
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

export { getAllPhoto };