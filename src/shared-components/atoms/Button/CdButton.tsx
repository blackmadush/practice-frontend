import React from "react";
import { Button, ButtonProps } from "reactstrap";

interface CdButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const CdButton: React.FC<CdButtonProps> = ({
  children,
  borderRadius = 5,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={`${props.className}`}
      style={{ ...props.style, borderRadius: `${borderRadius}px` }}
    >
      {children ?? props.text}
    </Button>
  );
};

export default CdButton;
