import React from "react";
import { Badge } from "reactstrap";
import { BadgeProps } from "reactstrap";
import { CSSModule } from "reactstrap/types/lib/utils";

interface CdBadgeProps extends BadgeProps {
  [key: string]: any;
  color?: string;
  pill?: boolean;
  tag?: React.ElementType;
  innerRef?: React.Ref<HTMLElement>;
  cssModule?: CSSModule;
  children?: React.ReactNode;
  className?: string;
}

const Badges = (props: CdBadgeProps) => {
  const { children } = props;
  return <Badge {...props} >{children}</Badge>;
};

export default Badges;