import AvatarSingle from "@src/components/shared/Avatar";
import TextEllipsis from "@src/components/shared/TextEllipsis";
import SearchBar from "@src/components/shared/SearchBar";
import React from "react";

interface ContactsProps {}

const Contacts: React.FC<ContactsProps> = () => {
  const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <div className="w-[23%] overflow-y-auto max-h-[100%] bg-white_ dark:bg-dark_bg_ mt-[20px] p-[15px] rounded-[10px] pb-[30px]">
      <div className="mb-[15px] flex items-center justify-between">
        <h3 className="text-[20px] font-semibold text-dark_ dark:text-white_">
          Contacts
        </h3>

        <div className="max-w-[30px]">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-col gap-y-[10px]">
        {data.map((_item, i) => (
          <div key={i} className="flex items-center gap-x-[13px]">
            <AvatarSingle
              size="md"
              status="online"
              src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
              alt="Profile Picture"
            />

            <TextEllipsis
              className="font-semibold text-dark_ dark:text-dark_text_ "
              text="Emon Das Emon Das Emon DasEmon Das Emon Das Emon Das"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
