import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import TextEllipsis from "../../../shared/TextEllipsis";

interface FriendsListProps {
  setChat?: (value: boolean) => void;
}

// this is for testing purpose
type TestData = {
  id: number;
  name: string;
};

const names: string[] = [
  "James",
  "Emily",
  "Michael",
  "Olivia",
  "David",
  "Sophia",
  "Christopher",
  "Emma",
  "Benjamin",
  "Ava",
  "Daniel",
  "Isabella",
  "Ethan",
  "Mia",
  "Alexander",
  "Amelia",
  "Andrew",
  "Harper",
  "Matthew",
  "Abigail",
];

const testList: TestData[] = names.map((name, index) => ({
  id: index + 1,
  name,
}));

const FriendsList: React.FC<FriendsListProps> = ({ setChat }) => {
  // dispatch
  const dispatch = useDispatch();

  // states
  const [activeChat, setActiveChat] = useState<number | null>(null); //store active check (means which chat is active now)

  return (
    <>
      {testList.map((data: TestData) => {
        return (
          <li
            onClick={() => {
              setActiveChat(data?.id);
              dispatch(changeChatOpenedVar(true));
              setChat && setChat(true);
            }}
            key={data?.id}
            className={`${
              activeChat === data?.id &&
              "bg-primary_ border-transparent !text-white_"
            } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
          >
            <AvatarSingle
              src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
              alt="profile"
              className="w-[50px] h-[50px] min-w-[50px] rounded-full"
            />
            <div className="ml-5 overflow-hidden">
              <p className="font-semibold dark:text-white_ text-[18px]">
                Emon Das
              </p>

              <div className="flex items-center">
                <HiOutlineLocationMarker
                  size={20}
                  className={`${
                    activeChat === data?.id
                      ? "text-white_"
                      : "dark:text-dark_text_"
                  }`}
                />
                <TextEllipsis
                  className={`overflow-hidden text-ellipsis ml-2 ${
                    activeChat !== data?.id && "dark:text-dark_text_"
                  }`}
                  text={"1134 Ridder Park Road, San Fransisco, CA 94851"}
                  maxTextWidth={92}
                />
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default FriendsList;
