import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";

interface PhotosStates {
  photo?: string;
}

interface VideosStates {
  video?: string;
}

interface DataStates {
  _id: string;
  title: string;
  photos: PhotosStates[];
  videos: VideosStates[];
  color: string;
  commentCount: number;
  careCount: number;
  loveCount: number;
  likeCount: number;
  angryCount: number;
  sadCount: number;
  hahaCount: number;
  wowCount: number;
}

interface PostProps {
  border?: "none";
  data?: DataStates;
}

const Post: React.FC<PostProps> = ({ border = "", data }) => {
  const profileData = useSelector((state: RootState) => state.auth);

  // reactions
  const [activeReaction, setActiveReaction] = useState<string>("");

  console.log("activeReaction", );

  return (
    <div
      className={`w-full py-3 relative ${
        border !== "none" && "border-[2px] bg-white_ dark:bg-dark_bg_"
      } border-light_border_ dark:border-dark_border_ rounded-[5px]`}
    >
      {/* post header  */}
      <div className="px-3 flex items-center justify-between w-full">
        <div className="flex items-center">
          <AvatarSingle
            src={profileData.profile_picture}
            alt="Profile picture"
          />

          <div className="ml-3">
            <div className="flex items-center">
              <p className="text-[18px] text-dark_ dark:text-white_ font-bold">
                {profileData.name}
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

      {data?.photos.length && (
        <p className="my-3 text-[16px] text-dark_ dark:text-dark_text_ px-[25px] font-semibold">
          {data?.title}
        </p>
      )}

      {!data?.photos?.length ? (
        <div
          style={{ background: `${data?.color ? data?.color : "bg-white_"}` }}
          className="w-full flex justify-center items-center py-[25px]"
        >
          <p className="max-w-[80%] mx-auto text-[25px] font-semibold">
            {data?.title}
          </p>
        </div>
      ) : (
        <div
          className={`grid ${
            data?.photos.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {data?.photos.map((photo: any, i: number) => {
            if (i > 3) {
              return "";
            }

            return (
              <>
                <img
                  className={`w-full h-full my-2 max-h-[400px] ${
                    data.photos.length > 1 &&
                    "border-[2px] border-light_border_ dark:border-dark_border_"
                  }`}
                  src={photo.photo}
                  alt="Post"
                />
              </>
            );
          })}
        </div>
      )}

      {/* like comments share */}

      <div className="flex items-center justify-between px-3 pt-3">
        <div className="min-w-[60%] flex items-center gap-x-2 flex-wrap">
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
            {data?.likeCount} <AiFillLike className="text-blue-500" size={25} />
          </p>
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center gap-x-1">
            {data?.loveCount} <FcLike className="" size={25} />
          </p>
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
            {data?.careCount}{" "}
            <img className="w-[30px] h-[30px]" src={care} alt="" />
          </p>
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center gap-x-1">
            {data?.sadCount}{" "}
            <img className="w-[20px] h-[20px]" src={sad} alt="" />
          </p>
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
            {data?.wowCount}{" "}
            <img className="w-[30px] h-[30px]" src={wow} alt="" />
          </p>
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
            {data?.hahaCount}{" "}
            <img className="w-[20px] ml-1 h-[20px]" src={haha} alt="" />
          </p>
          <p className="text-[14px] text-dark_ dark:text-dark_text_ flex items-center">
            {data?.angryCount}{" "}
            <img className="w-[30px] h-[30px]" src={angry} alt="" />
          </p>
        </div>

        {/* comments */}
        <PostView
          openButton={
            <div className="w-full flex justify-end">
              <p className="hover:!underline text-dark_ dark:text-dark_text_ font-semibold text-[15px] cursor-pointer ">
                {data?.commentCount} Comments
              </p>
            </div>
          }
        />
      </div>

      <>
        <div className="px-5 flex items-center justify-between py-3 border-b-[2px] border-t-[2px] border-light_border_ dark:border-dark_border_ mt-2">
          {/* Add reactions on post */}
          <Like reactionStatus="post" data={data} postId={data?._id} setActiveReaction={setActiveReaction} />

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
    </div>
  );
};

export default Post;
