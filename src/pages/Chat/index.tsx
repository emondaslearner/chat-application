import React from "react";

//** import component
import Content from "@pages/Chat/Content";
import ChatSideBar from "@src/pages/Chat/ChatSideBar";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div className="flex w-[95.5%] ml-[4.5%]">
      <div className="w-[30%]">
        <ChatSideBar />
      </div>
      <div className="w-[70%]">
        <Content />
      </div>
    </div>
  );
};

export default Chat;
