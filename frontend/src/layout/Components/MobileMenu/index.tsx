import React, { ReactNode } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaBars } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";
import { RiChatSmileLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineContacts } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {}

interface Items {
  key: string;
  label: string | ReactNode;
  link: string;
}

const items: Items[] = [
  {
    key: "Home",
    label: (
      <div
        className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CiHome size={25} className="dark:text-white" />
        <p className="font-semibold text-[16px] dark:text-light_gray_">Home</p>
      </div>
    ),
    link: "/",
  },
  {
    key: "Chats",
    label: (
      <div
        className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <RiChatSmileLine size={25} className="dark:text-white" />
        <p className="font-semibold text-[16px] dark:text-light_gray_">Chats</p>
      </div>
    ),
    link: "/chat",
  },
  {
    key: "Friends",
    label: (
      <div
        className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <FaUserFriends size={25} className="dark:text-white" />
        <p className="font-semibold text-[16px] dark:text-light_gray_">
          Friends
        </p>
      </div>
    ),
    link: "/friends",
  },
  {
    key: "Profile",
    label: (
      <div
        className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CgProfile size={25} className="dark:text-white" />
        <p className="font-semibold text-[16px] dark:text-light_gray_">
          Profile
        </p>
      </div>
    ),
    link: "/profile",
  },
  {
    key: "Suggestions & Contacts",
    label: (
      <div
        className="flex items-center gap-x-[10px] pl-[10px] w-full bg-white hover:bg-light_gray_ rounded-[30px] dark:bg-transparent hover:dark:bg-dark_light_bg_ transition-all duration-300 py-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <MdOutlineContacts size={25} className="dark:text-white" />
        <p className="font-semibold text-[16px] dark:text-light_gray_">
          Suggestions & Contacts
        </p>
      </div>
    ),
    link: "/suggestionAndContact",
  },
];

const MobileMenu: React.FC<MobileMenuProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="block lg:hidden !w-[50px] !h-[50px] border-[2px] border-light_border_ dark:border-dark_border_ hover:bg-primary_ hover:text-white_ duration-300 transition-all rounded-[7px] max-w-[300px] absolute top-[10px] left-[10px]">
      <DropDowns size="sm">
        <DropdownTrigger>
          <div className=" rounded-[10px] flex justify-center items-center w-full h-full">
            <FaBars size={30} className="dark:text-white_" />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="flex flex-col gap-y-[5px] w-[280px]"
          items={items}
        >
          {(item: Items) => (
            <DropdownItem
              key={item.key}
              color={"default"}
              className={`!hover:bg-transparent !p-0 !w-auto !rounded-full`}
              onClick={() => console.log(item)}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </DropDowns>
    </div>
  );
};

export default MobileMenu;
