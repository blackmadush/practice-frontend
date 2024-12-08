import React from "react";
import { Button as ReactstrapButton, ButtonProps } from "reactstrap";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <ReactstrapButton {...rest}>{children}</ReactstrapButton>;
};

export default Button;
