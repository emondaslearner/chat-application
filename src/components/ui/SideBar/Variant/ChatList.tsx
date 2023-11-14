import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import TextEllipsis from "../../../shared/TextEllipsis";

interface ChatProps {}

// this is for testing purpose
interface TestData {
  id: number;
}
const testList: TestData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
}));

const ChatList: React.FC<ChatProps> = () => {

  // dispatch
  const dispatch = useDispatch();

  // states
  const [activeChat, setActiveChat] = useState<number | null>(null); //store active check (means which chat is active now)

  return (
    <div className="mb-[130px] !gap-y-3 flex flex-col">
      {testList.map((data: TestData) => {
        return (
          <li
            onClick={() => {
              setActiveChat(data?.id);
              dispatch(changeChatOpenedVar(true));
            }}
            key={data?.id}
            className={`${
              activeChat === data?.id &&
              "bg-primary_ border-transparent !text-white_"
            } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
          >
            <AvatarSingle
              src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
              alt="profile"
              className="w-[50px] h-[50px] min-w-[50px] rounded-full"
            />
            <div className="ml-5 overflow-hidden">
              <p className="absolute top-[10px] right-[20px] dark:text-dark_text_">
                Just now
              </p>
              <p className="font-semibold dark:text-white_ text-[18px]">
                Emon Das
              </p>

              <TextEllipsis
                className={`overflow-hidden text-ellipsis ${
                  activeChat !== data?.id && "dark:text-dark_text_"
                }`}
                text={
                  "I am sorry I didn't catch that. Could you please tell me again what you are trying to tell"
                }
                maxTextWidth={92}
              />
            </div>

            {activeChat !== data?.id && (
              <div className="w-[25px] h-[25px] absolute rounded-full bg-primary_ text-white_ flex justify-center items-center bottom-[8px] right-[8px]">
                3
              </div>
            )}
          </li>
        );
      })}
    </div>
  );
};

export default ChatList;
