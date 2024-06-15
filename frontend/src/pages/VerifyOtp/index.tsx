import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import React from "react";

interface VerifyOtpProps {}

const VerifyOtp: React.FC<VerifyOtpProps> = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        className="max-w-[400px] w-full shadow-lg px-[10px] py-[20px] rounded-[10px] dark:bg-dark_bg_"
      >
        <h1 className="text-center text-[22px] font-semibold dark:text-white_">
          Verify OTP
        </h1>

        <div className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="otp">Otp:</Label>
            <Input placeholder="Enter OTP" id="otp" type="text" className="rounded-[5px] mt-[4px]" />
          </div>


          <Button fill={true} className="w-full mt-[20px]">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
