import React, { useEffect, useRef, ReactNode, useState } from "react";

//** import third party lib
import {
  ArrowRight,
  MoreVertical,
  Phone,
  PlusCircle,
  Smile,
} from "react-feather";
import Input from "../../../components/shared/Input";
import Dropdown from "@src/components/ui/Dropdown";
import AvatarSingle from "@src/components/shared/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { useMutation } from "react-query";
import { handleAxiosError } from "@src/utils/error";
import { sentMessageAPI } from "@src/apis/message";
import { setChatMessages, setChats, updateChatData } from "@src/store/actions/chats";
import { addData, getAllDataFromDB } from "@src/utils/indexDb";

interface ContentProps { }

interface HeaderProps {
  activeChats: any;
}

interface Items {
  key: string;
  label: string;
  icon?: ReactNode;
}
// sidebar header dropdown options
const items: Items[] = [
  {
    key: "new",
    label: "New file",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },
];

const Header: React.FC<HeaderProps> = ({ activeChats }) => {
  return (
    <div className="px-8 py-3 border-light_border_ dark:border-dark_border_ dark:bg-dark_bg_ border-b-[1px] flex justify-between h-[9%]">
      <div className="flex items-center">
        <AvatarSingle
          src={
            activeChats?.profile_picture ||
            "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
          }
          alt="Profile Pic"
          status={activeChats?.status || "offline"}
        />
        <div className="ml-3">
          <p className="text-dark_ font-semibold dark:text-white_">
            {activeChats?.name || ""}
          </p>
          <p className="mt-[0px] text-[14px] font-semibold text-dark_gray_">
            {activeChats?.status || "offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <Phone size={20} className="text-dark_gray_ cursor-pointer" />

        {/* Dropdown */}
        <Dropdown items={items}>
          <MoreVertical size={20} className="text-dark_gray_ cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
};


const Content: React.FC<ContentProps> = () => {
  // active chat data
  const activeChats: any = useSelector(
    (state: RootState) => state.chats.selectedChatUserData
  );

  // profileData
  const profileData = useSelector((state: RootState) => state.auth);

  // dispatch 
  const dispatch: AppDispatch = useDispatch();

  // refs
  const chatMainDiv = useRef<HTMLParagraphElement>(null);

  // default scroll the component to the bottom
  useEffect(() => {
    // Scroll the div to its bottom when the component mounts
    if (chatMainDiv.current) {
      setTimeout(() => {
        if (chatMainDiv.current) {
          chatMainDiv.current.scrollTop = chatMainDiv.current.scrollHeight + 100;
        }
      }, 500);
    }
  }, [chatMainDiv, activeChats]);

  // message
  const [message, setMessage] = useState<string>("");

  // theme mode
  const mode = useSelector((state: RootState) => state.themeConfig.mode);

  const sendMessageToUser = async () => {
    try {
      const data = sentMessageAPI({
        id: activeChats._id,
        message,
        replied: "",
      });

      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  // sent message
  const { mutate } = useMutation({
    mutationFn: sendMessageToUser,
    mutationKey: ["SentMessageToUser"],
    onSuccess: (data: any) => {
      const request = indexedDB.open("chats", 1);

      dispatch(updateChatData(data?.user));

      request.onupgradeneeded = (event: any) => {
        // This event is triggered when the database is being created or upgraded
        const db = event.target.result;

        if (!db.objectStoreNames.contains("messages")) {
          // Create an object store only if it does not already exist
          db.createObjectStore("messages", { keyPath: "_id" });
        }
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        addData(db, data.data);
      };

      const list = [...getAllMessages];

      list[list.length] = data.data;

      dispatch(setChatMessages(list));
      setMessage("");
    },
  });

  // fetch data from indexDb

  useEffect(() => {
    const getData = async () => {
      const allMessages = await getAllDataFromDB();

      const chatMessages = allMessages.filter((data: any) => {
        const isUserInvolved = (data.sent_by._id || data.sent_by) === profileData.id || (data.sent_to._id || data.sent_to) === profileData.id;
        const isChatActive = (data.sent_by._id || data.sent_by) === activeChats._id || (data.sent_to._id || data.sent_to) === activeChats._id;
        return isUserInvolved && isChatActive;
      });

      dispatch(setChatMessages(chatMessages));
    }

    getData();
  }, [activeChats])

  // all chats
  const getAllMessages = useSelector((state: RootState) => state.chats.userChatMessages);


  // chat data
  const chats = useSelector((state: RootState) => state.chats.chats);

  return (
    <div className="w-full h-[100vh] overflow-hidden">
      {/* chat header */}
      <Header activeChats={activeChats} />

      {/* chat body */}
      <div className="w-full h-[91%]">
        {/* main chat body */}
        <div
          ref={chatMainDiv}
          className="ls h-[90%] w-full gap-y-8 flex flex-col overflow-y-auto border-b-[1px] border-light_border_ dark:border-dark_border_ dark:bg-dark_light_bg_"
        >
          <div className=" dark:bg-dark_light_bg_ mt-[20px]">
            <AvatarSingle
              src={
                activeChats?.profile_picture ||
                "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
              }
              alt="Profile image"
              className="!w-[100px] !h-[100px] mx-auto"
            />
            <p className="text-[20px] font-semibold text-center mt-1 text-dark_text_ dark:text-white_">
              {activeChats.name}
            </p>
            <p className="text-[16px] text-dark_gray_ text-center">
              {activeChats.bio}
            </p>
          </div>
          <div className="h-full w-[95%] mx-auto px-8  gap-y-1 flex flex-col">
            {
              getAllMessages.map((chat: any, i: number) => {
                return (
                  <>
                    <div className={`${getAllMessages.length === i + 1 && '!pb-[20px] !block'}`} key={i}>
                      {
                        (chat.sent_by?._id || chat.sent_by) === profileData.id && (
                          <div className="w-full flex justify-end">
                            <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ pt-[3px] pb-3 px-2 rounded-[3px]">
                              <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px] flex items-end gap-x-[10px] pr-[50px]">
                                {chat?.message}
                              </p>
                              <span className="mb-[-10px] text-[10px] flex items-center justify-end text-deep_dark_ dark:text-dark_text_">11:20 <span className="ml-[5px]">{chat.status === 'not_delivered' ? 'Not delivered' : chat.status}</span></span>
                            </div>
                          </div>
                        )
                      }
                      {
                        (chat.sent_to?._id || chat.sent_to) === profileData.id && chat.status !== 'not_delivered' && (
                          <div className="w-full flex">
                            <div className="relative max-w-[400px] bg-primary_ pt-[3px] pb-3 px-2 rounded-[3px]">
                              <p className="text-white_ leading-5 text-[15px]">
                                {chat?.message}
                              </p>
                              <span className="mb-[-10px] text-[10px] flex items-center justify-end text-deep_dark_ dark:text-dark_text_ ml-[40px]">11:20</span>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>

        {/* send message */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();

            const newMessageObject = {
              sent_to: activeChats?._id,
              message,
              replied: "",
              sent_by: profileData.id,
              status: "not_delivered",
              createdAt: new Date(),
              updatedAt: new Date()
            };

            const list = [...getAllMessages, newMessageObject];

            dispatch(setChatMessages(list));

            setTimeout(() => {
              if (chatMainDiv.current) {
                chatMainDiv.current.scrollTop = chatMainDiv.current.scrollHeight + 100;
              }
            }, 500);

            // update chats
            const index = chats.findIndex((item: any) => {
              const isFirstUserMatch = activeChats._id === (item.first_user._id || item.first_user);
              const isSecondUserMatch = activeChats._id === (item.second_user._id || item.second_user);

              return (isFirstUserMatch || isSecondUserMatch);
            });

            if (index !== -1) {
              const firstData = chats[index];
              const chatsList = [...chats];

              // Remove the item from its current position
              chatsList.splice(index, 1);

              // Add the item to the beginning of the array
              chatsList.unshift(firstData);
              dispatch(setChats(chatsList));
            }

          }}
          className="flex items-center h-[10%] px-3 relative justify-between"
        >
          <PlusCircle
            size={20}
            className="text-dark_gray_ cursor-pointer absolute z-50"
          />
          <Input
            type="text"
            className="outline-none h-full absolute left-0 top-0 w-full pl-12"
            placeholder="Type your message here..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute z-50 right-4 flex gap-x-5 items-center">
            <Smile size={20} className="text-dark_gray_" />
            <div className="cursor-pointer bg-primary_ p-3 rounded-[50%]">
              <ArrowRight type="submit" size={30} className="text-white_" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Content;
