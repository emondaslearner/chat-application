import React from 'react';
import Modal from '../../Model';
import { IoMdClose } from "react-icons/io";

interface PhotosProps { }

const Photos: React.FC<PhotosProps> = () => {
    return (
        <Modal
            openButton={
                <p className="text-primary_ hover:underline cursor-pointer table">
                    See all
                </p>
            }
            status='custom'
            title={
                <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
                    Photos
                </p>
            }
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
            <div>

            </div>
        </Modal>
    );
};

export default Photos;