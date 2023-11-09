import React from "react";

// import component
import Content from "./Content";
import SideBar from "../../components/ui/SideBar";
import { useSelector } from "react-redux";
import ChatNotOpened from "./ChatNotOpened";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {

  const chatOpenedOrNot = useSelector((state:any) => state?.siteConfig?.chatOpened)

  // console.log('chatOpenedOrNotchatOpenedOrNot', chatOpenedOrNot)

  return (
    <div className="w-full max-w-[2000px] mx-auto">
      <div className="ml-[70px] flex">
        <div className="w-[35%]">
          <SideBar />
        </div>
        <div className="w-[65%]">
          {
            chatOpenedOrNot ? 
            <Content /> :
            <ChatNotOpened />
          }
        </div>
      </div>
    </div>
  );
};

export default Chat;
