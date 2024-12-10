import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared-components/atoms/Button";
import CdInputField from "../../../shared-components/atoms/Input/CdInputField";
import CdDropDown from "../../../shared-components/atoms/DropDown/CdDropDown";
import { fetchDataItems } from "../../../services/api";
import { authDataService } from "../../../services/data/authDataService";
import CdCard from "../../../shared-components/atoms/Card/CdCard";
import ChartAtom from "../../../shared-components/atoms/Chart/ChartAtom";
import "../../../assets/scss/Dashboard.scss";
import CdButton from "../../../shared-components/atoms/Button/CdButton";

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
          localStorage.clear();
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

  const totalItems = filteredData.length;
  const totalActive = filteredData.filter(
    (item) => item.status === "Active"
  ).length;
  const totalCompleted = filteredData.filter(
    (item) => item.status === "Completed"
  ).length;

  const chartData = {
    labels: filteredData.map((item) => item.name),
    datasets: [
      {
        label: "Values",
        data: filteredData.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Data Chart" },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Welcome to the Dashboard!</h1>
        <Button color="secondary" onClick={() => navigate("/login")}>
          Logout
        </Button>
      </div>

      <div className="cards-container">
        <CdCard className="card">
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </CdCard>
        <CdCard className="card">
          <h3>Active Items</h3>
          <p>{totalActive}</p>
        </CdCard>
        <CdCard className="card">
          <h3>Completed Items</h3>
          <p>{totalCompleted}</p>
        </CdCard>
      </div>

      <div className="filters">
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

      <div className="chart-container">
        <ChartAtom data={chartData} options={chartOptions} />
      </div>

      <div className="action">
        <Button color="primary" onClick={() => navigate("/table")}>
          View Full Table
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
