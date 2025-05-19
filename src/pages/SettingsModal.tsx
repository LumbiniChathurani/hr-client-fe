// SettingsModal.tsx
import { X, Moon, Sun, Bell, UserCog } from "lucide-react";
import ReactDOM from "react-dom";
import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-purple-muted dark:text-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>

        {/* Modal Heading */}
        <h2 className="text-2xl text-black font-semibold mb-6 dark:text-purple-400">
          ⚙️ Settings
        </h2>

        {/* Theme Switcher */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Moon className="text-purple-600 dark:text-purple-400" />
            <span className="text-black dark:text-purple-400">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 transition-all"></div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
              {darkMode ? "Enabled" : "Disabled"}
            </span>
          </label>
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="text-purple-600 dark:text-purple-400" />
            <span className="text-black dark:text-purple-400">
              Notifications
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 transition-all"></div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
              {notificationsEnabled ? "On" : "Off"}
            </span>
          </label>
        </div>

        {/* Account Settings Placeholder */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <UserCog className="text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-black dark:text-purple-400">
              Account Settings
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your account info, change password, and configure login
            security.
          </p>
        </div>

        {/* Save Settings Button */}
        <div className="mt-8 flex justify-end">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            onClick={() => {
              // Example save action
              alert("Settings saved!");
              onClose();
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
