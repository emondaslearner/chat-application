import React from 'react';

// import third party components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Selects from "../../../components/shared/Select";
import { Search } from "react-feather"
import Input from '../../shared/Input';

interface SideBarHeaderProps {

}

interface OptionProps {
  label: string
  value: string
}

const options: OptionProps[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const SideBarHeader: React.FC<SideBarHeaderProps> = () => {
    return (
        <div className="border-b-[1px] border-light_border_ dark:border-dark_border_ pb-3">
        <div className="flex justify-between w-full px-4 pt-6 pb-3">
          <p className="text-[19px] font-semibold text-dark_ mt-[-5px] dark:text-white_">
            Chats
          </p>
          <div className="flex">
            <FontAwesomeIcon
              icon={faBell}
              className="mr-5 text-[19px] text-dark_gray_ cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="text-[19px] text-dark_gray_ cursor-pointer"
            />
          </div>
        </div>
        <div className="flex px-4 items-center justify-between sidebarHeader">
          <Selects options={options} />
          <div className="relative w-[250px]">
            <Input
              type="text"
              className="w-full outline-none border-[1px] rounded-[5px] border-light_border_ py-[6px] px-2 dark:!bg-dark_bg_"
              placeholder="Search"
            />
            <Search
              size={18}
              className="text-dark_gray_ absolute right-[10px] top-[10px]"
            />
          </div>
        </div>
      </div>
    );
};

export default SideBarHeader;