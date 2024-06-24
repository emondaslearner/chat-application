import AvatarSingle from "@src/components/shared/Avatar";
import React, { ReactNode, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Dropdown from "../../Dropdown";
import EditProfile from "../Popups/EditProfile";
import AddPost from "../Popups/AddPost";
import Button from "@src/components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { AuthStoreInitialState, setUserData } from "@src/store/actions/auth";
import UploadPicture from "@src/pages/MyProfile/Popups/UploadPicture";
import { handleAxiosError } from "@src/utils/error";
import { getUserData, updateUserData } from "@src/apis/user";
import { success } from "@src/utils/alert";
import { useQuery } from "react-query";
import { getFriendList } from "@src/apis/friend";
import Spinner from "@src/components/shared/Spinner";
import { getAllPhoto } from "@src/apis/photo";
import { getAllVideo } from "@src/apis/video";

interface ProfileProps {}

interface Items {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface ProfileInformation {
  name: string;
  bio: string;
  city: string;
  country: string;
  dateOfBirth: Date;
}

const Profile: React.FC<ProfileProps> = () => {
  const CoverPhoto = useRef<HTMLInputElement | null>(null);
  const ProfilePicture = useRef<HTMLInputElement | null>(null);

  const dispatch: AppDispatch = useDispatch();

  // theme color
  const themeColor: "dark" | "light" = useSelector(
    (state: RootState) => state.themeConfig.mode
  );

  // cover picture
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [coverPictureTempUrl, setCoverPictureTempUrl] = useState<string>("");

  // profile picture
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureTempUrl, setProfilePictureTempUrl] =
    useState<string>("");

  const [loader, setLoader] = useState<boolean>(false);

  // profile information
  const [bio, setBio] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // set profile information
  const updateProfileInformation = async ({
    name,
    bio,
    dateOfBirth,
    city,
    country,
  }: ProfileInformation) => {
    setBio(bio);
    setName(name);
    setDateOfBirth(dateOfBirth);
    setCity(city);
    setCountry(country);
  };

  const nullifyProfilePicture = () => {
    setProfilePicture(null);
  };

  const nullifyCoverPicture = () => {
    setCoverPicture(null);
  };

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

  // profile picture dropdown options
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

  // normal user data
  const { data: normalUserDataApiData } = useQuery({
    queryFn: () => getUserData({ userId: id }),
    staleTime: Infinity,
    queryKey: ["normalUserData"],
  });

  const normalUserData: any = normalUserDataApiData;

  const saveProfileInformationToDb = async (e: any) => {
    e.preventDefault();
    try {
      setLoader(true);
      const data: any = await updateUserData({
        name,
        bio,
        dateOfBirth,
        city,
        country,
        profile_picture: profilePicture,
        cover_picture: coverPicture,
      });
      setLoader(false);

      if (data.code === 200) {
        dispatch(
          setUserData({
            name: data.data.name,
            email: data.data.email,
            profile_picture: data.data.profile_picture,
            date_of_birth: data.data.date_of_birth,
            bio: data.data.bio,
            cover_picture: data.data.cover_picture,
            city: data.data.city,
            country: data.data.country,
            id: data.data._id,
          })
        );
        success({ message: "Profile Information Updated", themeColor });
      }
    } catch (err) {
      setLoader(false);
      handleAxiosError(err, themeColor);
    }
  };

  // get params id
  const { id } = useParams();

  // get friends
  const { data, isLoading } = useQuery({
    queryFn: () =>
      getFriendList({
        limit: 8,
        page: 1,
        sortBy: "updatedAt",
        sortType: "dsc",
        search: "",
        id,
      }),
    staleTime: Infinity,
    queryKey: ["userFriend"],
  });

  const friends: any = data;

  // get photos
  const { data: photoData, isLoading: photoLoadingStatus } = useQuery({
    queryFn: () =>
      getAllPhoto({
        limit: 8,
        page: 1,
        sortBy: "updatedAt",
        sortType: "dsc",
        search: "",
        id,
      }),
    staleTime: Infinity,
    queryKey: ["userPhotos"],
  });

  const photos: any = photoData;

  // get videos
  const { data: videoData, isLoading: videoLoadingStatus } = useQuery({
    queryFn: () =>
      getAllVideo({
        limit: 8,
        page: 1,
        sortBy: "updatedAt",
        sortType: "dsc",
        search: "",
        id,
      }),
    staleTime: Infinity,
    queryKey: ["userVideos"],
  });

  const videos: any = videoData;

  // show this message when profile not found
  if (id && !videos && !friends && !photos && !normalUserData) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-dark_ dark:text-dark_text_ text-[20px] font-semibold">
          Profile not found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[100%] scrollHidden overflow-y-auto">
      <div className="w-[95%] mx-auto rounded-[15px] border-[1px] border-light_border_ dark:border-dark_border_ mt-4 lg:mt-8 h-[200px] relative overflow-hidden">
        <img
          className="w-full h-full"
          src={
            (!id
              ? profileData.cover_picture
              : normalUserData.data.cover_picture) ||
            "https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1719252000&semt=ais_user"
          }
          alt="Cover pic"
        />

        {/* Dropdown */}
        {!id && (
          <Dropdown items={items}>
            <div className="absolute right-2 bottom-2 p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-light_gray_">
              <FaCamera size={25} className="text-black_" />
            </div>
          </Dropdown>
        )}

        {/* Cover Picture Popup */}
        {coverPicture && (
          <UploadPicture
            src={coverPictureTempUrl}
            title="Update Cover Picture"
            nullifyState={nullifyCoverPicture}
            buttonLoader={loader}
            savePicture={saveProfileInformationToDb}
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
          src={
            !id
              ? profileData.profile_picture
              : normalUserData.data.profile_picture
          }
          alt="Profile picture"
        />

        {/* Dropdown */}
        {!id && (
          <Dropdown items={ProfilePictureItems}>
            <div className="absolute right-[0px] bottom-[0] p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-light_gray_">
              <FaCamera size={20} className="text-black_" />
            </div>
          </Dropdown>
        )}

        {/* Profile Picture Popup */}
        {profilePicture && (
          <UploadPicture
            src={profilePictureTempUrl}
            title="Update Profile Picture"
            nullifyState={nullifyProfilePicture}
            buttonLoader={loader}
            savePicture={saveProfileInformationToDb}
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
          {id ? normalUserData?.data.name : profileData.name}
        </p>

        {/* Bio */}
        <p className="text-[16px] text-dark_ dark:text-dark_text_">
          {id ? normalUserData?.data?.bio : profileData.bio}
        </p>
      </div>

      <div className="flex items-center justify-between w-[95%] mx-auto mt-3">
        {!id ? (
          <>
            <div className="w-[48%]">
              <AddPost>
                <Button fill={true} className="!w-full">
                  Add photos & videos
                </Button>
              </AddPost>
            </div>

            <div className="w-[48%]">
              <EditProfile
                saveProfileInformationToDb={saveProfileInformationToDb}
                changeInformation={updateProfileInformation}
                buttonLoader={loader}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Friends */}
      <Friends
        profileData={profileData}
        isLoading={isLoading}
        friends={friends}
      />

      {/* Photos */}
      <Photos photoLoadingStatus={photoLoadingStatus} photos={photos} />

      {/* Videos */}
      <div className="w-[95%] mx-auto mt-4 mb-4">
        <div className="flex items-center justify-between">
          <p className="text-[20px] text-dark_ dark:text-white_ font-semibold">
            Videos
          </p>

          <Link to="/friends" className="text-primary_">
            See all
          </Link>
        </div>

        {videoLoadingStatus ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner loaderStatus={"elementLoader"} />
          </div>
        ) : videos.data.length ? (
          <div
            className={`w-full mt-4 gap-3 max-h-[220px] h-full overflow-hidden`}
          >
            {videos.data.map((data: any, i: number) => {
              return (
                <div key={i}>
                  <VideoThumbnail
                    videoSrc={data.video}
                    thumbnailSrc="https://img.freepik.com/free-photo/green-park-view_1417-1492.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=ais_user"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-white_ w-full flex justify-center">
            <p>There is no video</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

interface VideoThumbnailProps {
  videoSrc: string;
  thumbnailSrc: string;
}

const VideoThumbnail = ({ videoSrc, thumbnailSrc }: VideoThumbnailProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isPlaying) {
      setTimeout(() => {
        videoRef.current?.pause();
        videoRef.current!.currentTime = 0;
        setIsPlaying(false);
      }, 100); // Add a small delay before pausing
    }
  };

  return (
    <div
      className="relative inline-block h-[100px] overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className={` object-cover rounded-[10px] h-[100px]`}
        muted
        loop
      />
    </div>
  );
};

interface PhotosProps {
  photoLoadingStatus: boolean;
  photos: any;
}

const Photos = ({ photoLoadingStatus, photos }: PhotosProps) => {
  return (
    <div className="w-[95%] mx-auto mt-4">
      <div className="flex items-center justify-between">
        <p className="text-[20px] text-dark_ dark:text-white_ font-semibold">
          Photos
        </p>

        <Link to="/friends" className="text-primary_">
          See all
        </Link>
      </div>

      {photoLoadingStatus ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner loaderStatus={"elementLoader"} />
        </div>
      ) : photos.data.length ? (
        <div
          className={`w-full grid grid-cols-4 mt-4 gap-3 max-h-[220px] h-full overflow-hidden`}
        >
          {photos.data.map((data: any, i: number) => {
            return (
              <div key={i} className="">
                <img
                  className="rounded-[10px] h-[100px]"
                  src={data.photo}
                  alt="User Pictures"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-white_ w-full flex justify-center">
          <p>There is no photo</p>
        </div>
      )}
    </div>
  );
};

interface FriendsProps {
  isLoading: boolean;
  profileData: any;
  friends: any;
}

const Friends = ({ isLoading, profileData, friends }: FriendsProps) => {
  return (
    <div className="w-[95%] mx-auto mt-4">
      <p className="text-[20px] text-dark_ dark:text-white_ font-semibold">
        Friends
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-[16px] text-dark_ dark:text-white_">
            {friends.pagination.totalResources}
          </span>
          <p className="text-[15px] text-dark_gray_ dark:text-dark_text_ ml-[5px] mt-[2px]">
            Friends
          </p>
        </div>

        <Link to="/friends" className="text-primary_">
          See all
        </Link>
      </div>

      <div
        className={`w-full ${
          isLoading ? "flex" : "grid grid-cols-4"
        } mt-4 gap-3 max-h-[260px] h-full overflow-hidden`}
      >
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner loaderStatus={"elementLoader"} />
          </div>
        ) : (
          friends.data.map((data: any) => {
            return (
              <div key={data?.id} className="cursor-pointer">
                <img
                  className="rounded-[10px] h-[100px]"
                  src={
                    (profileData.id === data.second_user._id
                      ? data.second_user.profile_picture
                      : data.first_user.profile_picture) ||
                    "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
                  }
                  alt={
                    profileData.id === data.second_user._id
                      ? data.second_user.profile_picture
                      : data.first_user.profile_picture
                  }
                />
                <p className="text-[16px] font-semibold dark:text-dark_text_">
                  {data.second_user.name}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
