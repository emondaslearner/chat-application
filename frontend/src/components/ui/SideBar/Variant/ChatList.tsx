import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import TextEllipsis from "../../../shared/TextEllipsis";
import { AppDispatch, RootState } from "@src/store/store";
import { useMutation, useQuery } from "react-query";
import {
  setActiveChat,
  setChatMessages,
  setChats,
  setChatUserData,
  updateChatData,
} from "@src/store/actions/chats";
import Spinner from "@src/components/shared/Spinner";
import { editChatAPI, getAllChats } from "@src/apis/chats";
import ReactTimeAgo from "react-time-ago";
import {
  addData,
  getAllDataFromDB,
  openDatabase,
  updateMultipleRecords,
} from "@src/utils/indexDb";
import { getSocket } from "@src/utils/socket";
import { handleAxiosError } from "@src/utils/error";
import { seenMessageAAPI } from "@src/apis/message";
import useBeforeUnload from "@src/hooks/useBeforeUnload";

interface ChatProps {
  setChat?: (value: boolean) => void;
  search: string;
}

const ChatList: React.FC<ChatProps> = ({ setChat, search }) => {
  // dispatch
  const dispatch: AppDispatch = useDispatch();

  // profile data
  const profileData = useSelector((state: RootState) => state.auth);

  // chat data
  const chats = useSelector((state: RootState) => state.chats.chats);

  // chat id
  const activeChat = useSelector((state: RootState) => state.chats.activeChat);

  // fetch chat data
  const { data, isLoading }: { data: any; isLoading: boolean } = useQuery({
    queryFn: () =>
      getAllChats({
        page: 1,
        limit: 100,
        sortBy: "updatedAt",
        sortType: "dsc",
        search,
      }),
    queryKey: [`userChatData${search}${profileData.id}`],
    staleTime: Infinity,
  });

  // update chatList
  const updateMessageCount = async ({
    unreadCount,
    id,
  }: {
    unreadCount: number;
    id: string;
  }) => {
    try {
      const data = await editChatAPI(unreadCount, id);

      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  const { mutate: updateChatCount } = useMutation({
    mutationFn: updateMessageCount,
    mutationKey: ["updateChats"],
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setChats(data?.data));
    }
  }, [data?.data]);

  // mode
  const mode = useSelector((state: RootState) => state.themeConfig.mode);

  // delete token from localStorage
  const deleteActiveChat = () => {
    localStorage.removeItem("activeChat");
  };
  useBeforeUnload(deleteActiveChat);

  const updateMessagesToSeen = async (id: string) => {
    try {
      const data = seenMessageAAPI({ id });
      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  const { mutate: updateToSeen } = useMutation({
    mutationFn: updateMessagesToSeen,
    mutationKey: ["seenMessage"],
  });

  // active chat data
  const activeChats = useSelector(
    (state: RootState) => state.chats.selectedChatUserData
  );

  const updateUserMessage = (status?: string) => {
    if (activeChats?._id || status) {
      console.log("status", status);
      const chatId: any = localStorage.getItem("activeChat");
      console.log("chatId", chatId);

      updateToSeen(status ? chatId : activeChats._id);
      updateChatCount({ unreadCount: 0, id: status ? chatId : activeChats._id });
    }
  };

  useEffect(() => {
    if (activeChats._id) {
      localStorage.setItem("activeChat", activeChats._id);
    }

    updateUserMessage();
  }, [activeChats]);

  useEffect(() => {
    const socket = getSocket();

    const getNewRecord = async (socketData: any, status: string) => {
      const allMessages = await getAllDataFromDB();

      const chatMessages = allMessages.filter((data: any) => {
        return status === "me"
          ? (data.sent_by?.id || data.sent_by) === profileData.id &&
          (data.sent_to?.id || data.sent_to) === socketData.id &&
          data.status === "delivered"
          : (data.sent_by?.id || data.sent_by) === socketData.id &&
          (data.sent_to?.id || data.sent_to) === profileData.id &&
          data.status === "delivered";
      });

      const newMessageStringify: any = localStorage.getItem("seenSocketData");

      const newMessage = newMessageStringify && JSON.parse(newMessageStringify);

      const theActiveChat = localStorage.getItem("activeChat");

      let allRecords = chatMessages.map((data: any) => ({
        ...data,
        status: "seen",
      }));

      if (newMessage?._id) {
        allRecords = [...allRecords, newMessage];
      }

      if (allRecords.length !== 0) {
        await updateMultipleRecords(allRecords);

        if (theActiveChat === socketData.id) {
          const newData = await getAllDataFromDB();

          const newMessages = newData.filter((data: any) => {
            const sentById = data.sent_by?._id || data.sent_by;
            const sentToId = data.sent_to?._id || data.sent_to;

            // Check if the message is between you (profileData.id) and the other person (socketData.id)
            return (
              (sentById === profileData.id && sentToId === socketData.id) ||
              (sentById === socketData.id && sentToId === profileData.id)
            );
          });

          dispatch(setChatMessages(newMessages));
        }
      }
    };

    socket.on("seenMessage", async (socketData: any) => {
      try {
        localStorage.removeItem("seenSocketData");
        getNewRecord(socketData, "me");
      } catch (err) {
        console.log("hello i am error", err);
      }
    });

    socket.on("addMessage", async (socketData: any) => {
      const theActiveChat = localStorage.getItem("activeChat");

      console.log("theActiveChat", theActiveChat);
      console.log("socketData", socketData);

      if (theActiveChat === (socketData.sent_by?._id || socketData.sent_by)) {
        console.log("Condition matched");
        localStorage.setItem(
          "seenSocketData",
          JSON.stringify({ ...socketData, status: "seen" })
        );
        await getNewRecord(
          { id: socketData.sent_by?._id || socketData.sent_by },
          "he"
        );
        await updateUserMessage("yes");
      } else {
        const db = await openDatabase();
        await addData(db, socketData);
      }
    });

    socket.on("addMessageChatData", async (socketData: any) => {
      console.log('update chat data in store', data);
      dispatch(updateChatData(socketData));
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <div className="mb-[130px] !gap-y-3 flex flex-col">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner loaderStatus={"elementLoader"} />
        </div>
      ) : chats.length ? (
        chats.map((data: any, i: number) => {
          const lastMessage = data?.last_message
            ? data?.last_message.split("/")
            : "";

          let modifiedLastMessage: string = "";
          if (lastMessage?.length) {
            if (lastMessage[0] === profileData.id) {
              modifiedLastMessage = `You: ${lastMessage[lastMessage.length - 1]
                }`;
            } else {
              modifiedLastMessage = `${lastMessage[lastMessage.length - 1]}`;
            }
          }

          return (
            <li
              onClick={() => {
                dispatch(setActiveChat(data?._id));
                dispatch(changeChatOpenedVar(true));
                dispatch(setChatMessages([]));
                dispatch(
                  setChatUserData(
                    profileData.id ===
                      (data?.first_user._id || data?.first_user)
                      ? data?.second_user
                      : data?.first_user
                  )
                );
                setChat && setChat(true);
              }}
              key={i}
              className={`${activeChat === data?._id &&
                "bg-primary_ border-transparent !text-white_"
                } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
            >
              <AvatarSingle
                status={
                  profileData.id === (data?.first_user._id || data?.first_user)
                    ? data?.second_user?.status
                    : data?.first_user?.status
                }
                src={
                  (profileData.id === (data?.first_user._id || data?.first_user)
                    ? data?.second_user?.profile_picture
                    : data?.first_user?.profile_picture) ||
                  "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
                }
                alt="profile"
                className="w-[50px] h-[50px] min-w-[50px] rounded-full"
              />
              <div className="ml-5 overflow-hidden">
                <p className="absolute top-[10px] right-[20px] dark:text-dark_text_">
                  {modifiedLastMessage &&
                    lastMessage[0] !== profileData.id &&
                    data?.updatedAt && (
                      <ReactTimeAgo date={new Date(data?.updatedAt)} />
                    )}
                </p>
                <TextEllipsis
                  text={
                    profileData.id ===
                      (data?.first_user._id || data?.first_user)
                      ? data?.second_user?.name
                      : data?.first_user?.name
                  }
                  className="font-semibold dark:text-white_ text-[18px]"
                  maxTextWidth={150}
                />

                <TextEllipsis
                  className={`overflow-hidden text-ellipsis ${activeChat !== data?._id && "dark:text-dark_text_"
                    }`}
                  text={modifiedLastMessage || ""}
                  maxTextWidth={150}
                />
              </div>

              {activeChat !== data?._id &&
                data?.unread_message_count !== 0 &&
                lastMessage[0] !== profileData.id && (
                  <div className="w-[25px] h-[25px] absolute rounded-full bg-primary_ text-white_ flex justify-center items-center bottom-[8px] right-[8px]">
                    {data?.unread_message_count}
                  </div>
                )}
            </li>
          );
        })
      ) : (
        <div className="text-center w-full flex justify-center h-[60vh] items-center">
          <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_">
            There is no chats to show
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
