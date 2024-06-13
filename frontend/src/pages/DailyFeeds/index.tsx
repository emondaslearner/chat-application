import React from "react";
import Contacts from "./Content/Contacts";
import Post from "@src/components/ui/Post";
import Suggestions from "./Content/Suggestions";
import AvatarSingle from "@src/components/shared/Avatar";
import AddPost from "@src/components/ui/SideBar/Popups/AddPost";

interface DailyFeedsProps {}

const DailyFeeds: React.FC<DailyFeedsProps> = () => {
  const viewStatus: "list" | "grid" = "list";

  return (
    <div className="w-full h-[100vh] overflow-hidden bg-light_bg_ dark:bg-dark_light_bg_ flex justify-end">
      <div className="w-[98%] md:w-[92%] xl:w-[85%] mx-auto md:mx-0 xl:mx-auto h-[100vh] flex items-start">
        <Contacts />
        <div className="w-full md:w-[58%] lg:w-[48%] mx-[1%] overflow-y-auto h-[100%]">
          {/* create post */}
          <AddPost>
            <div className="my-[20px] w-full bg-white_ dark:bg-dark_bg_ p-[15px] rounded-[10px] cursor-pointer">
              <p className="text-[20px] font-semibold dark:text-white_">
                Create Posts
              </p>

              <div className="flex items-center mt-[5px] gap-x-[15px]">
                <AvatarSingle
                  src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt="Profile Picture"
                />
                <p className="dark:text-dark_text_ text-dark_gray_">
                  Write Something here...
                </p>
              </div>
            </div>
          </AddPost>

          <Post viewStatus={viewStatus} />
          <Post viewStatus={viewStatus} />
          <Post viewStatus={viewStatus} />
          <Post viewStatus={viewStatus} />
        </div>
        <Suggestions />
      </div>
    </div>
  );
};

export default DailyFeeds;
