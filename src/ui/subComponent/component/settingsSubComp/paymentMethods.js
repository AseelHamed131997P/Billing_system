import React, { useState } from "react";
import { CreditCard, Wallet, Building } from "lucide-react";

// interface PaymentMethod {
//   id: string;
//   icon: React.ReactNode;
//   label: string;
// }

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("credit");

  const paymentMethods = [
    { id: "credit", icon: <CreditCard className="w-5 h-5" />, label: "Credit" },
    { id: "payp", icon: <Wallet className="w-5 h-5" />, label: "PayP" },
    { id: "bank", icon: <Building className="w-5 h-5" />, label: "Bank" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Payment Settings
          </h2>
          <p className="text-sm text-gray-500">Manage your payment methods</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Payment
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                    selectedMethod === method.id
                      ? "border-purple-600 bg-white"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      selectedMethod === method.id
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <span className="font-medium text-gray-900">
                    {method.label}
                  </span>
                  <div className="flex-grow"></div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? "border-purple-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment</h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Cardholder's Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Save Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
