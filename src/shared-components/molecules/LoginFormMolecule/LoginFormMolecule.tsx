import React from "react";
import FormAtom, { FormAtomProps } from "../../atoms/Form/FormAtom";

interface LoginFormMoleculeProps extends FormAtomProps {}

const LoginFormMolecule: React.FC<LoginFormMoleculeProps> = ({
  children,
  ...rest
}) => {
  return <FormAtom {...rest}>{children}</FormAtom>;
};

export default LoginFormMolecule;
