import React, { ReactElement, ReactEventHandler, RefObject } from "react";
import PropTypes from "prop-types";

interface TextEllipsisProps {
  text?: string;
  maxTextWidth?: number;
  ref?: RefObject<HTMLParagraphElement>;
  onMouseEnter?: ReactEventHandler;
  onMouseLeave?: ReactEventHandler;
  className?: string;
}

const TextEllipsis = (props: TextEllipsisProps): ReactElement => {
  const { text, maxTextWidth, ref, onMouseEnter, onMouseLeave, className } =
    props;

  return (
    <p
      ref={ref}
      className={`${`w-[${maxTextWidth}%] ${[className]} truncate`}`}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {text}
    </p>

  );
};

TextEllipsis.propTypes = {
  text: PropTypes.string,
  maxTextWidth: PropTypes.number,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  className: PropTypes.string,
};

TextEllipsis.defaultProps = {
  text: "",
  maxTextWidth: 0,
};

export default TextEllipsis;
