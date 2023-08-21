import React from "react";

// import third party lib
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faMessage, faPhone, faCircleUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
  return (
    <div className="bg-primary_ fixed top-0 left-0 w-[70px] h-[100vh] flex flex-col items-center justify-center">
      <div className="p-[5px] bg-white_ w-[45px] h-[40px] top-[10px] rounded-[5px] flex justify-center items-center absolute">
        <FontAwesomeIcon
          icon={faComment}
          className="text-[30px] text-primary_ cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-y-[55px]">
        <FontAwesomeIcon icon={faMessage} className="text-[25px] text-white_ cursor-pointer" />
        <FontAwesomeIcon icon={faPhone} className="text-[25px] text-white_ cursor-pointer" />
        <FontAwesomeIcon icon={faUserGroup} className="text-[25px] text-white_ cursor-pointer" />
        <FontAwesomeIcon icon={faCircleUser} className="text-[25px] text-white_ cursor-pointer" />
      </div>
    </div>
  );
};

export default MainMenu;
