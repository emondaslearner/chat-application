import Button from "@src/components/shared/Button";
import Modal from "@src/components/ui/Model";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface PicturePopupProps {
  children: ReactNode;
  picture: string;
  title: string;
}

const PicturePopup: React.FC<PicturePopupProps> = ({
  children,
  picture,
  title,
}) => {
  return (
    <Modal
      openButton={children}
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          {title}
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
      <div className="w-full">
        <img
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          alt="Profile Pic"
        />

        <Button fill={true}>Save</Button>
      </div>
    </Modal>
  );
};

export default PicturePopup;
