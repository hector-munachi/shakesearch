
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center rounded overflow-hidden shadow-lg mb-3 px-6 py-4">
      <div className="p-4 rounded-md shadow-md bg-red-200 w-96 h-50">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700 font-bold"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
