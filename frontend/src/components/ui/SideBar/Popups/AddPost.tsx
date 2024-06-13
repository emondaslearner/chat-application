import Button from "@src/components/shared/Button";
import DragFile from "@src/components/shared/DragFile";
import Modal from "@src/components/ui/Model";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Input from "@src/components/shared/Input";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Colors from "../DropDowns/Colors";

interface FileUploadComProps {
  setFileStatus: (e: any) => void;
  setColor: (e: any) => void;
}

const FileUploadCom: React.FC<FileUploadComProps> = ({
  setFileStatus,
  setColor,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="border-[1px] border-light_border_ dark:border-dark_border_ w-full p-[15px] rounded-[5px] cursor-pointer"
    >
      <div className="hover:bg-light_gray_ dark:hover:bg-dark_light_bg_ rounded-[5px] py-[30px] relative">
        <div className="p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-dark_gray_ table mx-auto">
          <FaCloudUploadAlt size={20} />
        </div>
        <p className="font-bold text-[20px] text-dark_ dark:text-white_ text-center">
          Add photos/videos
        </p>
        <p className="text-center text-[14px] text-dark_ dark:text-dark_text_">
          or drag and drop
        </p>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setFileStatus("background");
            setColor("#000000");
          }}
          className="absolute top-[5px] right-[5px] bg-white_ dark:bg p-[10px] border-[1px] hover:bg-light_gray_ dark:bg-dark_bg_ dark:hover:bg-dark_light_bg_ border-light_border_ dark:border-dark_border_ rounded-full"
        >
          <IoClose size={25} className="text-dark_ dark:text-white_" />
        </div>
      </div>
    </div>
  );
};

interface AddPostProps {
  children: ReactNode;
}

const AddPost: React.FC<AddPostProps> = ({ children }) => {
  const [uploadStatus, setUploadStatus] = useState<string>("file");
  const [color, setColor] = useState<string>();

  // files
  const [files, setFile] = useState<object[]>([]);

  // files url
  const [filesUrls, setFilesUrls] = useState<string[]>([]);

  //file ref
  const FileUpload = useRef<HTMLInputElement | null>(null);

  // on file change
  const handleFileChange = (file: any) => {
    setFile((prev) => [...prev, file[0]]);

    const url: string = URL.createObjectURL(file[0]);
    setFilesUrls((prev) => [...prev, url]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <Modal
      openButton={children}
      title={
        <p className="text-[25px] text-center font-semibold text-dark_ dark:text-white_ ">
          Add Post
        </p>
      }
      status="custom"
      position="middle"
      size="2xl"
      closeButton={true}
      customCloseButton={
        <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
          <IoMdClose size={30} className="text-dark_" />
        </div>
      }
      dismissable={false}
    >
      <div className="max-h-[80vh] p-5 relative">
        {/* status */}
        {uploadStatus === "file" && (
          <Input
            type="text"
            className="!border-0 !p-0 mb-3 dark:!bg-dark_bg_"
            placeholder="What's in your mind"
          />
        )}

        {uploadStatus === "background" && files.length === 0 && (
          <textarea
            style={
              color?.charAt(0) === "l" || color?.charAt(0) === "h"
                ? {
                    backgroundImage:
                      color?.charAt(0) === "h" ? `url(${color})` : `${color}`,
                    backgroundSize: "100% 100%",
                  }
                : {
                    background: `${color}`,
                  }
            }
            className={` w-full flex justify-center !border-0 mb-3 text-[25px] font-semibold outline-none !px-[20px] h-[150px] py-[30px] ${
              color === "white"
                ? "text-dark_"
                : "text-white_ placeholder:text-white_"
            }`}
            placeholder="What's in your mind"
          />
        )}

        {/* Upload photo */}
        {uploadStatus === "file" && files.length === 0 && (
          <DragFile
            name="file"
            multiple={true}
            children={
              <FileUploadCom
                setFileStatus={setUploadStatus}
                setColor={setColor}
              />
            }
            onChange={handleFileChange}
          />
        )}

        {/*After upload file*/}
        {files.length > 0 && (
          <div className="border-[1px] border-light_border_ dark:border-dark_border_ w-full p-[15px] rounded-[5px] relative h-[60vh]">
            <div className="h-[100%] overflow-y-auto">
              <div
                onClick={() => {
                  FileUpload.current?.click();
                }}
                className="px-[20px] py-[10px] table bg-white_ dark:bg-dark_light_bg_ absolute top-[20px] z-[99999] left-[20px] rounded-[5px]  cursor-pointer"
              >
                <p className="font-bold text-dark_">Add photos/videos</p>
                <input
                  onChange={(e: any) => {
                    handleFileChange(e.target.files);
                  }}
                  ref={FileUpload}
                  type="file"
                  className="hidden"
                />
              </div>
              {filesUrls.map((data: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={`relative ${
                      index > 0 && "mt-[10px]"
                    } border-[1px] border-light_border_ dark:border-dark_border_`}
                  >
                    <img className="rounded-[5px]" src={data} alt="" />

                    <div
                      onClick={() => {
                        setFile((oldArray) => {
                          return oldArray.filter((value, i) => i !== index);
                        });
                        setFilesUrls((oldArray) => {
                          return oldArray.filter((value, i) => i !== index);
                        });
                      }}
                      className="absolute top-[5px] right-[5px] bg-white_ dark:bg p-[10px] border-[1px] hover:bg-light_gray_ dark:bg-dark_bg_ dark:hover:bg-dark_light_bg_ border-light_border_ dark:border-dark_border_ rounded-full cursor-pointer"
                    >
                      <IoClose
                        size={25}
                        className="text-dark_ dark:text-white_"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add to your post  */}
        <div
          className={`mt-3 rounded-[5px] py-[10px] border-[1px] border-light_border_ dark:border-dark_border_ px-[20px] flex items-center justify-between`}
        >
          <p className="text-[18px] text-dark_ dark:text-white_ font-bold">
            Add to your post
          </p>

          <div className="flex items-center gap-x-2">
            <div
              onClick={() => setUploadStatus("file")}
              title="Photos/videos"
              className="p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-dark_gray_ table mx-auto"
            >
              <FaCloudUploadAlt size={20} />
            </div>

            <div
              title="Emoji"
              className="p-[10px] rounded-full dark:bg-dark_gray_ cursor-pointer bg-dark_gray_ table mx-auto"
            >
              <MdOutlineEmojiEmotions size={20} />
            </div>

            {/* background */}
            <Colors
              setUploadStatus={setUploadStatus}
              setColor={setColor}
              fileLength={files.length}
            />
          </div>
        </div>

        {/* button */}
        <Button className="w-full mt-5" fill={true}>
          Post
        </Button>
      </div>
    </Modal>
  );
};

export default AddPost;
