import React, { useState } from "react";
import SideBar from "../../components/ui/SideBar";
import Content from "./Content";

interface FriendsProps {}

const Friends: React.FC<FriendsProps> = () => {
  // friend open status
  const [chatStatus, setChatStatus] = useState<boolean>(false);

  return (
    <div className="w-full max-w-[2000px] mx-auto">
      <div className="ml-[70px] hidden lg:flex">
        <div className="w-[35%]">
          <SideBar />
        </div>
        <div className="w-[65%]">
          <Content />
        </div>
      </div>

      {chatStatus ? (
        <div className="w-[95%] mx-auto">
          <Content />
        </div>
      ) : (
        <div className="w-[95%] mx-auto">
          <SideBar setChat={setChatStatus} />
        </div>
      )}
    </div>
  );
};

export default Friends;
