import React from "react";

// images
import logo from "../../../assets/logo/logo.svg";

// import components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faCircleUser,
  faUserGroup,
  faSun,
  faMoon,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { changeMode } from "@src/store/actions/themeConfig";
import MobileMenu from "../MobileMenu";
// import nav from '../../../configs/nav.config.ts'

interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
  const location: Location = useLocation();
  const navigate = useNavigate();

  // dispatch
  const dispatch: Dispatch = useDispatch();

  // mode status
  const mode: string = useSelector((state: any) => state?.themeConfig.mode);

  return (
    <div className={`${location.pathname === '/' ? 'bg-light_bg_' : 'bg-white_'} lg:bg-transparent dark:bg-dark_light_bg_`}>
      {/* large screen menu */}
      <div className="lg:flex hidden bg-primary_ fixed top-0 left-0 w-[70px] h-[100vh] flex-col items-center justify-center">
        <div
          onClick={() => navigate("/")}
          className="p-[5px] bg-white_ w-[45px] h-[40px] top-[10px] rounded-[5px] flex justify-center items-center absolute"
        >
          <img src={logo} className="w-[60px]" alt="" />
        </div>
        <div className="flex flex-col gap-y-[55px]">
          <FontAwesomeIcon
            onClick={() => navigate("/")}
            icon={faHouse}
            className={`text-[25px] cursor-pointer ${
              location.pathname === "/" ? "text-white_" : "text-dark_gray_"
            }`}
            title="Home"
          />
          <FontAwesomeIcon
            onClick={() => navigate("/chat")}
            icon={faMessage}
            className={`text-[25px] cursor-pointer ${
              location.pathname === "/chat" ? "text-white_" : "text-dark_gray_"
            }`}
            title="Chats"
          />
          <FontAwesomeIcon
            onClick={() => navigate("/friends")}
            icon={faUserGroup}
            className={`text-[25px] cursor-pointer ${
              location.pathname === "/friends"
                ? "text-white_"
                : "text-dark_gray_"
            }`}
            title="Friends"
          />
          <FontAwesomeIcon
            onClick={() => navigate("/profile")}
            icon={faCircleUser}
            className={`text-[25px] cursor-pointer ${
              location.pathname === "/profile"
                ? "text-white_"
                : "text-dark_gray_"
            }`}
            title="Profile"
          />
          {mode === "light" ? (
            <FontAwesomeIcon
              onClick={() => dispatch(changeMode("dark"))}
              title="Dark Mode"
              icon={faMoon}
              className={`text-[25px] cursor-pointer text-dark_gray_`}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => dispatch(changeMode("light"))}
              title="Light Mode"
              icon={faSun}
              className={`text-[25px] cursor-pointer text-dark_gray_`}
            />
          )}
        </div>
      </div>

      {/* small screens menu */}
      <MobileMenu />
    </div>
  );
};

export default MainMenu;
