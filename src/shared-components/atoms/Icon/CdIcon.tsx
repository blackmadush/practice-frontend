import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSModule } from "reactstrap/types/lib/utils";

interface StyleProp {
    width: number;
    fontSize: number;
    padding: number;
  }
  
  interface propsTypes {
    color?: string;
    className?: string;
    size: SizeProp
    style?:CSSModule | StyleProp
    active?:boolean
    disabled?:boolean
    name?: string
    cssModule?: CSSModule;
    icon: IconProp
  }
  

const Icon = (props: propsTypes) => {
  const { color } = props;
  return <FontAwesomeIcon color={color} {...props} />;
};



export default Icon;