import React, { useState } from "react";
import Post from "@components/ui/Post";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { useQuery } from "react-query";
import { getPostsAPI } from "@src/apis/post";
import Spinner from "@src/components/shared/Spinner";

interface ContentProps {
  setStatus?: (value: "sidebar" | "content") => void;
}

interface PostsQueryStates {
  data: any;
  isLoading: boolean;
}

const Content: React.FC<ContentProps> = ({ setStatus }) => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const sortBy = "updateAt";
  const sortType = "dsc";

  const { data, isLoading }: PostsQueryStates = useQuery({
    queryFn: () => getPostsAPI({ page, limit, sortBy, sortType, search: "" }),
    queryKey: ["personalPostData"],
  });

  return (
    <div className="w-full h-[100vh] overflow-hidden bg-light_bg_ dark:bg-dark_light_bg_">
      <div
        onClick={() => setStatus && setStatus("sidebar")}
        title="Back to profile"
        className="lg:hidden flex items-center mt-[10px] justify-between w-[95%] mx-auto"
      >
        <MdOutlineArrowCircleLeft size={25} />
      </div>

      <div className="w-[95%] sm:w-[80%] lg:w-[60%] mx-auto h-[100vh]">
        {/* all post */}
        <div
          className={`w-full mt-3 gap-y-3 flex flex-col h-full overflow-y-auto pb-[100px]`}
        >
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner loaderStatus={"elementLoader"} />
            </div>
          ) : (
            data.data.map((data: any, i: number) => (
              <div key={i}>
                <Post data={data} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
