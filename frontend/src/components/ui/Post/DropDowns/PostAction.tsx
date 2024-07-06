import Dropdown from "@src/components/ui/Dropdown";
import React, { ReactNode } from "react";

interface PostActionProps {
  openButton: ReactNode;
}

interface Items {
  key: string;
  label: string | ReactNode;
}

const items: Items[] = [
  {
    key: "editPost",
    label: 'Edit Post',
  },
  {
    key: "delete",
    label: 'Delete Post',
  }
];

// post action
const PostAction: React.FC<PostActionProps> = ({ openButton }) => {
  return <Dropdown size="md" items={items}>{openButton}</Dropdown>;
};

export default PostAction;
