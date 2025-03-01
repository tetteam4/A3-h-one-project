import { useState } from "react";

const Setting = () => {
  const [userSettings, setUserSettings] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********",
    enable2FA: false,
    pin: "****",
    notifications: {
      email: true,
      sms: false,
    },
  });

  const handleChange = (field, value) => {
    setUserSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">⚙️ Settings</h1>
      <p className="text-gray-600 mb-6">
        Configure system preferences, security settings, and notifications.
      </p>

      {/* User Profile */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          👤 User Profile
        </h2>
        <div className="space-y-2">
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userSettings.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={userSettings.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={userSettings.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          🔒 Security Settings
        </h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={userSettings.enable2FA}
              onChange={() =>
                handleChange("enable2FA", !userSettings.enable2FA)
              }
            />
            <span>Enable Two-Factor Authentication</span>
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={userSettings.pin}
            onChange={(e) => handleChange("pin", e.target.value)}
            placeholder="Enter PIN"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          📢 Notifications
        </h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={userSettings.notifications.email}
              onChange={() =>
                handleChange("notifications", {
                  ...userSettings.notifications,
                  email: !userSettings.notifications.email,
                })
              }
            />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={userSettings.notifications.sms}
              onChange={() =>
                handleChange("notifications", {
                  ...userSettings.notifications,
                  sms: !userSettings.notifications.sms,
                })
              }
            />
            <span>SMS Notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Setting;
