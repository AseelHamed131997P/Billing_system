import React, { useState } from "react";
import { Header } from "./index.js";

import {
  BarChart3,
  FileText,
  Download,
  Table,
  Calendar,
  Filter,
  User,
  Receipt,
  FileCheck,
  FileX,
  CreditCard,
  DollarSign,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

// Mock data for demonstration
const mockData = {
  totalInvoices: 1256,
  totalReceiptVouchers: 345,
  paidPercentage: 78,
  unpaidPercentage: 22,
};

// Chart data
const pieChartData = {
  labels: ["Paid", "Unpaid", "Overdue"],
  datasets: [
    {
      data: [65, 22, 13],
      backgroundColor: ["#4F46E5", "#EF4444", "#F59E0B"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      borderWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Invoices",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "#4F46E5",
    },
    {
      label: "Receipts",
      data: [45, 49, 60, 71, 46, 45],
      backgroundColor: "#10B981",
    },
  ],
};

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Paid Invoices",
      data: [45, 52, 49, 60, 55, 65],
      borderColor: "#4F46E5",
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Unpaid Invoices",
      data: [20, 18, 25, 15, 22, 17],
      borderColor: "#EF4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

function Reports() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={18} />
            Download Reports
          </button>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Invoices",
              value: mockData.totalInvoices,
              icon: FileText,
            },
            {
              label: "Receipt Vouchers",
              value: mockData.totalReceiptVouchers,
              icon: Receipt,
            },
            {
              label: "Paid",
              value: `${mockData.paidPercentage}%`,
              icon: FileCheck,
            },
            {
              label: "Unpaid",
              value: `${mockData.unpaidPercentage}%`,
              icon: FileX,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <select className="form-select rounded-md border-gray-300">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Custom range</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select className="form-select rounded-md border-gray-300">
                <option>All Status</option>
                <option>Paid</option>
                <option>Unpaid</option>
                <option>Overdue</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-gray-400" />
              <select className="form-select rounded-md border-gray-300">
                <option>All Customers</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button className="ml-auto flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
              <Table size={18} />
              Switch to Tabular View
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invoices by Status
            </h3>
            <div className="h-[300px]">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invoices & Receipts Comparison
            </h3>
            <div className="h-[300px]">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          {/* Line Chart Card */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Direction of Paid and Unpaid Invoices
            </h3>
            <div className="h-[300px]">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          {[
            {
              title: "Invoices",
              description:
                "Summary of issued and returned invoices with performance comparison.",
              icon: FileText,
            },
            {
              title: "Receipt Voucher Section",
              description:
                "Receipt voucher ratios by payment methods (cash, check, bank transfer).",
              icon: Receipt,
            },
            {
              title: "Checks Section",
              description: "Status of checks: accepted, deferred, or returned.",
              icon: CreditCard,
            },
            {
              title: "Payment Section",
              description:
                "Detailed report of paid and unpaid invoices with KPIs.",
              icon: DollarSign,
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <section.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-gray-500 mt-1">{section.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Reports;
