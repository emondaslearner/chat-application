import AvatarSingle from "@src/components/shared/Avatar";
import React, { ReactNode, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "../../Dropdown";
import EditProfile from "../Popups/EditProfile";
import AddPost from "../Popups/AddPost";
import Button from "@src/components/shared/Button";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { AuthStoreInitialState } from "@src/store/actions/auth";
import SavePicture from "@src/pages/MyProfile/Popups/ProfilePic";

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

  // cover picture
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [coverPictureTempUrl, setCoverPictureTempUrl] = useState<string>("");

  // profile picture
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureTempUrl, setProfilePictureTempUrl] =
    useState<string>("");

  console.log(coverPicture);
  console.log(profilePicture);

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

  // profile data
  const profileData: AuthStoreInitialState = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="w-full h-[100%] scrollHidden overflow-y-auto">
      <div className="w-[95%] mx-auto rounded-[15px] border-[1px] border-light_border_ dark:border-dark_border_ mt-4 lg:mt-8 h-[200px] relative overflow-hidden">
        <img
          className="w-full h-full"
          src={profileData.cover_picture}
          alt="Cover pic"
        />

        {/* Dropdown */}
        <Dropdown items={items}>
          <div className="absolute right-2 bottom-2 p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-light_gray_">
            <FaCamera size={25} className="text-black_" />
          </div>
        </Dropdown>

        {/* Cover Picture Popup */}
        {coverPicture && (
          <SavePicture
            src={coverPictureTempUrl}
            title="Update Cover Picture"
            setFiles={setCoverPicture}
          />
        )}

        <input
          onChange={(e: any) => {
            setCoverPicture(e.target.files[0]);
            const url: string = URL.createObjectURL(e.target.files[0]);
            setCoverPictureTempUrl(url);
          }}
          className="hidden"
          type="file"
          ref={CoverPhoto}
        />
      </div>

      {/* profile picture  */}
      <div className="mt-[-70px] ml-[7%] relative w-auto table">
        <AvatarSingle
          className="!w-[150px] !h-[150px] border-[5px] rounded-full border-light_border_ dark:border-dark_border_ "
          src={profileData.profile_picture}
          alt="Profile picture"
        />

        {/* Dropdown */}
        <Dropdown items={ProfilePictureItems}>
          <div className="absolute right-[0px] bottom-[0] p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-light_gray_">
            <FaCamera size={20} className="text-black_" />
          </div>
        </Dropdown>

        {/* Profile Picture Popup */}
        {profilePicture && (
          <SavePicture
            src={profilePictureTempUrl}
            title="Update Profile Picture"
            setFiles={setProfilePicture}
          />
        )}
        <input
          onChange={(e: any) => {
            setProfilePicture(e.target.files[0]);
            const url: string = URL.createObjectURL(e.target.files[0]);
            setProfilePictureTempUrl(url);
          }}
          className="hidden"
          type="file"
          ref={ProfilePicture}
        />
      </div>

      {/* Other info */}
      <div className="ml-[7%]">
        <p className="text-[23px] font-semibold dark:text-white_ text-dark_">
          {profileData.name}
        </p>

        {/* Bio */}
        <p className="text-[16px] text-dark_ dark:text-dark_text_">
          {profileData.bio}
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
