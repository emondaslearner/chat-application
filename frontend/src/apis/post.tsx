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

interface addPostAPIStates {
  color?: string;
  files?: object[];
  text?: string;
}

const addPostAPI = ({ color, files, text }: addPostAPIStates) => {
  return new Promise((resolve, reject) => {
    const formData: any = new FormData();
    formData.append('title', text);
    formData.append('color', color);
  

    if(files?.length) {
      files.forEach((file, index) => {
        formData.append('photo', file);
      });
    }

    axios.post("/user/posts", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}


export { getPostsAPI, addReactionToPostAPI, addPostAPI };
