import AvatarSingle from "@src/components/shared/Avatar";
import Modal from "@src/components/ui/Model";
import React, { useState, useEffect, ReactNode } from "react";
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

//mock data
import CommentData from "@src/mock data/comments/MOCK_DATA.json";

interface CommentProps {}
interface SingleCommentProps {
  data: any;
}

function getElementHeight(element: any) {
  if (element === null || element === undefined) {
    return 0;
  }

  if (typeof element === "string") {
    element = document.querySelector(element);
    if (element === null || element === undefined) {
      return 0;
    }
  }

  return element.offsetHeight;
}

function getVerticalDistance(element1: any, element2: any) {
  if (!element1 || !element2) {
    return 0;
  }

  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const distance = Math.abs(rect2.top - rect1.bottom);

  return distance;
}

const SingleComment: React.FC<SingleCommentProps> = ({ data }) => {
  const [activeReaction, setActiveReaction] = useState<string>("");

  return (
    <div className="flex">
      <AvatarSingle src="" alt="Profile Picture" className="!z-50" />

      <div className="ml-2 max-w-[500px] min-w-[200px]">
        <div className="bg-light_gray_ px-5 py-1 rounded-[15px] dark:bg-dark_light_bg_ leading-5">
          <p className="font-bold text-[16px] text-dark_ dark:text-white_">
            Emon Das
          </p>
          <p className="text-[16px] text-dark_ dark:text-dark_text_">
            {data?.message}
          </p>
        </div>

        <div className="w-full flex items-center justify-between h-[30px]">
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

          <div className="">
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
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    const baseComments = CommentData.filter((data: any) => !data?.parent);
    setComments(baseComments);
  }, []);

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
      dismissable={false}
      closeButton={true}
      customCloseButton={
        <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
    >
      <div className="max-h-[70vh] h-full overflow-y-auto relative border-t-[1px] border-light_border_ dark:border-dark_border_">
        <Post border="none" viewStatus="list" />

        <div className="mb-3 px-[30px] gap-y-3 flex flex-col">
          {comments.map((data: any, index: any) => {
            const checkDepth = data?.path
              .split("/")
              .filter((data: string) => data?.length);

            const prevDepth = comments[index - 1]?.path
              .split("/")
              .filter((data: string) => data?.length);

            let parentIndex = 0;

            const parent = comments.find(
              (singleComment: any, index: number) => {
                parentIndex = index;
                return singleComment?.id === data?.parent;
              }
            );

            const parentNumber = parentIndex + 1;
            const currentChildNumber = index + 1;
            const childNumber = currentChildNumber - parentNumber;

            const currentDiv = document.querySelectorAll(".rela")[index - 1];
            const currentDivHeight = getElementHeight(currentDiv);

            let distance = 0;

            if (comments[index]?.parent && !comments[index + 1]?.parent && prevDepth.length > checkDepth.length) {
              const firstElement = document.querySelectorAll(".rela")[index];
              const secondElement =
                document.querySelectorAll(".rela")[parentIndex];
              const getDistance = getVerticalDistance(
                firstElement,
                secondElement
              );

              distance = getDistance;
            }

            return (
              <div
                key={index}
                style={{ marginLeft: `${checkDepth.length * 50}px` }}
                className={`relative rela`}
              >
                {checkDepth.length > 0 && (
                  <div
                    style={{
                      height: `${ distance ? distance - 70 : childNumber * (currentDivHeight + 5)}px`,
                    }}
                    className={`w-[30px] rounded-bl-[10px] border-l-[2px] border-b-[2px] border-light_border_ dark:border-dark_border_ absolute right-[101%] bottom-[85%] z-10`}
                  ></div>
                )}
                <SingleComment data={data} />

                {data?.replyCount > 0 &&
                  comments[index + 1].parent !== data?.id && (
                    <p
                      onClick={() => {
                        const replies = CommentData.filter(
                          (da: any) => da?.parent === data?.id
                        );

                        let newArray = [...comments];
                        newArray.splice(index + 1, 0, ...replies);

                        setComments(newArray);
                        newArray = [];
                      }}
                      className="ml-12 table text-[16px] text-dark_ dark:text-dark_text_ cursor-pointer hover:underline"
                    >
                      {data?.replyCount} replied
                    </p>
                  )}
              </div>
            );
          })}
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
