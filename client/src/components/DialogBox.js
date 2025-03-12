import React from "react";
import { motion } from "framer-motion";

const DialogBox = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dialogHolder">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg shadow-lg p-6 w-96 dialogBox"
      >
        {/* Title & Close Button */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-red-500 hover:text-gray-700 cross">
            ✖
          </button>
        </div>

        {/* Dialog Content */}
        <div className="mt-4">{children}</div>

        {/* Close Button */}
        {/* <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 btnRed">
            Close
          </button>
        </div> */}
      </motion.div>
    </div>
  );
};

export default DialogBox;
