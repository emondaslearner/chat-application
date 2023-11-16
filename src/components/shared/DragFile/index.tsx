import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface DargFileProps {}

const fileTypes = ["JPEG", "PNG", "GIF"];

const DragFile: React.FC<DargFileProps> = () => {
  const [file, setFile] = useState(null);
  const handleChange = (files: any) => {
    setFile(files);
  };
  return (
    <FileUploader
      multiple={true}
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      classes={'!w-full'}
    />
  );
};

export default DragFile;
