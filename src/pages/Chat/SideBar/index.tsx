import React, { useEffect, useRef, useState } from "react";

//** import third party components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Input } from "reactstrap";
import { Search } from "react-feather";

//** import components
import Selects from "@shared/Select";

interface SideBarProps {}

// this is for testing purpose
interface TestData {
  id: number;
}
const testList: TestData[] = [{ id: 1 }, { id: 2 }];

const SideBar: React.FC<SideBarProps> = () => {
  // refs
  const lastMessageRef = useRef<HTMLParagraphElement>(null);

  // states
  const [lastMessageWidth, setLastMessageWidth] = useState<number>(0); // for check last message width
  const [activeChat, setActiveChat] = useState<number | null>(null) //store active check (means which chat is active now)

  useEffect(() => {
    // get last message width
    if (lastMessageRef.current?.offsetWidth) {
      // set the width in state
      setLastMessageWidth(lastMessageRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="border-r-[1px] border-l-[1px] border-dark_gray_ h-full bg-[#fafbfd]">
      {/* chat header */}
      <div className="border-b-[1px] border-dark_gray_ pb-3">
        <div className="flex justify-between w-full px-4 pt-6 pb-3">
          <p className="text-[19px] font-semibold text-dark_ mt-[-5px]">
            Chats
          </p>
          <div className="flex">
            <FontAwesomeIcon
              icon={faBell}
              className="mr-5 text-[19px] text-dark_gray_ cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="text-[19px] text-dark_gray_ cursor-pointer"
            />
          </div>
        </div>
        <div className="flex px-4 items-center justify-between">
          <Selects />
          <div className="relative w-[250px]">
            <Input
              type="text"
              className="w-full outline-none border-[1px] rounded-[5px] border-dark_gray_ py-[6px] px-2"
              placeholder="Search"
            />
            <Search
              size={18}
              className="text-dark_gray_ absolute right-[10px] top-[10px]"
            />
          </div>
        </div>
      </div>
      
      {/* chat list */}
      <div className="w-full">
        <ul className="pt-5 !gap-y-3 flex flex-col">
          {testList.map((data : TestData) => {
            return (
              <li onClick={() => setActiveChat(data?.id)} key={data?.id} className={`${activeChat === data?.id && 'bg-primary_ border-transparent !text-white_'} w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ transition-all duration-300 hover:border-primary_ cursor-pointer`}>
                <img
                  src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                  alt="profile"
                  className="w-[50px] h-[50px] min-w-[50px] rounded-full"
                />
                <div className="ml-5 relative">
                  <p className="absolute top-[-5px] right-0">Just now</p>
                  <p className="font-semibold">Emon Das</p>
                  <p className="h-[25px] overflow-hidden" ref={lastMessageRef}>
                    I am sorry I didn't catch that. Could you please tell me
                    again what you are trying to tell
                  </p>
                  {lastMessageWidth > 308 && (
                    <div className="absolute right-4 top-6">...</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
