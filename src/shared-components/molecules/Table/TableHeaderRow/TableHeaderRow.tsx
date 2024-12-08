import { CSSProperties } from "react";
import TableCell from "../../../atoms/Table/TableCell/CdTableCell";
import TableRowAtom from "../../../atoms/Table/TableRow/CdTableRow";

type TableHeaderRowProps = {
    headers: string[];
    className?: string;
    style?: CSSProperties;
  };

const TableHeaderRow : React.FC<TableHeaderRowProps> = ({ headers, className, style }) => {
   return (
    <TableRowAtom className={className} style={style}>
       {headers.map((header, index) => (
        <TableCell key={index} header>
          {header}
        </TableCell>
      ))}
    </TableRowAtom>
   );
}

export default TableHeaderRow;