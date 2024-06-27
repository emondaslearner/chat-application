import AvatarSingle from "@src/components/shared/Avatar";
import Modal from "@src/components/ui/Model";
import React, { useState, useEffect, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import Post from "..";
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
import CommentData from "@src/mockData/comments/MOCK_DATA.json";
import { createRandomNumber } from "@src/utils";

interface PostViewProps {
  openButton: ReactNode
}

interface SingleCommentProps {
  data: any;
  index: number;
  setComments: any;
  comment: any;
  expandReply: any;
}

// function getVerticalDistance(elementOne: any, elementTwo: any) {
//   let distance = -1;

//   const rect1 = elementOne.getBoundingClientRect();
//   const rect2 = elementTwo.getBoundingClientRect();

//   const y1 = rect1.top;
//   const y2 = rect2.top;
//   const yDistance = y1 - y2;

//   distance = Math.abs(yDistance);

//   return distance;
// }

const SingleComment: React.FC<SingleCommentProps> = ({
  data,
  index,
  setComments,
  comment,
  expandReply
}) => {
  const [activeReaction, setActiveReaction] = useState<string>("");

  const [reply, setReply] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>("");

  // reply in a comment
  const Reply = () => {
    const randomNum = createRandomNumber();

    // prev comment list
    const list = [...comment];

    // reply content
    const createReply = {
      id: randomNum,
      path: data?.path.length ? `${data?.path}/${data?.id}` : data?.id,
      parent: data?.id,
      updatedAt: "7/2/2023",
      createdAt: "8/24/2023",
      message: replyMessage,
      replyCount: 0,
    };

    const currentData = {
      ...data,
      replyCount: data?.replyCount + 1,
    };

    list[index] = currentData;
    list.splice(index + 1, 0, createReply);

    setComments(list);
    setReplyMessage('')

    setReply(false);
  };

  return (
    <>
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

              <p
                onClick={() => {
                  expandReply();
                  setReply(true);
                }}
                className="text-[14px] text-dark_ dark:text-dark_text_ font-bold cursor-pointer"
              >
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

      {/* Reply inputs */}
      {reply && (
        <div className="w-full justify-end flex py-2">
          <div className="w-[93%] relative">
            <Input
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              type="text"
              className="!w-full rounded-[10px]"
            />

            <div className="absolute bottom-3 right-3 flex items-center">
              <IoSend
                className="text-primary_ cursor-pointer"
                size={20}
                onClick={Reply}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PostView: React.FC<PostViewProps> = ({
  openButton
}) => {
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    const baseComments = CommentData.filter((data: any) => !data?.parent);
    setComments(baseComments);
  }, []);

  return (
    <Modal
      openButton={openButton}
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
        <Post border="none" />

        <div className="mb-3 px-[30px] gap-y-3 flex flex-col">
          {comments.map((data: any, index: any) => {
            const checkDepth = data?.path
              .split("/")
              .filter((data: string) => data?.length);

            // expand Reply
            const expandReply = () => {
              const replies = CommentData.filter(
                (da: any) => da?.parent === data?.id
              );

              let newArray = [...comments];
              newArray.splice(index + 1, 0, ...replies);

              setComments(newArray);
              newArray = [];
            }

            return (
              <div
                key={index}
                style={{ marginLeft: `${checkDepth.length * 50}px` }}
                className={`relative rela`}
              >
                {/* {checkDepth.length > 0 && (
                  <div
                    style={{
                      height: `${getHeight}px`,
                    }}
                    className={`w-[30px] rounded-bl-[10px] border-l-[2px] border-b-[2px] border-light_border_ dark:border-dark_border_ absolute right-[101%] bottom-[85%] z-10`}
                  ></div>
                )} */}
                <SingleComment
                  data={data}
                  index={index}
                  setComments={setComments}
                  comment={comments}
                  expandReply={expandReply}
                />

                {data?.replyCount > 0 &&
                  comments[index + 1].parent !== data?.id && (
                    <p
                      onClick={expandReply}
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

export default PostView;
