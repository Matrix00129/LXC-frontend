import  { useState, useEffect, useRef } from "react";

export const Modal = ({ show, onClose, children }) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" ref={modalRef}>
          <div
            className="fixed inset-0 bg-[#707070] opacity-80 cursor-pointer"
            onClick={handleClose}
            ref={modalRef}
          ></div>
          <div
            ref={modalRef}
            className=" p-3 z-20 md:w-3/5 overflow-y-auto max-h-full scrollbar-hide"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
