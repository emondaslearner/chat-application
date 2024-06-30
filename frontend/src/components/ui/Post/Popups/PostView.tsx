import AvatarSingle from "@src/components/shared/Avatar";
import Modal from "@src/components/ui/Model";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Post from "..";
import Input from "@src/components/shared/Input";
import { IoSend } from "react-icons/io5";
import Like from "../DropDowns/Like";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { createRandomNumber } from "@src/utils";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { useMutation, useQuery } from "react-query";
import { addCommentAPI, getPostComment } from "@src/apis/comment";
import Spinner from "@src/components/shared/Spinner";
import TimeAgo from 'react-time-ago';
import "@components/shared/TimeAgo"

// images
import sad from "@assets/Emoji/sad.png";
import care from "@assets/Emoji/care.png";
import wow from "@assets/Emoji/wow.png";
import angry from "@assets/Emoji/angry.png";
import haha from "@assets/Emoji/haha.png";
import { handleAxiosError } from "@src/utils/error";
import { success } from "@src/utils/alert";
import { queryClient } from "@src/App";


interface PostViewProps {
  openButton: ReactNode;
  postId?: string;
  data?: any;
  setCommentCount?: any;
}

interface SingleCommentProps {
  data: any;
  index: number;
  setComments: any;
  comment: any;
  addCommentMutation: any;
  commentLoader: boolean
}

interface CommentApiStates {
  data: any;
  isLoading: boolean;
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
  addCommentMutation,
  commentLoader
}) => {
  const [activeReaction, setActiveReaction] = useState<string>("");

  const [reply, setReply] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>("");

  const [reactions, setCommentReactions] = useState(0);

  useEffect(() => {
    if (data?.reactionCount) {
      setCommentReactions(data?.reactionCount)
    }
  }, [data])

  // reply in a comment
  const Reply = () => {

    // prev comment list
    const list = [...comment];

    addCommentMutation({ path: data?.path ? `${data?.path}/${data?._id}` : data._id, parent: data?._id, body: replyMessage });

    setComments(list);
    setReplyMessage('')

    setReply(false);
  };


  const timeAgo = data?.createdAt ? new Date(data?.createdAt) : new Date();

  return (
    <>
      <div className="flex">
        <AvatarSingle src={data?.send_by?.profile_picture} alt="Profile Picture" className="!z-50" />

        <div className="ml-2 max-w-[500px] min-w-[330px]">
          <div className="bg-light_gray_ px-6 py-2 rounded-[15px] dark:bg-dark_light_bg_ leading-5">
            <p className="font-bold text-[16px] text-dark_ dark:text-white_">
              {data?.send_by.name}
            </p>
            <p className="text-[16px] text-dark_ dark:text-dark_text_">
              {data?.message}
            </p>
          </div>

          <div className="w-full flex items-center justify-between h-[30px]">
            <div className="max-w-[230px] w-full flex items-center justify-between">
              <p className="text-[14px] text-dark_ dark:text-dark_text_"><TimeAgo date={timeAgo} /></p>

              <div className="flex items-center gap-x-[3px]">
                <Like
                  setActiveReaction={setActiveReaction}
                  reactionStatus="comment"
                  commentId={data._id}
                  reactions={reactions}
                  setPostReaction={setCommentReactions}
                  data={data}
                />

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

              <p
                onClick={() => {
                  setReply(true);
                }}
                className="text-[14px] text-dark_ dark:text-dark_text_ font-bold cursor-pointer"
              >
                Reply
              </p>
            </div>

            <div className="ml-3 flex items-center gap-x-[2px] ">
              <p className="text-dark_ dark:text-dark_text_ text-[16px]">{reactions} Reactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reply inputs */}
      {reply && (
        <div className="w-full justify-end flex py-2">
          <form onSubmit={(e) => {
            e.preventDefault();
            Reply();
          }} className="w-[93%] relative">
            <Input
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              type="text"
              className="!w-full rounded-[10px]"
              required
            />


            {
              commentLoader ? (
                <div className="absolute right-2 top-2">
                  <Spinner loaderStatus="elementLoader" loaderSize="md" />
                </div>
              ) : (
                <button type="submit" className="m-0 p-0 bg-transparent border-0">
                  <IoSend
                    className="text-primary_ absolute right-2 top-2 cursor-pointer"
                    size={25}
                  />
                </button>
              )
            }
          </form>
        </div>
      )}
    </>
  );
};

