import React, { useState, useRef } from "react";
import {
  Palette,
  Save,
  Check,
  Users,
  Plus,
  Mail,
  X,
  Pen,
  Upload,
  Trash2,
  Settings2,
} from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

// interface ColorScheme {
//   id: string;
//   primary: string;
//   secondary: string;
//   accent: string;
//   background: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar: string;
// }

const CompanySettings = () => {
  const [selectedScheme, setSelectedScheme] = useState("default");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [signatureMode, setSignatureMode] = useState("draw");

  const [signatureImage, setSignatureImage] = useState("");
  const signaturePadRef = useRef(null);

  // Mock users data
  const [users] = useState([
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      role: "Admin",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "Editor",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@company.com",
      role: "Viewer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  const colorSchemes = [
    {
      id: "default",
      primary: "#6B21A8",
      secondary: "#F3E8FF",
      accent: "#A855F7",
      background: "#F9FAFB",
    },
    {
      id: "ocean",
      primary: "#0369A1",
      secondary: "#E0F2FE",
      accent: "#0EA5E9",
      background: "#F8FAFC",
    },
    {
      id: "forest",
      primary: "#166534",
      secondary: "#DCFCE7",
      accent: "#22C55E",
      background: "#F7F9F8",
    },
    {
      id: "sunset",
      primary: "#9A3412",
      secondary: "#FFEDD5",
      accent: "#F97316",
      background: "#FFFBF7",
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleSignatureSave = () => {
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.toDataURL();
      setSignatureImage(signatureData);
    }
  };

  const handleSignatureClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignatureImage("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSignatureImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Company Settings
          </h2>
          <p className="text-sm text-gray-500">
            Manage your company's appearance and branding
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-lg flex items-center space-x-2 transition-all transform hover:scale-105 ${
            showSuccess
              ? "bg-green-500 text-white"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {showSuccess ? (
            <>
              <Check className="w-5 h-5" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className={`w-5 h-5 ${isSaving ? "animate-spin" : ""}`} />
              <span>{isSaving ? "Saving..." : "Save Settings"}</span>
            </>
          )}
        </button>
      </div>

      {/* Signature Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Pen className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">
            Digital Signature
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setSignatureMode("draw")}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                signatureMode === "draw"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Pen className="w-4 h-4" />
              <span>Draw</span>
            </button>
            <button
              onClick={() => setSignatureMode("upload")}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                signatureMode === "upload"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>

          {signatureMode === "draw" ? (
            <div className="space-y-4">
              <div className="border-2 border-gray-200 rounded-lg">
                <SignatureCanvas
                  ref={signaturePadRef}
                  canvasProps={{
                    className: "w-full h-48 rounded-lg",
                    style: { width: "100%", height: "192px" },
                  }}
                  backgroundColor="white"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSignatureClear}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear</span>
                </button>
                <button
                  onClick={handleSignatureSave}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Signature</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                </div>
              </label>
            </div>
          )}

          {signatureImage && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Preview</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <img
                  src={signatureImage}
                  alt="Signature"
                  className="max-h-48 mx-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Company Users Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-medium text-gray-900">Company Users</h3>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* User List */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {user.role}
                </span>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add New User
                </h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter user's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter user's email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Scheme Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">Color Scheme</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Primary Colors
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme.id)}
                  className={`relative w-12 h-12 rounded-lg transition-transform ${
                    selectedScheme === scheme.id
                      ? "ring-2 ring-purple-600 ring-offset-2 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: scheme.primary }}
                >
                  {selectedScheme === scheme.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full border-2 border-white" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Accent Colors
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {colorSchemes.map((scheme) => (
                  <div
                    key={`accent-${scheme.id}`}
                    className={`w-12 h-12 rounded-lg ${
                      selectedScheme === scheme.id
                        ? "ring-2 ring-purple-600 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: scheme.accent }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Preview
              </h4>
              <div className="p-4 rounded-lg border border-gray-200">
                <div
                  className="w-full h-32 rounded-lg mb-4"
                  style={{
                    backgroundColor: colorSchemes.find(
                      (s) => s.id === selectedScheme
                    )?.background,
                  }}
                >
                  <div className="p-4">
                    <div
                      className="w-full h-8 rounded mb-2"
                      style={{
                        backgroundColor: colorSchemes.find(
                          (s) => s.id === selectedScheme
                        )?.primary,
                      }}
                    />
                    <div
                      className="w-2/3 h-8 rounded"
                      style={{
                        backgroundColor: colorSchemes.find(
                          (s) => s.id === selectedScheme
                        )?.accent,
                      }}
                    />
                  </div>
                </div>
                <button
                  className="w-full py-2 rounded-lg text-white transition-colors"
                  style={{
                    backgroundColor: colorSchemes.find(
                      (s) => s.id === selectedScheme
                    )?.primary,
                  }}
                >
                  Change Color Scheme
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Custom Colors
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Primary Color (hex)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Accent Color (hex)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
