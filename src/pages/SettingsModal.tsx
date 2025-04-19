// SettingsModal.tsx
import { X } from "lucide-react";
import ReactDOM from "react-dom";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        {/* Add your settings form or options here */}
        <p className="text-gray-600">
          Here you can update system preferences, theme, and more.
        </p>
      </div>
    </div>,
    document.body // This makes the modal render at the root level (outside sidebar)
  );
}
