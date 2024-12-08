import React from "react";
import LableAtom from "../atoms/Lable/CdLable";

interface Props {
  label: string;
  children: React.ReactNode;
  error?: string;
}

const FormGroup: React.FC<Props> = ({ label, children, error }) => {
  return (
    <div className="form-group">
      <LableAtom>{label}</LableAtom>
      {children}
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
};

export default FormGroup;
