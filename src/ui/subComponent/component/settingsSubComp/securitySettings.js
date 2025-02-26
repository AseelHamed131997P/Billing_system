import React from "react";
import { Shield, Smartphone } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Security Settings
          </h2>
          <p className="text-sm text-gray-500">Manage your account security</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Authorized Devices
                </h3>
                <p className="text-sm text-gray-500">
                  Manage devices that have access to your account
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Manage Devices
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-900">
                  MacBook Pro - Chrome
                </p>
                <p className="text-sm text-gray-500">
                  Last active: 2 hours ago
                </p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">iPhone 13 - Safari</p>
                <p className="text-sm text-gray-500">
                  Last active: 5 minutes ago
                </p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Security Questions
          </h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Add security question"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
