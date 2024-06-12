import React from "react";
import { Avatar } from "@nextui-org/react";
import PropTypes from "prop-types";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
  status?: string;
}

const sizeMap: Record<string, string> = {
  md: "10",
  sm: "8",
  lg: "14",
};

const AvatarSingle: React.FC<AvatarProps> = ({
  src,
  alt,
  size,
  className,
  status,
}) => {
  return (
    <div className={`relative w-${sizeMap[size || "10"]}`}>
      <Avatar
        src={src}
        alt={alt}
        size={size}
        className={`${className} border-[1px] border-light_border_`}
      />
      {status === "online" ? (
        <div className="w-[10px] h-[10px] rounded-[100%] bg-[green] absolute right-0 top-0"></div>
      ) : (
        <div className="w-[10px] h-[10px] rounded-[100%] bg-white_"></div>
      )}
    </div>
  );
};

AvatarSingle.defaultProps = {
  size: "md",
};

AvatarSingle.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default AvatarSingle;
