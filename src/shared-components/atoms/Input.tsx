import React from "react";
import { Input as ReactstrapInput, InputProps } from "reactstrap";

interface Props extends InputProps {
  label?: string;
}

const Input: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <ReactstrapInput {...rest} />
    </div>
  );
};

export default Input;
