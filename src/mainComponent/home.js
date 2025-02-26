import React from "react";
import {
  Package,
  Users,
  FileText,
  Receipt,
  RotateCcw,
  Truck,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { Header } from "./index.js";

function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-indigo-600 mt-2">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      <button className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
        View Details
      </button>
    </div>
  );
}

// function Header() {
//   return <Header />;
// }

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            + New Invoice
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={Package}
            title="Items"
            value="125"
            subtitle="Total items in inventory"
          />
          <StatCard
            icon={Users}
            title="Customers"
            value="340"
            subtitle="Registered customers"
          />
          <StatCard
            icon={FileText}
            title="Invoices"
            value="45"
            subtitle="Pending invoices"
          />
          <StatCard
            icon={Receipt}
            title="Receipt Vouchers"
            value="67"
            subtitle="Issued today"
          />
          <StatCard
            icon={RotateCcw}
            title="Invoice Returns"
            value="12"
            subtitle="Processed returns"
          />
          <StatCard
            icon={Truck}
            title="Deliveries"
            value="18"
            subtitle="In transit"
          />
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Invoice #{2023 + item}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created 2 hours ago
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
