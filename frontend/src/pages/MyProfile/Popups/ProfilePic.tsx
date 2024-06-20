import Button from "@src/components/shared/Button";
import Modal from "@src/components/ui/Model";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface ProfilePicProps {
  children?: ReactNode;
  title: string;
  src: string;
  setFiles: (file: File | null) => void;
}

const ProfilePic: React.FC<ProfilePicProps> = ({
  children,
  title,
  src,
  setFiles,
}) => {
  const isOpenPopup = (open: any) => {
    open();
  };

  return (
    <Modal
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          {title}
        </p>
      }
      status="custom"
      position="middle"
      size="2xl"
      closeButton={true}
      openButton={children}
      isOpenPopup={isOpenPopup}
      customCloseButton={
        <div onClick={() => setFiles(null)} className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>}
    >
      <div className="w-[90%] mx-auto">
        <img className="mt-1 w-full" src={src} alt="Uploaded Pic" />
        <div className="mt-5 w-full mb-5">
          <Button fill={true} className=" py-[12px] w-full">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePic;
