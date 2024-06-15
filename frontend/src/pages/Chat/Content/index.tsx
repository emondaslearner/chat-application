import React, { useEffect, useRef, ReactNode } from "react";

//** import third party lib
import {
  ArrowRight,
  MoreVertical,
  Phone,
  PlusCircle,
  Smile,
} from "react-feather";
import Input from "../../../components/shared/Input";
import Dropdown from "@src/components/ui/Dropdown";
import AvatarSingle from "@src/components/shared/Avatar";

interface ContentProps {}

interface HeaderProps {}

interface Items {
  key: string;
  label: string;
  icon?: ReactNode
}
// sidebar header dropdown options
const items: Items[] = [
  {
    key: "new",
    label: "New file",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },
];

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="px-8 py-3 border-light_border_ dark:border-dark_border_ dark:bg-dark_bg_ border-b-[1px] flex justify-between h-[9%]">
      <div className="flex items-center">
        <AvatarSingle src="https://marketplace.canva.com/EAFSZhFumYM/1/0/800w/canva-dark-red-neon-futuristic-instagram-profile-picture-C7X0FDvE02Q.jpg" alt="Profile Pic" status="online" />
        <div className="ml-3">
          <p className="text-dark_ font-semibold dark:text-white_">Emon Das</p>
          <p className="mt-[0px] text-[14px] font-semibold text-dark_gray_">
            Online
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <Phone size={20} className="text-dark_gray_ cursor-pointer" />
        
        {/* Dropdown */}
        <Dropdown
          items={items}
        >
          <MoreVertical size={20} className="text-dark_gray_ cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
};

const Content: React.FC<ContentProps> = () => {
  // refs
  const chatMainDiv = useRef<HTMLParagraphElement>(null);

  // default scroll the component to the bottom
  useEffect(() => {
    // Scroll the div to its bottom when the component mounts
    if (chatMainDiv.current) {
      chatMainDiv.current.scrollTop = chatMainDiv.current.scrollHeight;
    }
  }, []);

  return (
    <div className="w-full h-[100vh] overflow-hidden">
      {/* chat header */}
      <Header />

      {/* chat body */}
      <div className="w-full h-[91%]">
        {/* main chat body */}
        <div
          ref={chatMainDiv}
          className="ls h-[90%] w-full gap-y-8 flex flex-col overflow-y-auto border-b-[1px] border-light_border_ dark:border-dark_border_ dark:bg-dark_light_bg_"
        >
          <div className="h-full px-8 py-10">
            {/* friend messages */}
            <div className="w-full flex">
              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ py-4 px-6 rounded-[20px]">
                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px]">
                  Hello how are you
                </p>
                <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* my message */}
            <div className="w-full flex justify-end">
              <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
                <p className="text-white_ leading-5 text-[15px]">
                  Pictures will keep your audience from being bored. In order
                  for you to succeed, you need to keep them interested and
                  involved.
                </p>
                <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpaperaccess.com/full/2213426.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* friend messages */}
            <div className="w-full flex">
              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ py-4 px-6 rounded-[20px]">
                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px]">
                  Hello how are you
                </p>
                <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* my message */}
            <div className="w-full flex justify-end">
              <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
                <p className="text-white_ leading-5 text-[15px]">
                  Pictures will keep your audience from being bored. In order
                  for you to succeed, you need to keep them interested and
                  involved.
                </p>
                <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpaperaccess.com/full/2213426.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* friend messages */}
            <div className="w-full flex">
              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ py-4 px-6 rounded-[20px]">
                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px]">
                  Hello how are you
                </p>
                <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* my message */}
            <div className="w-full flex justify-end">
              <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
                <p className="text-white_ leading-5 text-[15px]">
                  Pictures will keep your audience from being bored. In order
                  for you to succeed, you need to keep them interested and
                  involved.
                </p>
                <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpaperaccess.com/full/2213426.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* friend messages */}
            <div className="w-full flex">
              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ py-4 px-6 rounded-[20px]">
                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px]">
                  Hello how are you
                </p>
                <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* my message */}
            <div className="w-full flex justify-end">
              <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
                <p className="text-white_ leading-5 text-[15px]">
                  Pictures will keep your audience from being bored. In order
                  for you to succeed, you need to keep them interested and
                  involved.
                </p>
                <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpaperaccess.com/full/2213426.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* friend messages */}
            <div className="w-full flex">
              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ py-4 px-6 rounded-[20px]">
                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px]">
                  Hello how are you
                </p>
                <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* my message */}
            <div className="w-full flex justify-end">
              <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
                <p className="text-white_ leading-5 text-[15px]">
                  Pictures will keep your audience from being bored. In order
                  for you to succeed, you need to keep them interested and
                  involved.
                </p>
                <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpaperaccess.com/full/2213426.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* friend messages */}
            <div className="w-full flex">
              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ py-4 px-6 rounded-[20px]">
                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px]">
                  Hello how are you
                </p>
                <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* my message */}
            <div className="w-full flex justify-end">
              <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
                <p className="text-white_ leading-5 text-[15px]">
                  Pictures will keep your audience from being bored. In order
                  for you to succeed, you need to keep them interested and
                  involved.
                </p>
                <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ dark:bg-dark_bg_ rounded-[50%]">
                  <img
                    className="w-[30px] h-[30px] rounded-[50%]"
                    src="https://wallpaperaccess.com/full/2213426.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* send message */}
        <div className="flex items-center h-[10%] px-3 relative justify-between">
          <PlusCircle
            size={20}
            className="text-dark_gray_ cursor-pointer absolute z-50"
          />
          <Input
            type="text"
            className="outline-none h-full absolute left-0 top-0 w-full pl-12"
            placeholder="Type your message here..."
          />
          <div className="absolute z-50 right-4 flex gap-x-5 items-center">
            <Smile size={20} className="text-dark_gray_" />
            <div className="cursor-pointer bg-primary_ p-3 rounded-[50%]">
              <ArrowRight size={30} className="text-white_" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
