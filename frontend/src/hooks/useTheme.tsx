import { RootState } from "@src/store/store";
import { useSelector } from "react-redux";

const useTheme = (): "light" | "dark" => {
  return useSelector((state: RootState) => state.themeConfig.mode);
};


export default useTheme;