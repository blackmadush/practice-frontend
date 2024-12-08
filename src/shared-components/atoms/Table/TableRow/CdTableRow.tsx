import { CSSProperties } from "react";

type TableRowProps = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

const TableRowAtom: React.FC<TableRowProps> = ({
  children,
  className,
  style,
  onClick,
}) => {
  return (
    <tr className={className} style={style} onClick={onClick}>
      {children}
    </tr>
  );
};

export default TableRowAtom;
