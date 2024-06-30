import axios from "@src/axios";

interface getPostsStates {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: string;
}

const getPostsAPI = ({
  page,
  limit,
  search,
  sortBy,
  sortType,
}: getPostsStates) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/user/posts?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortType=${sortType}`
      )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

interface addReactionToPostAPIStates {
  reaction: string;
  postId?: string;
}

const addReactionToPostAPI = ({
  reaction,
  postId,
}: addReactionToPostAPIStates) => {
  return new Promise((resolve, reject) => {
    postId
      ? axios
        .post(`/user/post/${postId}/reaction`, {
          reaction,
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


export { getPostsAPI, addReactionToPostAPI };
