import React from "react";
import { Settings, Shield, Building2, CreditCard, Bell } from "lucide-react";

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   isActive: boolean;
//   onClick: () => void;
// }

const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors ${
      isActive
        ? "bg-purple-100 text-purple-700 font-medium"
        : "hover:bg-purple-50 text-gray-700"
    }`}
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{label}</span>
  </button>
);

// interface SidebarProps {
//   activeSection: string;
//   onSectionChange: (section: string) => void;
// }
const Sidebar = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: "account",
      label: "Account Settings",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "security",
      label: "Security Settings",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "company",
      label: "Company Settings",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: "payment",
      label: "Payment Methods",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl font-semibold text-gray-900">
            System Settings
          </h1>
        </div>
      </div>
      <nav className="py-4">
        {sections.map((section) => (
          <SidebarItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            isActive={activeSection === section.id}
            onClick={() => onSectionChange(section.id)}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
