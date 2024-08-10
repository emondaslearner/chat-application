import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import TextEllipsis from "../../../shared/TextEllipsis";
import { AppDispatch, RootState } from "@src/store/store";
import { useQuery } from "react-query";
import { setChats } from "@src/store/actions/chats";
import Spinner from "@src/components/shared/Spinner";
import { getAllChats } from "@src/apis/chats";

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

  return (
    <div className="mb-[130px] !gap-y-3 flex flex-col">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner loaderStatus={"elementLoader"} />
        </div>
      ) : chats.length ? (
        chats.map((data: any, i: number) => {
          return (
            <li
              onClick={() => {
                setActiveChat(data?._id);
                dispatch(changeChatOpenedVar(true));
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
                  Just now
                </p>
                <TextEllipsis
                  text={
                    profileData.id === (data?.first_user._id || data?.first_user)
                      ? data?.second_user?.name
                      : data?.first_user?.name
                  }
                  className="font-semibold dark:text-white_ text-[18px]"
                  maxTextWidth={80}
                />

                <TextEllipsis
                  className={`overflow-hidden text-ellipsis ${activeChat !== data?._id && "dark:text-dark_text_"
                    }`}
                  text={
                    "I am sorry I didn't catch that. Could you please tell me again what you are trying to tell"
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
