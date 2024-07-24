import AvatarSingle from "@src/components/shared/Avatar";
import Button from "@src/components/shared/Button";
import Modal from "@src/components/ui/Model";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface FriendRequestProps {
    children: ReactNode;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ children }) => {
    return (
        <Modal
            closeButton={true}
            customCloseButton={
                <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
                    <IoMdClose size={30} className="text-dark_" />
                </div>
            }
            dismissable={false}
            openButton={children}
            size="2xl"
            position="middle"
            status="custom"
            title="Friend Requests"
        >
            <div className="flex flex-col w-[90%] mx-auto py-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center cursor-pointer">
                        <AvatarSingle
                            src="https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
                            alt="Profile Pic"
                        />

                        <p className="font-semibold text-dark_gray_ dark:text-dark_text_ text-[18px] ml-[20px]">
                            Emon Das
                        </p>
                    </div>

                    <div className="flex items-center">
                        <Button fill >
                            Accept
                        </Button>

                        <IoMdClose size={30} className="ml-[30px] text-dark_ cursor-pointer" />
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default FriendRequest;
