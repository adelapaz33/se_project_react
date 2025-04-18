import "./ModalWithForm.css";
import closeButton from "../../assets/close_btn.png";
function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  handleCloseClick,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      {/* className={`modal ${activeModal === "add-garment" && "modal_opened"}`} */}
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
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
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
