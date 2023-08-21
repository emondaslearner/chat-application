import React from "react";

//** import component
import Content from "./Content";
import SideBar from "./SideBar";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div className="flex w-[95.5%] ml-[4.5%]">
      <div className="w-[30%]">
        <SideBar />
      </div>
      <div className="w-[70%]">
        <Content />
      </div>
    </div>
  );
};

export default Chat;