const PostView: React.FC<PostViewProps> = ({
  openButton,
  postId,
  data,
  setCommentCount
}) => {
  const closeButton = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState<any>([]);
  const [allReplies, setReplies] = useState<any>([]);

  const [message, setMessage] = useState<string>("");

  // profileData
  const profileData = useSelector((state: RootState) => state.auth);

  // theme mode
  const themeColor: 'light' | 'dark' = useSelector((state: RootState) => state.themeConfig.mode)

  // useEffect(() => {
  //   const baseComments = CommentData.filter((data: any) => !data?.parent);
  //   setComments(baseComments);
  // }, []);

  // comments

  const { data: allComments, isLoading }: CommentApiStates = useQuery({
    queryFn: () => getPostComment({ postId }),
    queryKey: [`getComments${postId}`],
    staleTime: Infinity
  });

  useEffect(() => {
    if (allComments?.data.length) {
      let allReplyComments = [];
      let allMainComments = [];
      for (let i = 0; i < allComments?.data.length; i++) {
        if (allComments?.data[i]?.parent) {
          allReplyComments.push(allComments?.data[i])
        } else {
          allMainComments.push(allComments?.data[i])
        }
      }

      setComments(allMainComments);
      setReplies(allReplyComments)
    }
  }, [allComments]);


  interface addCommentStates {
    path?: string;
    parent?: string;
    body?: string
  }

  const addComment = async ({ path, parent, body }: addCommentStates) => {
    try {
      console.log('add comment data', {
        path: path || "",
        parent: parent || "",
        message: body ? body : message,
        postId
      });

      const data = await addCommentAPI({
        path: path || "",
        parent: parent || "",
        message: body ? body : message,
        postId
      });

      return data;
    } catch (err) {
      handleAxiosError(err, themeColor);
      throw err;
    }
  }

  // add comment mutation
  const { mutate: addCommentMutation, isLoading: commentLoader } = useMutation({
    mutationFn: addComment,
    mutationKey: ['addCommentKey'],
    onSuccess: (data: any) => {
      success({ message: "Comment added successfully", themeColor })
      setCommentCount((prvState: number) => prvState + 1);
      setMessage('');

      if (!data?.data?.parent) {
        setComments([{ ...data?.data, send_by: { profile_picture: profileData.profile_picture, name: profileData.name } }, ...comments])
      } else {
        queryClient.invalidateQueries([`getComments${postId}`])
        closeButton.current?.click();
      }
    }
  })


  return (
    <Modal
      openButton={openButton}
      size="3xl"
      position="middle"
      status="custom"
      title={
        <p className="text-[20px] text-dark_ dark:text-white_ font-bold text-center w-full">
          {profileData.name} post
        </p>
      }
      dismissable={false}
      closeButton={true}
      customCloseButton={
        <div ref={closeButton} className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
    >
      <div className="max-h-[70vh] h-full overflow-y-auto relative border-t-[1px] border-light_border_ dark:border-dark_border_">
        <Post data={data} border="none" />

        <div className="mb-3 px-[30px] gap-y-3 flex flex-col">
          {
            isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner loaderStatus={"elementLoader"} />
              </div>
            ) : (
              comments.length ? (
                comments.map((data: any, index: any) => {
                  const checkDepth = data?.path
                    .split("/")
                    .filter((data: string) => data?.length);

                  // expand Reply
                  const expandReply = () => {
                    const replies = allReplies.filter(
                      (da: any) => da?.parent === data?._id
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
                        addCommentMutation={addCommentMutation}
                        commentLoader={commentLoader}
                      />

                      {data?.replyCount > 0 &&
                        comments[index + 1]?.parent !== data?._id && (
                          <p
                            onClick={expandReply}
                            className="ml-12 table text-[16px] text-dark_ dark:text-dark_text_ cursor-pointer hover:underline"
                          >
                            {data?.replyCount} replied
                          </p>
                        )}
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">There is no comments in this post</p>
                </div>
              )
            )
          }
        </div>

        {/* Comment field  */}
        <div
          className={`left-0 sticky bottom-0 w-full bg-white_ dark:bg-dark_bg_ z-[50] py-[20px] flex gap-x-1 items-center justify-center`}
        >
          <AvatarSingle src="" alt="Profile picture" className="ml-3" />
          <form onSubmit={(e) => {
            e.preventDefault();
            addCommentMutation({})
          }} className="w-[90%] mx-auto relative">
            <Input
              type="text"
              placeholder="Write a comment"
              className="w-full px-2 py-3 rounded-[10px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {
              commentLoader && message ? (
                <div className="absolute right-2 top-3">
                  <Spinner loaderStatus="elementLoader" loaderSize="md" />
                </div>
              ) : (
                <button type="submit" className="m-0 p-0 bg-transparent border-0">
                  <IoSend
                    className="text-primary_ absolute right-2 top-3 cursor-pointer"
                    size={25}
                  />
                </button>
              )
            }
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PostView;
