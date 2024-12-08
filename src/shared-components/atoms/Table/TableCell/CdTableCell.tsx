import { CSSProperties } from "react";

interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  header?: boolean;
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  style,
  header,
}) => {
  return header ? (
    <th className={className} style={style}>
      {children}
    </th>
  ) : (
    <td className={className} style={style}>
      {children}
    </td>
  );
};

export default TableCell;
