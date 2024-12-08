import { Input } from "reactstrap";
import { CSSModule } from "reactstrap/types/lib/utils";
import { InputProps } from "reactstrap";

interface StyleProp {
    width: number;
    fontSize: number;
    padding: number;
    borderRadius ?: '5px';
  }
  
  interface PropsTypes extends InputProps {
    children?: React.ReactNode;
    color?: string;
    onClick?: (key:any) => void;
    className?: string;
    id?: string;
    type?: 'submit' | 'reset' | 'button' | 'password' | 'text' | 'email' | undefined;
    outline?:boolean | undefined;
    size?: 5;
    style?:CSSModule | StyleProp
    active?:boolean
    disabled?:boolean
    tag?: React.ElementType ;
    href?:string
    value?:string
    as?:string;
    name?: string
    cssModule?: CSSModule;
    target?: string;
    title?:string
    close?:boolean
    block?:boolean
    placeholder?: string
    borderRadious?: string
  }

const InputField = (props: PropsTypes) => {
    const { type = 'text', placeholder, style, className } = props;
    const inputStyle = { ...style, borderRadius: style?.borderRadius || '5px' };
    return (
      <Input type={type} className={`text-secondary fs-6 ${className}`} placeholder={placeholder} style={inputStyle} {...props}  />
    );
  };
  
  export default InputField;