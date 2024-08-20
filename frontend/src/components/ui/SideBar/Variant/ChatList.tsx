import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import TextEllipsis from "../../../shared/TextEllipsis";
import { AppDispatch, RootState } from "@src/store/store";
import { useMutation, useQuery } from "react-query";
import { setChatMessages, setChats, setChatUserData } from "@src/store/actions/chats";
import Spinner from "@src/components/shared/Spinner";
import { getAllChats } from "@src/apis/chats";
import ReactTimeAgo from "react-time-ago";
import { getAllDataFromDB, updateMultipleRecords } from "@src/utils/indexDb";
import { getSocket } from "@src/utils/socket";

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

  // states
  const [activeChat, setActiveChat] = useState<number | null>(null);

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

  useEffect(() => {
    if (data?.data) {
      dispatch(setChats(data?.data));
    }
  }, [data?.data]);

  const updateMessagesToSeen = async () => {

  }

  const { mutate: updateToSeen } = useMutation({
    mutationFn: updateMessagesToSeen,
    mutationKey: ['seenMessage']
  });

  // active chat data
  const activeChats: any = useSelector(
    (state: RootState) => state.chats.selectedChatUserData
  );

  useEffect(() => {
    const socket = getSocket();

    socket.on("seenMessage", async (data: any) => {
      const allMessages = await getAllDataFromDB();


      const chatMessages = allMessages.filter((data: any) => {
        return (data.sent_by?.id || data.sent_by) === profileData.id && (data.sent_to?.id || data.sent_to) === activeChats._id && data.status === 'delivered';
      });

      await updateMultipleRecords(chatMessages);

      if (activeChats._id === data.id) {
        const newData = getAllDataFromDB();
        dispatch(setChatMessages(newData));
      }

    })

    return () => {
      socket.off('chat message');
    };
  }, [dispatch])

  return (
    <div className="mb-[130px] !gap-y-3 flex flex-col">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner loaderStatus={"elementLoader"} />
        </div>
      ) : chats.length ? (
        chats.map((data: any, i: number) => {
          const updatedAt = profileData.id === (data?.first_user._id || data?.first_user)
            ? data?.second_user?.updatedAt
            : data?.first_user?.updatedAt
          return (
            <li
              onClick={() => {
                setActiveChat(data?._id);
                dispatch(changeChatOpenedVar(true));
                dispatch(setChatMessages([]));
                dispatch(setChatUserData(profileData.id === (data?.first_user._id || data?.first_user)
                  ? data?.second_user
                  : data?.first_user));
                setChat && setChat(true);

              }}
              key={i}
              className={`${activeChat === data?._id &&
                "bg-primary_ border-transparent !text-white_"
                } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
            >
              <AvatarSingle
                status={profileData.id === (data?.first_user._id || data?.first_user)
                  ? data?.second_user?.status
                  : data?.first_user?.status}
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
                  {
                    data?.last_message && updatedAt && <ReactTimeAgo date={new Date(updatedAt)} />
                  }
                </p>
                <TextEllipsis
                  text={
                    profileData.id === (data?.first_user._id || data?.first_user)
                      ? data?.second_user?.name
                      : data?.first_user?.name
                  }
                  className="font-semibold dark:text-white_ text-[18px]"
                  maxTextWidth={100}
                />

                <TextEllipsis
                  className={`overflow-hidden text-ellipsis ${activeChat !== data?._id && "dark:text-dark_text_"
                    }`}
                  text={
                    data?.last_message || ""
                  }
                  maxTextWidth={92}
                />
              </div>

              {activeChat !== data?._id && data?.unread_message_count !== 0 && (
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
