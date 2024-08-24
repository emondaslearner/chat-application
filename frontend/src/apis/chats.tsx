import axios from "@src/axios";


interface getAllChatsDataTypes {
    page: number;
    limit: number;
    sortBy: string;
    sortType: string;
    search: string;
}

const getAllChats = ({ page, limit, sortBy, sortType, search }: getAllChatsDataTypes) => {
    return new Promise((resolve, reject) => {
        axios.get(`/user/chats?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&search=${search}`)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const editChatAPI = (unreadCount: number, id: string) => {
    return new Promise((resolve, reject) => {
        axios.patch(`/user/${id}/chat`, {
            unreadMessage: unreadCount
        })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


export { getAllChats, editChatAPI };