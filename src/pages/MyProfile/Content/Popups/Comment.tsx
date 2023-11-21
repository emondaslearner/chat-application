import AvatarSingle from "@src/components/shared/Avatar";
import Modal from "@src/components/ui/Model";
import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Post from "../Post";
import Input from "@src/components/shared/Input";
import { IoSend } from "react-icons/io5";
import Like from "../DropDowns/Like";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

// images
import sad from "@assets/Emoji/sad.png";
import care from "@assets/Emoji/care.png";
import wow from "@assets/Emoji/wow.png";
import angry from "@assets/Emoji/angry.png";
import haha from "@assets/Emoji/haha.png";

interface CommentProps {}
interface SingleCommentProps {}

const SingleComment: React.FC<SingleCommentProps> = () => {
  const [activeReaction, setActiveReaction] = useState<string>("");

  return (
    <div className="flex">
      <AvatarSingle src="" alt="Profile Picture" />

      <div className="ml-2 max-w-[300px]">
        <div className="bg-light_gray_ px-5 py-1 max-w-[300px] rounded-[15px] dark:bg-dark_light_bg_ leading-5">
          <p className="font-bold text-[16px] text-dark_ dark:text-white_">
            Emon Das
          </p>
          <p className="text-[16px] text-dark_ dark:text-dark_text_">
            Hello this is comment
          </p>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-[130px] flex items-center justify-between">
            <p className="text-[14px] text-dark_ dark:text-dark_text_">3h</p>

            <div>
              <Like
                setActiveReaction={setActiveReaction}
                reactionStatus="comment"
              />
            </div>

            <p className="text-[14px] text-dark_ dark:text-dark_text_ font-bold cursor-pointer">
              Reply
            </p>
          </div>

          <div>
            {activeReaction === "Like" && (
              <AiFillLike size={25} className="text-blue-500" />
            )}
            {activeReaction === "Love" && <FcLike size={25} />}
            {activeReaction === "Care" && (
              <img src={care} className="w-[30px] h-[30px]" alt="Care" />
            )}
            {activeReaction === "Sad" && (
              <img src={sad} className="w-[20px] h-[20px]" alt="Sad" />
            )}
            {activeReaction === "Angry" && (
              <img src={angry} className="w-[30px] h-[30px]" alt="Angry" />
            )}
            {activeReaction === "Wow" && (
              <img src={wow} className="w-[30px] h-[30px]" alt="Wow" />
            )}
            {activeReaction === "Haha" && (
              <img src={haha} className="w-[20px] h-[20px]" alt="Haha" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Comment: React.FC<CommentProps> = () => {
  return (
    <Modal
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
      size="3xl"
      position="middle"
      status="custom"
      title={
        <p className="text-[20px] text-dark_ dark:text-white_ font-bold text-center w-full">
          Emon post
        </p>
      }
      dismissable={true}
      closeButton={true}
      customCloseButton={
        <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
    >
      <div className="max-h-[70vh] h-full overflow-y-auto relative border-t-[1px] border-light_border_ dark:border-dark_border_">
        <Post border="none" viewStatus="list" />

        <div className="mb-3 px-[30px]">
          <SingleComment />
        </div>

        {/* Comment field  */}
        <div
          className={`left-0 sticky bottom-0 w-full bg-white_ dark:bg-dark_bg_ z-[50] py-[20px] flex gap-x-1 items-center justify-center`}
        >
          <AvatarSingle src="" alt="Profile picture" className="ml-3" />
          <div className="w-[90%] mx-auto relative">
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
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
