"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const Popup = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="popup-close-btn" onClick={onClose} aria-label="Close popup">
          <IoMdClose size={24} />
        </button>
        <div className="popup-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
