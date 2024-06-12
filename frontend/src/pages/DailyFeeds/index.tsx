import React from "react";
import Contacts from "./Content/Contacts";
import Post from "@src/components/ui/Post";
import Suggestions from "./Content/Suggestions";

interface DailyFeedsProps {}

const DailyFeeds: React.FC<DailyFeedsProps> = () => {
  const viewStatus: "list" | "grid" = "list";

  return (
    <div className="w-full h-[100vh] overflow-hidden dark:bg-dark_light_bg_">
      <div className="w-[80%] mx-auto h-[100vh] flex items-start">
        <Contacts />
        <div className="w-[50%] overflow-y-auto h-[100%]">
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
