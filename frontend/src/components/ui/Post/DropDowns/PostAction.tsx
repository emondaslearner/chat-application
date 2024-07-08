import Dropdown from "@src/components/ui/Dropdown";
import React, { ReactNode, useRef } from "react";
import Confirmation from "../Popups/Confirmation";

interface PostActionProps {
  openButton: ReactNode;
  postId: string;
  postIndex: number;
}

interface Items {
  key: string;
  label: string | ReactNode;
}


// post action
const PostAction: React.FC<PostActionProps> = ({ openButton, postId, postIndex }) => {

  const deletePopupRef = useRef<HTMLElement | null>()

  const items: Items[] = [
    {
      key: "editPost",
      label: 'Edit Post',
    },
    {
      key: "delete",
      label: (
        <p onClick={(e) => {
          e.stopPropagation();
          deletePopupRef.current?.click();
        }}>
          Delete Post
        </p>
      ),
    }
  ];



  return (
    <div>
      <Dropdown size="md" items={items}>{openButton}</Dropdown>
      <Confirmation postId={postId} deletePopupRef={deletePopupRef} postIndex={postIndex} />
    </div>
  );
};

export default PostAction;
