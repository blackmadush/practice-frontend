import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Input } from "reactstrap";
import { InputProps } from "reactstrap";

interface StyleProp {
  width?: number;
  fontSize?: number;
  padding?: number;
  size?: SizeProp
}

interface PropsTypes extends InputProps {
  options: string [];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  style?: React.CSSProperties | StyleProp;
  value?: string;
  name?: string;
}

const DropDownAtom: React.FC<PropsTypes> = (props : PropsTypes) => {
    const { className, id, onChange, style, value, options, name } = props;
  return (
    <Input
      type="select"
      className={className}
      id={id}
      onChange={onChange}
      style={style}
      value={value}
      name={name}
    >
      <option value="All">All</option>
      {options &&
        options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </Input>
  );
};

export default DropDownAtom;
