import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import AvatarSingle from "@src/components/shared/Avatar";
import { FaRegComments, FaShare } from "react-icons/fa";
import Input from "@src/components/shared/Input";
import { IoSend } from "react-icons/io5";
import Like from "./DropDowns/Like";
import PostView from "./Popups/PostView";

// images

import PostAction from "./DropDowns/PostAction";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import TimeAgo from 'react-time-ago';
import "@components/shared/TimeAgo"

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
  reactionCount: number;
  updatedAt: string;
}

interface PostProps {
  border?: "none";
  data?: DataStates;
}


const Post: React.FC<PostProps> = ({ border = "", data }) => {
  const profileData = useSelector((state: RootState) => state.auth);

  const [reaction, setReaction] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setReaction(data?.reactionCount);
    }
  }, [data]);

  const timeAgo = data?.updatedAt ? new Date(data?.updatedAt) : new Date();

  return (
    <div
      className={`w-full py-3 relative ${border !== "none" && "border-[2px] bg-white_ dark:bg-dark_bg_"
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
            <p className="text-dark_ dark:text-dark_text_"><TimeAgo date={timeAgo} /></p>
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
          className={`grid ${data?.photos.length > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
        >
          {data?.photos.map((photo: any, i: number) => {
            if (i > 3) {
              return "";
            }

            return (
              <>
                <img
                  className={`w-full h-full my-2 max-h-[400px] ${data.photos.length > 1 &&
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
          <p className="hover:!underline text-dark_ dark:text-dark_text_ font-semibold text-[15px]">
            {reaction}{" "}
            Reactions
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
          postId={data?._id}
          data={data}
        />
      </div>

      <>
        <div className="px-5 flex items-center justify-between py-3 border-b-[2px] border-t-[2px] border-light_border_ dark:border-dark_border_ mt-2">
          {/* Add reactions on post */}
          <Like reactionStatus="post" data={data} postId={data?._id} setPostReaction={setReaction} reactions={reaction} />

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
              postId={data?._id}
              data={data}
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
          className={`relative w-[90%] mx-auto mt-3 ${border === "none" && "hidden"
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
