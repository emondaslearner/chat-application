import React, { useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import Post from "@components/ui/Post";

interface ContentProps {}

const Content: React.FC<ContentProps> = () => {
  const [viewStatus, setViewStatus] = useState<'list' | 'grid'>("list");

  return (
    <div className="w-full h-[100vh] overflow-hidden bg-light_bg_ dark:bg-dark_light_bg_">
      <div className="w-[60%] mx-auto h-[100vh]">

        {/* change view */}
        <div className="w-full border-b-[2px] border-light_border_ dark:border-dark_border_ flex items-center justify-between">
          <div onClick={() => setViewStatus('list')} className={`w-[48%] flex items-center justify-center py-2 cursor-pointer ${viewStatus === 'list' && 'border-b-[3px] border-primary_'}`}>
            <CiCircleList
              size={25}
              className="text-dark_ dark:text-dark_text_"
            />
            <p className="text-[20px] text-dark_ dark:text-dark_text_ font-semibold ml-2">
              List
            </p>
          </div>

          
          <div onClick={() => setViewStatus('grid')} className={`w-[48%] flex items-center justify-center py-2 cursor-pointer ${viewStatus === 'grid' && 'border-b-[3px] border-primary_'}`}>
            <IoGrid
              size={25}
              className="text-dark_ dark:text-dark_text_"
            />
            <p className="text-[20px] text-dark_ dark:text-dark_text_ font-semibold ml-2">
              Grid
            </p>
          </div>
        </div>

        {/* all post */}
        <div className={`w-full mt-3 ${viewStatus === 'list' ? 'gap-y-3 flex flex-col' : 'grid grid-cols-2 gap-3'} h-full overflow-y-auto pb-[100px]`}>
            <Post viewStatus={viewStatus} />
            <Post viewStatus={viewStatus} />
            <Post viewStatus={viewStatus} />
            <Post viewStatus={viewStatus} />
            <Post viewStatus={viewStatus} />
        </div>

      </div>
    </div>
  );
};

export default Content;
