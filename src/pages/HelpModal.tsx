import { X, HelpCircle } from "lucide-react";
import ReactDOM from "react-dom";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-purple-light rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close help modal"
        >
          <X />
        </button>

        <div className="flex items-center space-x-2 mb-6">
          <HelpCircle className="w-8 h-8 dark:text-purple-400" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-purple-400">
            Help Center
          </h2>
        </div>

        <div className="space-y-4 text-gray-600 dark:text-purple-400">
          <h3 className="font-semibold">How to Use</h3>
          <p>
            To get started, navigate to the dashboard and explore the features
            available. If you need assistance, check the FAQ section or reach
            out to customer support.
          </p>

          <h3 className="font-semibold">FAQ</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>How do I reset my password?</li>
            <li>How do I contact support?</li>
            <li>Where can I find more resources?</li>
          </ul>

          <div className="mt-4">
            <button
              onClick={() => alert("Contact Support")}
              className="bg-violet-700 text-white px-4 py-2 rounded-lg w-full hover:bg-violet-800 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
