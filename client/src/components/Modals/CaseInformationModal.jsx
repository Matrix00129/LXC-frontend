import { useState, useEffect, useRef } from "react";

export const CaseInformationModal = ({ show, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(show);
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#ebeef5] flex items-center justify-center overflow-scroll"
          ref={modalRef}
        >
          <div
            className="fixed inset-0 transition-opacity cursor-pointer"
            onClick={handleClose}
            ref={modalRef}
          ></div>
          <div ref={modalRef} className=" p-3 z-20 max-h-full">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

