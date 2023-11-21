import React from "react";
import { IoMdMore } from "react-icons/io";
import AvatarSingle from "@src/components/shared/Avatar";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegComments, FaShare } from "react-icons/fa";
import sad from "@assets/Emoji/sad.png";
import care from "@assets/Emoji/care.png";
import wow from "@assets/Emoji/wow.png";
import angry from "@assets/Emoji/angry.png";
import Input from "@src/components/shared/Input";
import { IoSend } from "react-icons/io5";
import Like from "./DropDowns/Like";

interface PostProps {
  viewStatus: "list" | "grid";
}

const Post: React.FC<PostProps> = ({ viewStatus }) => {
  return (
    <div className={`${viewStatus === 'list' ? 'py-3' : 'pt-3 cursor-pointer'} w-full bg-light_gray_ dark:bg-dark_bg_ border-[2px] border-light_border_ dark:border-dark_border_ rounded-[5px]`}>
      {/* post header  */}
      <div className="px-3 flex items-center justify-between w-full">
        <div className="flex items-center">
          <AvatarSingle
            src="https://scontent.fcgp3-2.fna.fbcdn.net/v/t39.30808-6/400528726_122114094254090279_6012386613011793258_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFzr3L26Dv-NDgmr-MW3I0wst9g9rb1Owqy32D2tvU7Ci8zSgb8ULQYeI_NndUN6m5BrLO7rPunIcvSXxzZTsa1&_nc_ohc=usTUFpZ9CrAAX8U5OUh&_nc_ht=scontent.fcgp3-2.fna&oh=00_AfAbyxiQpj9K3_ii5ERPJzpiT_5hC94Yd9ep6OY14Ci6UA&oe=655A53E0"
            alt="Profile picture"
          />

          <div className="ml-2">
            <p className="text-[16px] font-semibold text-dark_ dark:text-white_">
              Emon Das
            </p>
            <p className="text-[14px] font-semibold text-dark_ dark:text-dark_text_">
              5d
            </p>
          </div>
        </div>

        <IoMdMore
          size={25}
          className="text-dark_ dark:text-dark_text_ cursor-pointer"
        />
      </div>

      {viewStatus === "list" && (
        <p className="text-[16px] text-dark_ dark:text-dark_text_ px-3 mt-1">
          This is status
        </p>
      )}

      <img
        className="w-full h-auto my-2"
        src="https://media.istockphoto.com/id/1552967838/photo/beautiful-summer-landscape-as-an-floral-background-wild-flowers-in-the-meadow-and-sunlight.webp?b=1&s=170667a&w=0&k=20&c=bLgGq2Si_D8wgzOmIzvnIzsA4XkPC0f0_0gLdfYwm6M="
        alt=""
      />

      {/* like comments share */}

      {viewStatus === "list" && (
        <div className="flex items-center justify-between px-3">
          <div className="w-[60%] flex items-center gap-x-2 flex-wrap">
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
              146 <AiFillLike className="text-blue-500" size={25} />
            </p>
            <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center gap-x-1">
              100 <FcLike className="text-blue-500" size={25} />
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
              50 <img className="w-[30px] h-[30px]" src={angry} alt="" />
            </p>
          </div>

          <p className="text-dark_ dark:text-dark_text_ font-semibold text-[15px] cursor-pointer">
            99 Comments
          </p>
        </div>
      )}

      {viewStatus === "list" && (
        <>
          <div className="px-5 flex items-center justify-between py-3 border-b-[2px] border-t-[2px] border-light_border_ dark:border-dark_border_ mt-2">
            <Like />

            <div className="flex items-center gap-x-2 cursor-pointer">
              <FaRegComments
                className="text-dark_ dark:text-dark_text_"
                size={30}
              />
              <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
                Comments
              </p>
            </div>

            <div className="flex items-center gap-x-2 cursor-pointer">
              <FaShare className="text-dark_ dark:text-dark_text_" size={30} />
              <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
                Share
              </p>
            </div>
          </div>

          <div className="relative w-[90%] mx-auto mt-3">
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
