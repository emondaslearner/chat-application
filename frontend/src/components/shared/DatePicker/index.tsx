import React from "react";
import dayjs from "dayjs";
import { DatePicker as  DatePickers} from "@mui/x-date-pickers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

interface DatePickerProps {
    value: Date;
    onChange: (e: any) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange
}) => {
  const themeConfig = useSelector((state: any) => state.themeConfig);

  const darkTheme = createTheme({
    palette: {
      mode: themeConfig?.mode,
    },
  });


  return (
    <div className="DatePicker">
      <ThemeProvider theme={darkTheme}>
        <DatePickers  className="w-full" onChange={onChange} defaultValue={dayjs(value)} />
      </ThemeProvider>
    </div>
  );
};

export default DatePicker;
