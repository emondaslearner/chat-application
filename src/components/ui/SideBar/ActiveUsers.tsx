import React from "react";
import AvatarSingle from "../../shared/Avatar";

interface ActiveUsersProps {}

const avatar: any[] = new Array(16).fill({});

const ActiveUsers: React.FC<ActiveUsersProps> = () => {
  return (
    <div className="w-[96.5%] h-auto flex mx-3 gap-3 mt-3 overflow-y-hidden overflow-x-auto online-users">
      {avatar.map((data: any, index: number) => {
        return (
          <div className="relative" key={index}>
            <div className="w-[15px] absolute z-[1] right-0 h-[15px] rounded-full bg-normal_green"></div>
            <AvatarSingle
              className="w-[50px] h-[50px] rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzHMDlwRCHOHZP_tX7jRYNxV8W8MpNEog45w&usqp=CAU"
              alt="Online users"
            />
            <p className="text-center dark:text-dark_text_ font-semibold">Emon das</p>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveUsers;