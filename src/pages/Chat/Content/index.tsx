import React, { useEffect, useRef } from "react";

// import third party components
import { MoreVertical, Phone } from "react-feather";

interface ContentProps {}

const Content: React.FC<ContentProps> = () => {
  // refs
  const chatMainDiv = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Scroll the div to its bottom when the component mounts
    if (chatMainDiv.current) {
      chatMainDiv.current.scrollTop = chatMainDiv.current.scrollHeight;
    }
  }, []);

  return (
    <div className="w-full">
      {/* chat header */}
      <div className="px-8 py-3 border-dark_gray_ border-b-[1px] flex justify-between">
        <div className="flex items-center">
          <img
            className="min-w-[50px] w-[50px] h-[50px] rounded-[50%]"
            src="https://marketplace.canva.com/EAFSZhFumYM/1/0/800w/canva-dark-red-neon-futuristic-instagram-profile-picture-C7X0FDvE02Q.jpg"
            alt=""
          />
          <div className="ml-3">
            <p className="text-dark_ font-semibold">Emon Das</p>
            <p className="mt-[0px] text-[14px] font-semibold text-dark_gray_">
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Phone size={20} className="text-dark_gray_ cursor-pointer" />
          <MoreVertical size={20} className="text-dark_gray_ cursor-pointer" />
        </div>
      </div>

      {/* chat body */}
      <div className="h-[664px] w-full overflow-hidden">
        {/* main chat body */}
        <div ref={chatMainDiv} className="ls h-[90%] w-full bg-red-50 px-8 gap-y-8 flex flex-col">
          {/* friend messages */}
          <div className="w-full flex">
            <div className="relative max-w-[400px] bg-[#f5f6fa] py-4 px-6 rounded-[20px]">
              <p className=" text-deep_dark_ leading-5 text-[15px]">
                Hello how are you
              </p>
              <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* my message */}
          <div className="w-full flex justify-end">
            <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
              <p className="text-white_ leading-5 text-[15px]">
                Pictures will keep your audience from being bored. In order for
                you to succeed, you need to keep them interested and involved.
              </p>
              <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpaperaccess.com/full/2213426.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* friend messages */}
          <div className="w-full flex">
            <div className="relative max-w-[400px] bg-[#f5f6fa] py-4 px-6 rounded-[20px]">
              <p className=" text-deep_dark_ leading-5 text-[15px]">
                Hello how are you
              </p>
              <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* my message */}
          <div className="w-full flex justify-end">
            <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
              <p className="text-white_ leading-5 text-[15px]">
                Pictures will keep your audience from being bored. In order for
                you to succeed, you need to keep them interested and involved.
              </p>
              <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpaperaccess.com/full/2213426.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* friend messages */}
          <div className="w-full flex">
            <div className="relative max-w-[400px] bg-[#f5f6fa] py-4 px-6 rounded-[20px]">
              <p className=" text-deep_dark_ leading-5 text-[15px]">
                Hello how are you
              </p>
              <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* my message */}
          <div className="w-full flex justify-end">
            <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
              <p className="text-white_ leading-5 text-[15px]">
                Pictures will keep your audience from being bored. In order for
                you to succeed, you need to keep them interested and involved.
              </p>
              <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpaperaccess.com/full/2213426.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* friend messages */}
          <div className="w-full flex">
            <div className="relative max-w-[400px] bg-[#f5f6fa] py-4 px-6 rounded-[20px]">
              <p className=" text-deep_dark_ leading-5 text-[15px]">
                Hello how are you
              </p>
              <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* my message */}
          <div className="w-full flex justify-end">
            <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
              <p className="text-white_ leading-5 text-[15px]">
                Pictures will keep your audience from being bored. In order for
                you to succeed, you need to keep them interested and involved.
              </p>
              <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpaperaccess.com/full/2213426.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* friend messages */}
          <div className="w-full flex">
            <div className="relative max-w-[400px] bg-[#f5f6fa] py-4 px-6 rounded-[20px]">
              <p className=" text-deep_dark_ leading-5 text-[15px]">
                Hello how are you
              </p>
              <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* my message */}
          <div className="w-full flex justify-end">
            <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
              <p className="text-white_ leading-5 text-[15px]">
                Pictures will keep your audience from being bored. In order for
                you to succeed, you need to keep them interested and involved.
              </p>
              <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpaperaccess.com/full/2213426.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* friend messages */}
          <div className="w-full flex">
            <div className="relative max-w-[400px] bg-[#f5f6fa] py-4 px-6 rounded-[20px]">
              <p className=" text-deep_dark_ leading-5 text-[15px]">
                Hello how are you
              </p>
              <div className="absolute bottom-[-25px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* my message */}
          <div className="w-full flex justify-end">
            <div className="relative max-w-[400px] bg-primary_ py-4 px-6 rounded-[20px]">
              <p className="text-white_ leading-5 text-[15px]">
                Pictures will keep your audience from being bored. In order for
                you to succeed, you need to keep them interested and involved.
              </p>
              <div className="absolute bottom-[-20px] right-[-15px] p-[8px] bg-white_ rounded-[50%]">
                <img
                  className="w-[30px] h-[30px] rounded-[50%]"
                  src="https://wallpaperaccess.com/full/2213426.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* send head */}
      </div>
    </div>
  );
};

export default Content;
