import "./DeleteConfirmationModal.css";
import closeButton from "../../assets/close_btn.png";

function DeleteConfirmationModal({
  handleCardDelete,
  handleCloseClick,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__confirmation">
        <p className="modal__confirmation-text">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__confirmation-text">This action is irreversible.</p>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img
            src={closeButton}
            alt="Close Button"
            className="modal__close-btn"
          />
        </button>
        <button
          type="button"
          className="modal__delete-btn"
          onClick={handleCardDelete}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__cancel-btn"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
