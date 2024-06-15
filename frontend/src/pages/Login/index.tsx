import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import React from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        className="max-w-[400px] w-full shadow-lg px-[10px] py-[20px] rounded-[10px] dark:bg-dark_bg_"
      >
        <h1 className="text-center text-[22px] font-semibold dark:text-white_">
          Login
        </h1>

        <div className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="email">Email:</Label>
            <Input placeholder="Enter an email" id="email" type="text" className="rounded-[5px] mt-[4px]" />
          </div>

          <div className=" mt-[10px]">
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="password">Password:</Label>
              <Link
                to="/forgot-password"
                className="text-primary_ text-[16px] font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              placeholder="Enter a password"
              id="password"
              type="password"
              className="rounded-[5px] mt-[4px]"
            />
          </div>

          <Button fill={true} className="w-full mt-[20px]">
            Login
          </Button>
          <Link
            to="/sign-up"
            className="text-primary_ text-[16px] font-semibold hover:underline mt-[10px] text-center block"
          >
            Don't have any account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
