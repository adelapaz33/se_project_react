import "./DeleteConfirmationModal.css";
import closeButton from "../../assets/close_btn.png";

function DeleteConfirmationModal({
  handleCardDelete,
  handleCloseClick,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal-confirmation">
        <p className="modal-confirmation__text">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>

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
          className="modal-confirmation__delete-btn"
          onClick={handleCardDelete}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal-confirmation__cancel-btn"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
