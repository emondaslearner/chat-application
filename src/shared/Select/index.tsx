import React, { useState } from "react";
import Select from "react-select"; // Import ValueType for type checking
import { selectThemeColors } from "../../utils";

interface Option {
  value: string;
  label: string;
}

interface SelectsProps {}

const options: Option[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Selects: React.FC<SelectsProps> = () => {
  // state
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={(value) => setSelectedOption(value as Option)}
        options={options}
        isClearable={true}
        theme={selectThemeColors}
        placeholder="All Chat"
        isMulti={false}
      />
    </div>
  );
};

export default Selects;
