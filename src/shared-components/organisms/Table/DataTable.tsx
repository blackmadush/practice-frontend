import { CSSProperties } from "react";
import { Table } from "reactstrap";
import CdTableHeader from "../../atoms/Table/TableHeader/CdTableHeader";
import CdTableBody from "../../atoms/Table/Body/CdTableBody";
import DataRow from "../../molecules/Table/DataRow/DataRow";
import TableHeaderRow from "../../molecules/Table/TableHeaderRow/TableHeaderRow";

type DataTableProps = {
    headers: string[];
    data: any[][];
    className?: string;
    style?: CSSProperties;
    bordered?: boolean;
    hover?: boolean;
    striped?: boolean;
    onRowClick?: (data: any) => void;
    control?: any;
    feedback?: string;
    responsive?: boolean;
    small?: boolean;
  };
  

const DataTable : React.FC<DataTableProps> = ({
    headers,
    data,
    className,
    style,
    bordered,
    hover,
    striped,
    onRowClick,
    control,
    feedback,
    responsive,
    small,
  }) => {
    return (
        <Table
          striped={striped}
          hover={hover}
          bordered={bordered}
          className={className}
          style={style}
          responsive={responsive}
          size={small ? "sm" : ""}
        >
          <CdTableHeader>
            <TableHeaderRow headers={headers} />
          </CdTableHeader>
          <CdTableBody>
            {data.map((rowData, index) => (
              <DataRow
                key={index}
                data={rowData}
                onClick={onRowClick}
                control={control}
              />
            ))}
          </CdTableBody>
        </Table>
      );
}

export default DataTable;