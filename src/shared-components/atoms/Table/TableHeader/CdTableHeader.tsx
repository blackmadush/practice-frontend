import { CSSProperties } from "react";

type TableHeaderRowProps = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const TableHeader: React.FC<TableHeaderRowProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <thead className={className} style={style}>
      {children}
    </thead>
  );
};

export default TableHeader;
