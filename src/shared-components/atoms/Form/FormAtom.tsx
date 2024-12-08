import React from "react";
import {
  Form as ReactstrapForm,
  FormProps as ReactstrapFormProps,
} from "reactstrap";

export interface FormAtomProps extends ReactstrapFormProps {
  children: React.ReactNode;
}

const FormAtom: React.FC<FormAtomProps> = ({ children, ...rest }) => {
  return <ReactstrapForm {...rest}>{children}</ReactstrapForm>;
};

export default FormAtom;
