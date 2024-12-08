import { FormGroup } from "reactstrap";
import LableAtom from "../../../atoms/Lable/CdLable";
import { InputProps } from "reactstrap";

interface PropsTypes extends InputProps {
  label: string;
  InputComponent: React.FC<any>;
  id?: string;
  inputPlaceHolder?: string;
  labelProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

const InputWithLabel: React.FC<PropsTypes> = ({
  label,
  InputComponent,
  labelProps,
  inputPlaceHolder,
  id,
  ...props
}) => {
  return (
    <FormGroup>
      <LableAtom htmlFor={id} {...labelProps} children={label} />
      <InputComponent placeholder={inputPlaceHolder} {...props} />
    </FormGroup>
  );
};

export default InputWithLabel;
