import React from "react";

interface ButtonWidgetProps {
  className?: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonWidget: React.FC<ButtonWidgetProps> = ({
  className = "",
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button className={`${className}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonWidget;
