import Button from "@src/components/shared/Button";
import DragFile from "@src/components/shared/DragFile";
import Modal from "@src/components/ui/Model";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface AddPostProps {}

const AddPost: React.FC<AddPostProps> = () => {
  return (
    <Modal
      openButton={
        <Button fill={true} className="!w-full">
          Add photos & videos
        </Button>
      }
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          Add Post
        </p>
      }
      status="custom"
      position="middle"
      size="2xl"
      closeButton={true}
      customCloseButton={
        <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
      dismissable={false}
    >
      <div className="max-h-[80vh] p-5">
        <DragFile />
      </div>
    </Modal>
  )
};

export default AddPost;
