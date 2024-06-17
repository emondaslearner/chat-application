import { getUserDataByToken } from "@src/apis/user";
import { setUserData } from "@src/store/actions/auth";
import { changeLoaderValue } from "@src/store/actions/siteConfig";
import { AppDispatch } from "@src/store/store";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getUserDataByToken,
    staleTime: Infinity,
    queryKey: ["userData"],
  });

  dispatch(changeLoaderValue(isLoading));
  
  const userData: any = data;

  if (userData?.code === 200) {
    dispatch(
      setUserData({
        profile_picture: userData?.data?.profile_picture,
        email: userData?.data?.email,
        name: userData?.data?.name,
      })
    );

    return true;
  }

  navigate("/login");

  return false;
};

export default useAuth;
