import React, { ReactNode } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

interface ColorsProps {
  setUploadStatus: any;
  setColor: any;
  fileLength: number;
}

interface Items {
  key: string;
  label: string | ReactNode;
}

const items: Items[] = [
  {
    key: "white",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-white_ border-[1px] border-light_border_ dark:border-dark_border_"></div>
    ),
  },
  {
    key: "#C600FF",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-[#C600FF]"></div>
    ),
  },
  {
    key: "#E2013B",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-[#E2013B]"></div>
    ),
  },
  {
    key: "#111111",
    label: (
      <div className="p-[20px] rounded-full cursor-pointer table mx-auto bg-[#111111]"></div>
    ),
  },
  {
    key: "linear-gradient(45deg, rgb(255, 0, 71), rgb(44, 52, 199))",
    label: (
      <div
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgb(255, 0, 71), rgb(44, 52, 199))",
        }}
        className="p-[20px] rounded-full cursor-pointer table mx-auto"
      ></div>
    ),
  },
  {
    key: "linear-gradient(45deg, rgb(93, 63, 218), rgb(252, 54, 253))",
    label: (
      <div
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgb(93, 63, 218), rgb(252, 54, 253))",
        }}
        className="p-[20px] rounded-full cursor-pointer table mx-auto"
      ></div>
    ),
  },
  {
    key: "https://scontent.fcgp3-1.fna.fbcdn.net/v/t39.16376-6/27971368_423110001455136_5789798837665136640_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=427b5c&_nc_eui2=AeExHkcLTO89TSzjX_LMp2WZ0MjEoEQcna_QyMSgRBydr0618-db8yvGaVkMwQAQ-oAfmVyL76CzST_3hYg69HXv&_nc_ohc=WNH47udLYbQAX9Dn1rR&_nc_ht=scontent.fcgp3-1.fna&oh=00_AfDX0VhZ-Q9plOM3yjuzMNSZuxDbzQEHetytfZbOJkn6-g&oe=655F73E9",
    label: (
      <div
        style={{
          backgroundImage:
            "url(https://scontent.fcgp3-1.fna.fbcdn.net/v/t39.16376-6/27971368_423110001455136_5789798837665136640_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=427b5c&_nc_eui2=AeExHkcLTO89TSzjX_LMp2WZ0MjEoEQcna_QyMSgRBydr0618-db8yvGaVkMwQAQ-oAfmVyL76CzST_3hYg69HXv&_nc_ohc=WNH47udLYbQAX9Dn1rR&_nc_ht=scontent.fcgp3-1.fna&oh=00_AfDX0VhZ-Q9plOM3yjuzMNSZuxDbzQEHetytfZbOJkn6-g&oe=655F73E9)",
          backgroundSize: "cover",
        }}
        className="p-[20px] rounded-full cursor-pointer table mx-auto"
      ></div>
    ),
  },
  {
    key: "https://scontent.fcgp3-1.fna.fbcdn.net/v/t39.16376-6/29160588_435684666861727_3152817560781586432_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=427b5c&_nc_eui2=AeG2OMlqCJNHOxFKSi91g-3NbpAppzliuMpukCmnOWK4yuqDjOATvKD3mo4lVKR6Py5L1OX9iCjlEIu5bsOk9gmF&_nc_ohc=LO8vX7lu8fwAX-7l50k&_nc_ht=scontent.fcgp3-1.fna&oh=00_AfDm-jrAjah1E67jAUGNxnDmO0rt7p0pEedbLotIv7pjVw&oe=655FAD07",
    label: (
      <div
        style={{
          backgroundImage:
            "url(https://scontent.fcgp3-1.fna.fbcdn.net/v/t39.16376-6/29160588_435684666861727_3152817560781586432_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=427b5c&_nc_eui2=AeG2OMlqCJNHOxFKSi91g-3NbpAppzliuMpukCmnOWK4yuqDjOATvKD3mo4lVKR6Py5L1OX9iCjlEIu5bsOk9gmF&_nc_ohc=LO8vX7lu8fwAX-7l50k&_nc_ht=scontent.fcgp3-1.fna&oh=00_AfDm-jrAjah1E67jAUGNxnDmO0rt7p0pEedbLotIv7pjVw&oe=655FAD07)",
          backgroundSize: "cover",
        }}
        className="p-[20px] rounded-full cursor-pointer table mx-auto"
      ></div>
    ),
  },
];

const Colors: React.FC<ColorsProps> = ({
  setUploadStatus,
  setColor,
  fileLength,
}) => {
  return (
    <>
      {fileLength === 0 ? (
        <DropDowns size="sm">
          <DropdownTrigger>
            <div
              title="Background"
              className="p-[20px] rounded-full cursor-pointer table mx-auto bg-green-500"
            ></div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            className="colorDropdown max-w-[400px]"
            items={items}
          >
            {(item: Items) => (
              <DropdownItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={`!hover:bg-transparent !p-0 !w-auto !rounded-full`}
                onClick={() => {
                  setUploadStatus("background");
                  setColor(item.key);
                }}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </DropDowns>
      ) : (
        <div
          title="Background"
          className="p-[20px] rounded-full table mx-auto bg-green-300"
        ></div>
      )}
    </>
  );
};

export default Colors;
