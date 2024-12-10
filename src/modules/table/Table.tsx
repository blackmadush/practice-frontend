import React, { useEffect, useState } from "react";
import { fetchDataItems } from "../../services/api";
import Button from "../../shared-components/atoms/Button";
import InputField from "../../shared-components/atoms/Input/CdInputField";
import DropDownAtom from "../../shared-components/atoms/DropDown/CdDropDown";
import DataTable from "../../shared-components/organisms/Table/DataTable";

interface DataItem {
  id: number;
  name: string;
  value: number;
  status: string;
}

const TablePage: React.FC = () => {
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataItems();
        setDataItems(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = dataItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const headers = ["ID", "Name", "Value", "Status"];
  const data = filteredData.map((item) => [
    item.id,
    item.name,
    item.value,
    item.status,
  ]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ marginBottom: "20px" }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Data Table</h2>
        <Button
          onClick={() => window.history.back()}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "14px",
          }}
        >
          Back
        </Button>
      </div>

      <div
        className="d-flex gap-3 mb-4"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <InputField
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: "5px",
            padding: "10px",
            border: "1px solid #ced4da",
            fontSize: "14px",
          }}
        />
        <DropDownAtom
          options={["All", "Active", "Completed", "Pending"]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            borderRadius: "5px",
            padding: "10px",
            border: "1px solid #ced4da",
            fontSize: "14px",
          }}
        />
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#6c757d",
          }}
        >
          <p>Loading...</p>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <DataTable
            headers={headers}
            data={data}
            striped
            hover
            bordered
            className="table-modern"
            style={{
              borderRadius: "8px",
              border: "1px solid #dee2e6",
              overflow: "hidden",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TablePage;
