import React from "react";
import AvatarSingle from "../../shared/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { useQuery } from "react-query";
import { getOnlineUsersAPI } from "@src/apis/user";

interface ActiveUsersProps { }

const ActiveUsers: React.FC<ActiveUsersProps> = () => {

  // profileData
  const profileData = useSelector((state: RootState) => state.auth);

  const { data }: { data: any, isLoading: boolean } = useQuery({
    queryFn: () => getOnlineUsersAPI({ page: 1, limit: 50, sortType: 'dsc', sortBy: 'updatedAt' }),
    queryKey: [`onlineUser${profileData.id}`]
  });

  return (
    <div className="w-[96.5%] h-auto flex mx-3 gap-3 mt-3 overflow-y-hidden overflow-x-auto online-users">
      {data?.data?.map((data: any, index: number) => {
        return (
          <div className="relative" key={index}>
            <div className="w-[15px] absolute z-[1] right-0 h-[15px] rounded-full bg-normal_green"></div>
            <AvatarSingle
              className="w-[50px] h-[50px] rounded-full"
              status={data?.status}
              src={data?.profile_picture}
              alt="Online users"
            />
            <p className="text-center dark:text-dark_text_ font-semibold"></p>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveUsers;