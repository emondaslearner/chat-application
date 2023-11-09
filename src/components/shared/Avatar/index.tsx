import React from "react";
import { Avatar } from "@nextui-org/react";
import PropTypes from 'prop-types';

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
}

const AvatarSingle: React.FC<AvatarProps> = ({ src, alt, size, className }) => {
  return <Avatar src={src} alt={alt} size={size} className={className} />;
};

AvatarSingle.defaultProps = {
  size: 'md'
};

AvatarSingle.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired, 
};

export default AvatarSingle;