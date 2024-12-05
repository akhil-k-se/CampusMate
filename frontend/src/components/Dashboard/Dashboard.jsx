import React, { useState, useEffect } from "react";
import Sidebar from "./shared/Sidebar"; // Import Sidebar
import Navbar from "./shared/Navbar"; // Import Navbar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

// Import necessary Chart.js components
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register all the components used by Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://hostel-sync-1.onrender.com/warden-dashboard")
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { gatePass, students, complaints, messSecurity } = dashboardData;

  // Complaints Bar Chart Data
  const complaintsData = {
    labels: complaints.map((c) => c.label),
    datasets: [
      {
        label: "Complaints",
        data: complaints.map((c) => c.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Gate Pass Doughnut Chart Data
  const gatePassData = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        label: "Gate Pass Usage",
        data: [gatePass.used, gatePass.total - gatePass.used],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Students Line Chart Data
  const studentsData = {
    labels: ["Total Students"],
    datasets: [
      {
        label: "Students",
        data: [students],
        backgroundColor: ["#4CAF50"],
      },
    ],
  };

  return (
    <div className="bg-gray-800 w-full h-screen">
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-gray-800`}>
        <h1 className="text-3xl font-bold text-white mb-6">Hostel Warden Dashboard</h1>
        

        <div className="flex justify-between space-x-4 mb-6">
          <div className="w-full bg-gray-900 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Complaints Status</h2>
            <Bar data={complaintsData} />
          </div>

          <div className="w-full bg-gray-900 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Gate Pass Usage</h2>
            <Doughnut data={gatePassData} />
          </div>

          <div className="w-full bg-gray-900 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Total Students</h2>
            <Line data={studentsData} />
          </div>
        </div>


        <div className="bg-gray-900 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Additional Information</h2>
          <p className="text-white">Total Complaints: {complaints.reduce((sum, c) => sum + c.count, 0)}</p>
          <p className="text-white">Mess Security Level: {messSecurity}%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
