import React from "react";
import { IoMdMore } from "react-icons/io";
import AvatarSingle from "@src/components/shared/Avatar";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegComments, FaShare } from "react-icons/fa";
import Input from "@src/components/shared/Input";
import { IoSend } from "react-icons/io5";
import Like from "./DropDowns/Like";
import PostView from "./Popups/PostView";

// images

import sad from "@assets/Emoji/sad.png";
import care from "@assets/Emoji/care.png";
import wow from "@assets/Emoji/wow.png";
import angry from "@assets/Emoji/angry.png";
import haha from "@assets/Emoji/haha.png";
import PostAction from "./DropDowns/PostAction";

interface PostProps {
  viewStatus: "list" | "grid";
  border?: "none";
}

const Post: React.FC<PostProps> = ({ viewStatus, border = "" }) => {
  return (
    <div
      className={`${viewStatus === "list" ? "py-3" : "pt-3"} w-full relative ${
        border !== "none" && "border-[2px] bg-white_ dark:bg-dark_bg_"
      } border-light_border_ dark:border-dark_border_ rounded-[5px]`}
    >
      {/* post header  */}
      <div className="px-3 flex items-center justify-between w-full">
        <div className="flex items-center">
          <AvatarSingle src={""} alt="Profile picture" />

          <div className="ml-3">
            <div className="flex items-center">
              <p className="text-[18px] text-dark_ dark:text-white_ font-bold">
                Emon Das
              </p>
              <p className="text-dark_ dark:text-dark_text_ ml-2">
                is feeling happy
              </p>
            </div>
            <p className="text-dark_ dark:text-dark_text_">2h</p>
          </div>
        </div>

        <PostAction
          openButton={
            <div>
              <IoMdMore
                size={25}
                className="text-dark_ dark:text-dark_text_ cursor-pointer"
              />
            </div>
          }
        />
      </div>

      {viewStatus === "list" && (
        <p className="my-3 text-[16px] text-dark_ dark:text-dark_text_ px-[25px]">
          Hello world this is emon
        </p>
      )}

      {viewStatus === "list" ? (
        <img
          className={`w-full h-auto my-2 max-h-[400px]`}
          src="https://media.istockphoto.com/id/1552967838/photo/beautiful-summer-landscape-as-an-floral-background-wild-flowers-in-the-meadow-and-sunlight.webp?b=1&s=170667a&w=0&k=20&c=bLgGq2Si_D8wgzOmIzvnIzsA4XkPC0f0_0gLdfYwm6M="
          alt=""
        />
      ) : (
        <PostView
          openButton={
            <img
              className={`w-full h-auto my-2 max-h-[400px] cursor-pointer`}
              src="https://media.istockphoto.com/id/1552967838/photo/beautiful-summer-landscape-as-an-floral-background-wild-flowers-in-the-meadow-and-sunlight.webp?b=1&s=170667a&w=0&k=20&c=bLgGq2Si_D8wgzOmIzvnIzsA4XkPC0f0_0gLdfYwm6M="
              alt=""
            />
          }
        />
      )}

      {/* like comments share */}

      {viewStatus === "list" && (
        <div className="flex items-center justify-between px-3">
          <div className="min-w-[60%] flex items-center gap-x-2 flex-wrap">
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
              146 <AiFillLike className="text-blue-500" size={25} />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center gap-x-1">
              100 <FcLike className="" size={25} />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
              50 <img className="w-[30px] h-[30px]" src={care} alt="" />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center gap-x-1">
              50 <img className="w-[20px] h-[20px]" src={sad} alt="" />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
              50 <img className="w-[30px] h-[30px]" src={wow} alt="" />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
              50 <img className="w-[20px] ml-1 h-[20px]" src={haha} alt="" />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
              50 <img className="w-[30px] h-[30px]" src={angry} alt="" />
            </p>
          </div>

          {/* comments */}
          <PostView
            openButton={
              <div className="w-full flex justify-end">
                <p className="hover:!underline text-dark_ dark:text-dark_text_ font-semibold text-[15px] cursor-pointer ">
                  99 Comments
                </p>
              </div>
            }
          />
        </div>
      )}

      {viewStatus === "list" && (
        <>
          <div className="px-5 flex items-center justify-between py-3 border-b-[2px] border-t-[2px] border-light_border_ dark:border-dark_border_ mt-2">
            {/* Add reactions on post */}
            <Like reactionStatus="post" />

            {/* Comments */}
            <div>
              <PostView
                openButton={
                  <div className="flex items-center gap-x-2 cursor-pointer">
                    <FaRegComments
                      className="text-dark_ dark:text-dark_text_"
                      size={30}
                    />
                    <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
                      Comments
                    </p>
                  </div>
                }
              />
            </div>

            <div className="flex items-center gap-x-2 cursor-pointer">
              <FaShare className="text-dark_ dark:text-dark_text_" size={30} />
              <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
                Share
              </p>
            </div>
          </div>

          <div
            className={`relative w-[90%] mx-auto mt-3 ${
              border === "none" && "hidden"
            }`}
          >
            <Input
              type="text"
              placeholder="Write a comment"
              className="w-full px-2 py-3 rounded-[10px]"
            />

            <IoSend
              className="text-primary_ absolute right-2 top-3 cursor-pointer"
              size={25}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
