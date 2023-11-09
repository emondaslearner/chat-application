import React from "react";
import AvatarSingle from "../../../components/shared/Avatar";
import { IoCallOutline } from "react-icons/io5";
import { TbMessageDots } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { RiGlobalLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";

interface ContentProps {}

interface TestData {
  title: string;
  value: string;
  icon: React.ReactElement<any, any>;
}

const testData: TestData[] = [
  {
    title: "Local Time",
    value: "10:25 PM",
    icon: (
      <BiTimeFive className="dark:text-dark_text_ text-dark_gray_" size={25} />
    ),
  },
  {
    title: "Birthdate",
    value: "20/11/1992",
    icon: (
      <BsCalendar2Event className="dark:text-dark_text_ text-dark_gray_" size={25} />
    ),
  },
  {
    title: "Email",
    value: "dev.emondas@gmail.com",
    icon: (
      <HiOutlineMail className="dark:text-dark_text_ text-dark_gray_" size={25} />
    ),
  },
  {
    title: "Website",
    value: "www.catherichardson.com",
    icon: (
      <RiGlobalLine className="dark:text-dark_text_ text-dark_gray_" size={25} />
    ),
  },
  {
    title: "Address",
    value: "1134 Ridder Park Road, San Fransisco, CA 94851",
    icon: (
      <AiOutlineHome className="dark:text-dark_text_ text-dark_gray_" size={25} />
    ),
  },
];

const Content: React.FC<ContentProps> = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden dark:bg-dark_light_bg_">
      <div className="w-[90%] mx-auto border-[1px] border-light_border_ dark:border-dark_border_ py-[30px] mt-6 rounded-[5px]">
        <AvatarSingle
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGb8PmEaRgeXshs4ycQC8wyYl8h6RffDbg-A&usqp=CAU"
          alt="Profile picture"
          className="w-[100px] h-[100px] rounded-full mx-auto"
        />
        <div className="mt-3">
          <h3 className="text-center text-[25px] font-semibold text-dark_ dark:text-white_">
            Emon Das
          </h3>

          <div className="flex items-center mx-auto gap-x-6 w-full justify-center mt-4">
            <div className="w-[60px] h-[60px] rounded-full bg-primary_ flex justify-center items-center cursor-pointer">
              <TbMessageDots size={30} className="text-white" />
            </div>

            <div className="w-[60px] h-[60px] rounded-full bg-normal_green flex justify-center items-center cursor-pointer">
              <IoCallOutline size={30} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-7 flex flex-col overflow-x-hidden overflow-y-auto h-auto scrollHidden rounded-[5px] border-[1px] border-light_border_ dark:border-dark_border_">
        {testData.map((data: TestData, i: number) => {
          return (
            <li
              className={`w-full mx-auto py-3 px-5 flex items-center justify-between ${
                i + 1 !== testData.length && "border-b-[1px]"
              } border-light_border_ dark:border-dark_border_ transition-all duration-300 relative`}
            >
              <div className="relative">
                <p className="font-semibold text-dark_gray_ dark:text-dark_text_ text-[15px]">
                  {data?.title}
                </p>
                <p
                  className={`font-semibold dark:text-white_ text-[18px] flex items-center text-dark_`}
                >
                  {data?.value}
                </p>
              </div>

              {
                data?.icon
              }
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
