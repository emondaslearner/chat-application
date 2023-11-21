import AvatarSingle from "@src/components/shared/Avatar";
import Modal from "@src/components/ui/Model";
import React from "react";
import { FaRegComments } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Post from "../Post";
import Input from "@src/components/shared/Input";
import { IoSend } from "react-icons/io5";

interface CommentProps {}
interface AllCommentsProps {}

const AllComments: React.FC<AllCommentsProps> = () => {
  return (
    <div className="mb-3 px-[30px]">
      <div className="flex">
        <AvatarSingle src="" alt="Profile Picture" />

        <div className="ml-2 max-w-[300px]">
          <div className="bg-light_gray_ px-5 py-1 max-w-[300px] rounded-[15px] dark:bg-dark_light_bg_ leading-5">
            <p className="font-bold text-[16px] text-dark_ dark:white_">
              Emon Das
            </p>
            <p className="text-[16px] text-dark_ dark:text-dark_text_">
              Hello this is comment
            </p>
          </div>

          <div className="w-[100px] flex items-center justify-between">
            <p className="text-[14px] text-dark_ dark:text-dark_text_">3h</p>

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

        <AllComments />

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
