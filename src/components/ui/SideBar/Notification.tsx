import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Model from "../Model";

interface NotificationProps {}

const Notification: React.FC<NotificationProps> = () => {
  return (
    <Model
      openButton={
        <FontAwesomeIcon
          icon={faBell}
          className="mr-5 text-[19px] text-dark_gray_ cursor-pointer"
        />
      }
      status="custom"
      title={"Hello world"}
      position='right'
      size="md"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
        risus, sed porttitor quam.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
        risus, sed porttitor quam.
      </p>
      <p>
        Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
        eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
        pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </p>
    </Model>
  );
};

export default Notification;
