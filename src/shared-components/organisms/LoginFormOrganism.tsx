import React from "react";
import LoginFormMolecule from "../molecules/LoginFormMolecule/LoginFormMolecule";
import { FormAtomProps } from "../atoms/Form/FormAtom";

interface LoginFormOrganismProps extends FormAtomProps {}

const LoginFormOrganism: React.FC<LoginFormOrganismProps> = ({
  children,
  ...rest
}) => {
  return <LoginFormMolecule {...rest}>{children}</LoginFormMolecule>;
};

export default LoginFormOrganism;
