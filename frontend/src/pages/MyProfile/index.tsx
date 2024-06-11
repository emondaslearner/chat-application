import SideBar from "@src/components/ui/SideBar";
import React from "react";
import Content from "./Content";

interface MyProfileProps {}

const MyProfile: React.FC<MyProfileProps> = () => {
  return (
    <div className="w-full max-w-[2000px] mx-auto">
      <div className="ml-[70px] flex">
        <div className="w-[35%]">
          <SideBar />
        </div>
        <div className="w-[65%]">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
