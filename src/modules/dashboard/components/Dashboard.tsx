import React, { useEffect, useState } from "react";
import Button from "../../../shared-components/atoms/Button";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../shared-components/organisms/Table/DataTable";
import { fetchDataItems } from "../../../services/api";
import { authDataService } from "../../../services/data/authDataService";
import CdInputField from "../../../shared-components/atoms/Input/CdInputField";
import CdDropDown from "../../../shared-components/atoms/DropDown/CdDropDown";

interface DataItem {
  id: number;
  name: string;
  value: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const handleLogout = () => {
    authDataService.jwtToken = "";
    navigate("/login");
  };

  useEffect(() => {
    const token = authDataService.jwtToken;
    if (!token) {
      navigate("/login");
      return;
    }

    const getData = async () => {
      try {
        const response = await fetchDataItems();
        setDataItems(response.data);
      } catch (error: any) {
        console.error("Failed to fetch data items:", error);
        if (error.response && error.response.status === 401) {
          authDataService.jwtToken = "";
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [navigate]);

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
    <div className="dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome to the Dashboard!</h2>
        <Button color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="d-flex gap-3 mb-3">
        <CdInputField
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <CdDropDown
          options={["All", "Active", "Completed", "Pending"]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <DataTable
          headers={headers}
          data={data}
          striped
          hover
          bordered
          responsive
        />
      )}
    </div>
  );
};

export default Dashboard;
