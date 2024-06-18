import { signIn } from "@src/apis/auth";
import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import { RootState } from "@src/store/store";
import { success } from "@src/utils/alert";
import { handleAxiosError } from "@src/utils/error";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  // themeColor
  const themeColor: "light" | "dark" = useSelector(
    (state: RootState) => state.themeConfig.mode
  );

  // states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  // router dom
  const navigate: NavigateFunction = useNavigate();


  const clearStates = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoader(true);
      const data: any = await signIn({ email, password });
      setLoader(false);

      if(data.code === 200) {
        localStorage.setItem("token", data.token);
        success({ message: data.message, themeColor });
        navigate("/");
      }
      clearStates();
    } catch (err) {
      setLoader(false);
      handleAxiosError(err, themeColor);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        className="max-w-[400px] w-full shadow-lg px-[10px] py-[20px] rounded-[10px] dark:bg-dark_bg_"
      >
        <h1 className="text-center text-[22px] font-semibold dark:text-white_">
          Login
        </h1>

        <form onSubmit={handleLogin} className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="email">Email:</Label>
            <Input
              placeholder="Enter an email"
              id="email"
              type="text"
              className="rounded-[5px] mt-[4px]"
              value={email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
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
              value={password}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <Button loader={loader} loaderMessage="Processing..." fill={true} className="w-full mt-[20px]">
            Login
          </Button>
          <Link
            to="/sign-up"
            className="text-primary_ text-[16px] font-semibold hover:underline mt-[10px] text-center block"
          >
            Don't have any account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
