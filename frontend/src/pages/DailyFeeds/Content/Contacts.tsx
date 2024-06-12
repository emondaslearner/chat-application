import AvatarSingle from "@src/components/shared/Avatar";
import React from "react";

interface ContactsProps {}

const Contacts: React.FC<ContactsProps> = () => {
  return (
    <div className="w-[25%] overflow-y-auto h-[100%]">
      <h3>Contacts</h3>

      <div className="">
        <AvatarSingle
          size="lg"
          status="online"
          src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
          alt="Profile Picture"
        />
      </div>
    </div>
  );
};

export default Contacts;
