import React, { ReactNode, useEffect, useState } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

// images
import likeEmoji from "@assets/Emoji/like-emoji.gif";
import loveEmoji from "@assets/Emoji/love-emoji.gif";
import careEmoji from "@assets/Emoji/care-emoji.gif";
import hahaEmoji from "@assets/Emoji/haha-emoji.gif";
import angryEmoji from "@assets/Emoji/angry-emoji.gif";
import sadEmoji from "@assets/Emoji/sad-emoji.gif";
import wowEmoji from "@assets/Emoji/wow-emoji.gif";

import care from "@assets/Emoji/care.png";
import wow from "@assets/Emoji/wow.png";
import angry from "@assets/Emoji/angry.png";
import sad from "@assets/Emoji/sad.png";
import haha from "@assets/Emoji/haha.png";
import { useMutation } from "react-query";
import { error } from "@src/utils/alert";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { addReactionToPostAPI } from "@src/apis/post";

interface LikeProps {
  reactionStatus: string;
  setActiveReaction?: (e: string) => void;
  postId?: string;
}

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
  {
    key: "Wow",
    label: <img src={wowEmoji} alt="Wow" className="w-[45px] h-[45px]" />,
  },
];

const Like: React.FC<LikeProps> = ({
  reactionStatus,
  setActiveReaction,
  postId,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const [givenReaction, setReaction] = useState<string>("");

  // theme color
  const themeColor = useSelector((state: RootState) => state.themeConfig.mode);

  useEffect(() => {
    if (setActiveReaction !== undefined) {
      setActiveReaction(givenReaction);
    }
  }, [givenReaction]);

  const addReaction = async () => {
    try {
      await addReactionToPostAPI({
        reaction: givenReaction.toLowerCase(),
        postId,
      });
    } catch (err) {
      error({ message: "Unable to reaction on post. try later", themeColor });
      setReaction("");
      throw err;
    }
  };

  // reaction mutation
  const { mutate } = useMutation({
    mutationFn: addReaction,
    mutationKey: ["addReaction"],
  });

  useEffect(() => {
    if (givenReaction) {
      mutate();
    }
  }, [givenReaction]);

  return (
    <DropDowns size="sm" isOpen={isOpen} onOpenChange={(open) => setOpen(open)}>
      <DropdownTrigger>
        {/* post reactions  */}
        {reactionStatus === "post" ? (
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => {
              setOpen(!isOpen);
              setReaction(givenReaction === "" ? "Like" : "");
            }}
          >
            {givenReaction === "" && (
              <>
                <AiFillLike
                  className="text-dark_ dark:text-dark_text_"
                  size={30}
                />
                <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
                  Like
                </p>
              </>
            )}

            {givenReaction === "Like" && (
              <>
                <AiFillLike className="text-blue-500" size={30} />
                <p className="text-blue-500 font-semibold text-[18px]">Like</p>
              </>
            )}

            {givenReaction === "Love" && (
              <>
                <FcLike className="" size={30} />
                <p className="text-[#F44336] font-semibold text-[18px]">Love</p>
              </>
            )}

            {givenReaction === "Care" && (
              <>
                <img src={care} alt="care" className="w-[30px] h-[30px]" />
                <p className="text-[#FFCE00] font-semibold text-[18px]">Care</p>
              </>
            )}

            {givenReaction === "Sad" && (
              <>
                <img src={sad} alt="Sad" className="w-[20px] h-[20px]" />
                <p className="text-[#FFCE00] font-semibold text-[18px]">Sad</p>
              </>
            )}

            {givenReaction === "Wow" && (
              <>
                <img src={wow} alt="Wow" className="w-[30px] h-[30px]" />
                <p className="text-[#FFCE00] font-semibold text-[18px]">Wow</p>
              </>
            )}

            {givenReaction === "Haha" && (
              <>
                <img src={haha} alt="Haha" className="w-[20px] h-[20px]" />
                <p className="text-[#FFCE00] font-semibold text-[18px]">Haha</p>
              </>
            )}
            {givenReaction === "Angry" && (
              <>
                <img src={angry} alt="Angry" className="w-[30px] h-[30px]" />
                <p className="text-[#FF721A] font-semibold text-[18px]">
                  Angry
                </p>
              </>
            )}
          </div>
        ) : (
          // comment reaction
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => {
              setOpen(!isOpen);
              setReaction(givenReaction === "" ? "Like" : "");
            }}
          >
            {givenReaction === "" && (
              <p className="text-dark_ dark:text-dark_text_ font-bold cursor-pointer text-[14px]">
                Like
              </p>
            )}

            {givenReaction === "Like" && (
              <>
                <p className="text-blue-500 font-bold cursor-pointer text-[14px]">
                  Like
                </p>
              </>
            )}

            {givenReaction === "Love" && (
              <>
                <p className="text-[#F44336] font-bold cursor-pointer text-[14px]">
                  Love
                </p>
              </>
            )}

            {givenReaction === "Care" && (
              <>
                <p className="text-[#FFCE00] font-bold cursor-pointer text-[14px]">
                  Care
                </p>
              </>
            )}

            {givenReaction === "Sad" && (
              <>
                <p className="text-[#FFCE00] font-bold cursor-pointer text-[14px]">
                  Sad
                </p>
              </>
            )}

            {givenReaction === "Wow" && (
              <>
                <p className="text-[#FFCE00] font-bold cursor-pointer text-[14px]">
                  Wow
                </p>
              </>
            )}

            {givenReaction === "Haha" && (
              <>
                <p className="text-[#FFCE00] font-bold cursor-pointer text-[14px]">
                  Haha
                </p>
              </>
            )}
            {givenReaction === "Angry" && (
              <>
                <p className="text-[#FF721A] font-bold cursor-pointer text-[14px]">
                  Angry
                </p>
              </>
            )}
          </div>
        )}
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
            onClick={() =>
              setReaction(item.key === givenReaction ? "" : item.key)
            }
          >
            <div className="transition-all duration-300 transform hover:scale-125 relative group">
              {item.label}
              <div
                className={`hidden group-hover:!block bg-dark_ px-3 py-1 dark:bg-dark_light_bg_ absolute bottom-[130%] left-[-10%] rounded-[10px]`}
              >
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
