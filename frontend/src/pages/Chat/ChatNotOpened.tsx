import React from "react";

// components
import AvatarSingle from "../../components/shared/Avatar";
import Button from "../../components/shared/Button";

interface ChatNotOpenedProps {}

const ChatNotOpened: React.FC<ChatNotOpenedProps> = () => {

  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div>
        <AvatarSingle
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX21Djb_Hda4LjNL3E9ygfFjBZLI5o0BkB_A&usqp=CAU"
          alt="Profile image"
          className="!w-[100px] !h-[100px] mx-auto"
        />
        <p className="text-[25px] font-semibold text-center mt-1 dark:text-white_">
          Welcome
        </p>
        <p className="text-[18px] text-dark_gray_">
          Please select a chat to start messaging.
        </p>
        <Button className="mx-auto table mt-3" fill={false}>
          Start a Conversation
        </Button>
      </div>
    </div>
  );
};

export default ChatNotOpened;
