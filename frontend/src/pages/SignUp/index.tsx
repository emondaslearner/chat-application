import { signUp } from "@src/apis/auth";
import Button from "@src/components/shared/Button";
import DatePicker from "@src/components/shared/DatePicker";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import { error } from "@src/utils/alert";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clearStates = () => {
    setDate(new Date());
    setName("");
    setEmail("");
    setPassword("");
  };

  const SignUpToBeAMember = async (e: any) => {
    try {
      e.preventDefault();

      const apiData = await signUp({
        name,
        email,
        dateOfBirth: date,
      });

      console.log(apiData);
      // clearStates();
    } catch (err: any) {
      if(err?.response?.status === 400) {

      } 
      console.log(err)
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        className="max-w-[400px] w-full shadow-lg px-[10px] py-[20px] rounded-[10px] dark:bg-dark_bg_"
      >
        <h1 className="text-center text-[22px] font-semibold dark:text-white_">
          Sign Up
        </h1>

        <form onSubmit={SignUpToBeAMember} className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="name">Name:</Label>
            <Input
              placeholder="Enter a name"
              id="name"
              type="text"
              className="rounded-[5px] mt-[4px]"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=" mt-[10px]">
            <Label htmlFor="email">Email:</Label>
            <Input
              placeholder="Enter an email"
              id="email"
              type="email"
              className="rounded-[5px] mt-[4px]"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" mt-[10px] date-picker">
            <Label htmlFor="date" className="mb-[4px] block">
              Date Of Birth:
            </Label>
            <DatePicker
              id="date"
              className="border-[1px] dark:bg-dark_light_bg_ dark:text-dark_text_ dark:border-dark_border_ dark:placeholder:text-dark_text_ border-light_border_ outline-none px-3 w-full rounded-[5px] block py-3"
              value={date}
              onChange={(data) => setDate(data.$d)}
            />
          </div>

          <div className=" mt-[10px]">
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="password">Password:</Label>
            </div>
            <Input
              placeholder="Enter a password"
              id="password"
              type="password"
              className="rounded-[5px] mt-[4px]"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button fill={true} className="w-full mt-[20px]">
            Sign Up
          </Button>
          <Link
            to="/login"
            className="text-primary_ text-[16px] font-semibold hover:underline mt-[10px] text-center block"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
