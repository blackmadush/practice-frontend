import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { InputGroup } from "reactstrap";
import { CSSModule } from "reactstrap/types/lib/utils";
import { InputProps } from "reactstrap";

interface StyleProp {
    width?: number;
    fontSize?: number;
    padding?: number;
  }

interface PropsTypes extends InputProps {
  IconComponent?: React.FC<any>;
  InputComponent: React.FC<any>;
  className? : string;
  IconProps?: {
    color?: string;
    className?: string;
    size: SizeProp;
    style?: CSSModule | StyleProp;
    active?: boolean;
    disabled?: boolean;
    name?: string;
    cssModule?: CSSModule;
    icon: IconProp;
  };
}

const CdInputGroup : React.FC<PropsTypes> = ({IconComponent, IconProps, InputComponent, className, ...props}) => {
    return (
        <InputGroup className= {`border border-1 border-secondary rounded-sm p-1 ${className}`}>
        {IconComponent && (
          <IconComponent icon={IconProps?.icon} {...IconProps} />
        )}
        <InputComponent {...props} />
      </InputGroup>
    );
}

export default CdInputGroup;