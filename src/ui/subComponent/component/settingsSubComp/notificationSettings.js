import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Settings2,
  MessageSquare,
  FileText,
} from "lucide-react";

// interface NotificationSetting {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   email: boolean;
//   push: boolean;
//   sms: boolean;
// }

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState([
    {
      id: "security",
      title: "Security Alerts",
      description:
        "Get notified about security-related events and suspicious activities",
      icon: <AlertTriangle className="w-5 h-5" />,
      email: true,
      push: true,
      sms: true,
    },
    {
      id: "updates",
      title: "System Updates",
      description: "Receive notifications about system updates and maintenance",
      icon: <Settings2 className="w-5 h-5" />,
      email: true,
      push: false,
      sms: false,
    },
    {
      id: "messages",
      title: "New Messages",
      description:
        "Get notified when you receive new messages from team members",
      icon: <MessageSquare className="w-5 h-5" />,
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "documents",
      title: "Document Updates",
      description: "Notifications about document changes and approvals",
      icon: <FileText className="w-5 h-5" />,
      email: true,
      push: false,
      sms: false,
    },
  ]);

  const toggleNotification = (settingId, type) => {
    setNotificationSettings((settings) =>
      settings.map((setting) =>
        setting.id === settingId
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Notification Settings
          </h2>
          <p className="text-sm text-gray-500">
            Manage your notification preferences
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-50 rounded-lg">
            <div></div>
            <div className="text-sm font-medium text-gray-500 text-center">
              Email
            </div>
            <div className="text-sm font-medium text-gray-500 text-center">
              Push
            </div>
            <div className="text-sm font-medium text-gray-500 text-center">
              SMS
            </div>
          </div>

          {notificationSettings.map((setting) => (
            <div
              key={setting.id}
              className="grid grid-cols-4 gap-4 items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  {setting.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{setting.title}</h4>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.email}
                    onChange={() => toggleNotification(setting.id, "email")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.push}
                    onChange={() => toggleNotification(setting.id, "push")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.sms}
                    onChange={() => toggleNotification(setting.id, "sms")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
