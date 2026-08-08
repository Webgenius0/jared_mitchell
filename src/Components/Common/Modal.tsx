"use client";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  className,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className={`relative z-10 w-full max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto p-5 bg-white rounded shadow-lg ${className}`}
      >
        {title && <p className="text-black text-lg font-medium">{title}</p>}
        {children}

        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer grid place-items-center"
        >
          <RxCross2 className="text-xl text-black" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
