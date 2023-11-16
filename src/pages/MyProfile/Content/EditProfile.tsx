import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Modal from "@src/components/ui/Model";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface EditProfileProps {}

interface InputEditStatus {
  name: boolean;
  dateOfBirth: boolean;
}

const EditProfile: React.FC<EditProfileProps> = () => {
  const [inputsEditStatus, setInputEditStatus] = useState<InputEditStatus>({
    name: false,
    dateOfBirth: false,
  });

  return (
    <Modal
      openButton={
        <Button fill={false} className="!w-full">
          Edit profile
        </Button>
      }
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          Edit Profile
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
    >
      <div className="max-h-[80vh] p-5">
        {/* Name  */}
        <div className="">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] text-dark_ font-semibold dark:text-dark_text_">
              Name
            </p>
            {!inputsEditStatus?.name && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    name: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.name ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              Emon Das
            </p>
          ) : (
            <Input
              type="text"
              placeholder="Enter Name"
              className="mt-1 !rounded-[5px]"
              value={"Emon Das"}
            />
          )}
        </div>

        {/* Date Of Birth  */}
        <div className="mt-2">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] text-dark_ font-semibold dark:text-dark_text_">
                Date Of Birth
            </p>
            {!inputsEditStatus?.dateOfBirth && (
              <p
                onClick={() => {
                  setInputEditStatus((prevEditStatus) => ({
                    ...prevEditStatus,
                    dateOfBirth: true,
                  }));
                }}
                className="text-primary_ cursor-pointer"
              >
                Edit
              </p>
            )}
          </div>
          {!inputsEditStatus?.dateOfBirth ? (
            <p className="text-[20px] text-dark_ dark:text-dark_text_ ml-2">
              06 - 03 - 2023
            </p>
          ) : (
            <Input
              type="text"
              placeholder="Enter Name"
              className="mt-1 !rounded-[5px]"
              value={"Emon Das"}
            />
          )}
        </div>
        
      </div>
    </Modal>
  );
};

export default EditProfile;
