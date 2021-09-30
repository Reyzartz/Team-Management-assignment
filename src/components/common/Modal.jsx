import "styles/Modal.css";

const Modal = ({ open, onClose, children }) => {
  const onCloseHandler = (event) => {
    if (event.target.attributes.modal) {
      onClose();
    }
  };
  return (
    <div
      className={`modal ${open && "open"}`}
      onClick={onCloseHandler}
      modal="true"
    >
      {children}
    </div>
  );
};

export default Modal;
