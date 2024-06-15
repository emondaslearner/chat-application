import AvatarSingle from "@src/components/shared/Avatar";
import React, { ReactNode, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "../../Dropdown";
import EditProfile from "../Popups/EditProfile";
import AddPost from "../Popups/AddPost";
import Button from "@src/components/shared/Button";

interface ProfileProps {}

interface TestData {
  id: number;
}
interface Items {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const testList: TestData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
}));

const Profile: React.FC<ProfileProps> = () => {
  const CoverPhoto = useRef<HTMLInputElement | null>(null);
  const ProfilePicture = useRef<HTMLInputElement | null>(null);

  // cover photo dropdown options
  const items: Items[] = [
    {
      key: "selectPhoto",
      label: "Select Photo",
      onClick: () => {
        CoverPhoto.current?.click();
      },
    },
  ];

  const ProfilePictureItems: Items[] = [
    {
      key: "selectPhoto",
      label: "Select Photo",
      onClick: () => {
        ProfilePicture.current?.click();
      },
    },
  ];

  return (
    <div className="w-full h-[100%] scrollHidden overflow-y-auto">
      <div className="w-[95%] mx-auto rounded-[15px] border-[1px] border-light_border_ dark:border-dark_border_ mt-4 lg:mt-8 h-[200px] relative overflow-hidden">
        <img
          className="w-full h-full"
          src="https://images.unsplash.com/photo-1528465424850-54d22f092f9d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />

        {/* Dropdown */}
        <Dropdown items={items}>
          <div className="absolute right-2 bottom-2 p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-light_gray_">
            <FaCamera size={25} className="text-black_" />
          </div>
        </Dropdown>
        <input className="hidden" type="file" ref={CoverPhoto} />
      </div>

      {/* profile picture  */}
      <div className="mt-[-70px] ml-[7%] relative w-auto table">
        <AvatarSingle
          className="!w-[150px] !h-[150px] border-[5px] rounded-full border-light_border_ dark:border-dark_border_ "
          src="https://scontent.fcgp3-2.fna.fbcdn.net/v/t39.30808-6/400528726_122114094254090279_6012386613011793258_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFzr3L26Dv-NDgmr-MW3I0wst9g9rb1Owqy32D2tvU7Ci8zSgb8ULQYeI_NndUN6m5BrLO7rPunIcvSXxzZTsa1&_nc_ohc=usTUFpZ9CrAAX8U5OUh&_nc_ht=scontent.fcgp3-2.fna&oh=00_AfAbyxiQpj9K3_ii5ERPJzpiT_5hC94Yd9ep6OY14Ci6UA&oe=655A53E0"
          alt="Profile picture"
        />

        {/* Dropdown */}
        <Dropdown items={ProfilePictureItems}>
          <div className="absolute right-[0px] bottom-[0] p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-light_gray_">
            <FaCamera size={20} className="text-black_" />
          </div>
        </Dropdown>
        <input className="hidden" type="file" ref={ProfilePicture} />
      </div>

      {/* Other info */}
      <div className="ml-[7%]">
        <p className="text-[23px] font-semibold dark:text-white_ text-dark_">
          Emon Das
        </p>

        {/* Bio */}
        <p className="text-[16px] text-dark_ dark:text-dark_text_">
          This is emon das
        </p>
      </div>

      <div className="flex items-center justify-between w-[95%] mx-auto mt-3">
        <div className="w-[48%]">
          <AddPost>
            <Button fill={true} className="!w-full">
              Add photos & videos
            </Button>
          </AddPost>
        </div>

        <div className="w-[48%]">
          <EditProfile />
        </div>
      </div>

      {/* Friends */}
      <div className="w-[95%] mx-auto mt-4">
        <p className="text-[20px] text-dark_ dark:text-white_ font-semibold">
          Friends
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[16px] font-semibold text-dark_ dark:text-white_">
              1.8K
            </span>{" "}
            <p className="text-[15px] text-dark_gray_ dark:text-dark_text_ ml-[5px]">
              Friends
            </p>
          </div>

          <Link to="/friends" className="text-primary_">
            See all
          </Link>
        </div>

        <div className="w-full grid grid-cols-4 mt-4 gap-3 max-h-[260px] h-full overflow-hidden">
          {testList.map((data: TestData) => {
            return (
              <div key={data?.id} className="">
                <img
                  className="rounded-[10px] h-[100px]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-1ecoo30f26bkr14o.jpg"
                  alt=""
                />
                <p className="text-[16px] font-semibold dark:text-dark_text_">
                  Biplob Das
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photos */}
      <div className="w-[95%] mx-auto mt-4">
        <div className="flex items-center justify-between">
          <p className="text-[20px] text-dark_ dark:text-white_ font-semibold">
            Photos
          </p>

          <Link to="/friends" className="text-primary_">
            See all
          </Link>
        </div>

        <div className="w-full grid grid-cols-4 mt-4 gap-3 max-h-[220px] h-full overflow-hidden">
          {testList.map((data: TestData) => {
            return (
              <div key={data?.id} className="">
                <img
                  className="rounded-[10px] h-[100px]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-1ecoo30f26bkr14o.jpg"
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Videos */}
      <div className="w-[95%] mx-auto mt-4">
        <div className="flex items-center justify-between">
          <p className="text-[20px] text-dark_ dark:text-white_ font-semibold">
            Videos
          </p>

          <Link to="/friends" className="text-primary_">
            See all
          </Link>
        </div>

        <div className="w-full grid grid-cols-4 mt-4 gap-3 max-h-[220px] h-full overflow-hidden">
          {testList.map((data: TestData) => {
            return (
              <div key={data?.id} className="">
                <img
                  className="rounded-[10px] h-[100px]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-1ecoo30f26bkr14o.jpg"
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
