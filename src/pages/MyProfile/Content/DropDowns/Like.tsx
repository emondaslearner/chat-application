import React, { ReactNode, useEffect, useState } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AiFillLike } from "react-icons/ai";

// images
import likeEmoji from "@assets/Emoji/like-emoji.gif";
import loveEmoji from "@assets/Emoji/love-emoji.gif";
import careEmoji from "@assets/Emoji/care-emoji.gif";
import hahaEmoji from "@assets/Emoji/haha-emoji.gif";
import angryEmoji from "@assets/Emoji/angry-emoji.gif";
import sadEmoji from "@assets/Emoji/sad-emoji.gif";

interface LikeProps {}

interface Items {
  key: string;
  label: string | ReactNode;
}

const items: Items[] = [
  {
    key: "Like",
    label: (
      <img
        src={likeEmoji}
        alt="like"
        className="w-[40px] h-[40px] transition-all duration-300"
      />
    ),
  },
  {
    key: "Love",
    label: (
      <img
        src={loveEmoji}
        alt="love"
        className="w-[40px] h-[40px] hover:scale-125"
      />
    ),
  },
  {
    key: "Care",
    label: <img src={careEmoji} alt="care" className="w-[40px] h-[40px]" />,
  },
  {
    key: "Haha",
    label: <img src={hahaEmoji} alt="haha" className="w-[40px] h-[40px]" />,
  },
  {
    key: "Angry",
    label: <img src={angryEmoji} alt="angry" className="w-[40px] h-[40px]" />,
  },
  {
    key: "Sad",
    label: <img src={sadEmoji} alt="sad" className="w-[45px] h-[45px]" />,
  },
];

const Like: React.FC<LikeProps> = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const [activeHover, setActiveHover] = useState<string>("");

  useEffect(() => {
    console.log("activeHover", activeHover);
  }, [activeHover]);

  return (
    <DropDowns size="sm" isOpen={isOpen} onOpenChange={(open) => setOpen(open)}>
      <DropdownTrigger>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="flex items-center gap-x-2 cursor-pointer"
        >
          <AiFillLike className="text-dark_ dark:text-dark_text_" size={30} />
          <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
            Like
          </p>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="colorDropdown"
        items={items}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {(item: Items) => (
          <DropdownItem
            key={item.key}
            color={"default"}
            className={`!hover:bg-transparent !p-0 !w-auto !rounded-full`}
          >
            <div
              onMouseOver={() => setActiveHover(item.key)}
              onMouseOut={() => setActiveHover("")}
              className="transition-all duration-300 transform hover:scale-125 relative group"
            >
              {item.label}
              <div className={`hidden group-hover:!block bg-dark_ px-3 py-1 dark:bg-dark_light_bg_ absolute bottom-[130%] left-[-10%] rounded-[10px]`}>
                <p className="text-[16px] text-white_">{item.key}</p>
              </div>
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </DropDowns>
  );
};

export default Like;
