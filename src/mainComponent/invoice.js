import React, { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Download,
  Printer,
  Plus,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Building2,
  Languages,
  UserCircle,
} from "lucide-react";
import { Header } from "./index.js";
import { useNavigate } from "react-router-dom";
function Invoice() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  // Mock data for demonstration
  const invoices = [
    {
      id: "INV-001",
      customer: "John Smith",
      date: "2024-03-10",
      method: "Cash",
      amount: 500.0,
      paid: 500.0,
      status: "paid",
    },
    {
      id: "INV-002",
      customer: "Alice Johnson",
      date: "2024-03-09",
      method: "Check",
      amount: 750.0,
      paid: 375.0,
      status: "partial",
    },
    {
      id: "INV-003",
      customer: "Robert Brown",
      date: "2024-03-08",
      method: "Bank Transfer",
      amount: 1200.0,
      paid: 0,
      status: "unpaid",
    },
  ];

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Invoice Management System
          </h1>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage invoices easily and quickly through searching, filtering and
            full control of invoices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="rounded-lg border p-2 focus:ring-2 focus:ring-indigo-500">
                <option>All Dates</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Custom Range</option>
              </select>
              <select className="rounded-lg border p-2 focus:ring-2 focus:ring-indigo-500">
                <option>All Payment Methods</option>
                <option>Cash</option>
                <option>Check</option>
                <option>Bank Transfer</option>
              </select>
              <select className="rounded-lg border p-2 focus:ring-2 focus:ring-indigo-500">
                <option>All Statuses</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between mb-6">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
            onClick={() => navigate("/create-invoice")}
          >
            <Plus className="h-5 w-5" />
            New Invoice
          </button>

          <div className="flex gap-2">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700">
              <Download className="h-5 w-5" />
              Export
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700">
              <Printer className="h-5 w-5" />
              Print
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "partial"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">Show</span>
            <select className="mx-2 rounded-md border-gray-300">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              2
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              3
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer
        className={`border-t ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } mt-12`}
      >
        <div className="container mx-auto px-4 py-8">
          <div
            className={`text-center ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="text-sm">
              &copy; 2024 Invoice System. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}

      {/* Chat Support Button */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700">
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Invoice;
