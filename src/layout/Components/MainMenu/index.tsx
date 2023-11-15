import React from "react";

// images
import logo from '../../../assets/logo/logo.svg'

// import components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPhone, faCircleUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Location, useLocation, useNavigate } from "react-router-dom";
// import nav from '../../../configs/nav.config.ts'

interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
  const location: Location = useLocation()
  const navigate = useNavigate();

  return (
    <div className="bg-primary_ fixed top-0 left-0 w-[70px] h-[100vh] flex flex-col items-center justify-center">
      <div className="p-[5px] bg-white_ w-[45px] h-[40px] top-[10px] rounded-[5px] flex justify-center items-center absolute">
        <img src={logo} className="w-[60px]" alt="" />
      </div>
      <div className="flex flex-col gap-y-[55px]">
        <FontAwesomeIcon onClick={() => navigate('/chat')} icon={faMessage} className={`text-[25px] cursor-pointer ${location.pathname === '/chat' ? 'text-white_' : 'text-dark_gray_'}`} />
        <FontAwesomeIcon onClick={() => navigate('/calls')} icon={faPhone} className={`text-[25px] cursor-pointer ${location.pathname === '/calls' ? 'text-white_' : 'text-dark_gray_'}`} />
        <FontAwesomeIcon onClick={() => navigate('/friends')} icon={faUserGroup} className={`text-[25px] cursor-pointer ${location.pathname === '/friends' ? 'text-white_' : 'text-dark_gray_'}`} />
        <FontAwesomeIcon onClick={() => navigate('/profile')} icon={faCircleUser} className={`text-[25px] cursor-pointer ${location.pathname === '/profile' ? 'text-white_' : 'text-dark_gray_'}`} />
      </div>
    </div>
  );
};

export default MainMenu;
