import AvatarSingle from "@src/components/shared/Avatar";
import Button from "@components/shared/Button";
import TextEllipsis from "@src/components/shared/TextEllipsis";
import React from "react";
import SearchBar from "@src/components/shared/SearchBar";

interface SuggestionsProps {}

const Suggestions: React.FC<SuggestionsProps> = () => {
  const data = [{}, {}, {}, {}, {}, {}];
  return (
    <div className=" md:block hidden w-[40%] lg:w-[23%] overflow-y-auto max-h-[100%] bg-white_ dark:bg-dark_bg_ mt-[20px] p-[15px] rounded-[10px] pb-[30px]">
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[20px] font-semibold text-dark_ dark:text-white_">
          Suggestions
        </h3>

        <div className="max-w-[30px]">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-col gap-y-[10px]">
        {data.map((_item, i) => (
          <div
            key={i}
            className="w-full flex flex-col gap-[8px] bg-light_bg_ p-[13px] rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-white_ dark:bg-dark_light_bg_ hover:dark:bg-dark_bg_"
          >
            <div className="flex items-center gap-x-[13px]">
              <AvatarSingle
                size="md"
                status="online"
                src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                alt="Profile Picture"
              />

              <TextEllipsis
                className="font-semibold text-dark_ dark:text-dark_text_ "
                text="Emon Das Emon Das Emon DasEmon Das Emon Das Emon Das"
                maxTextWidth={70}
              />
            </div>
            <Button
              fill={true}
              className="w-full hover:text-primary_ hover:bg-transparent border-[1px] border-primary_"
            >
              Add Friend
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
