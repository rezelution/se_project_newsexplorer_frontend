import "./modalWithForm.css";
import Modal from "../Modal/modal";

function ModalWithForm({
  name,
  onClose,
  isOpen,
  customClass,
  title,
  onSubmit,
  children,
  isValid,
  buttonText,
  onClick,
  alternateButtonText,
}) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      isOpen={isOpen}
      customClass={customClass}
    >
      <h2 className="modal__title">{title}</h2>

      <form onSubmit={onSubmit} className="modal__form">
        {children}
        <div className="modal__button-group">
          <button
            type="submit"
            className={`modal__submit ${
              isValid ? "modal__submit_valid" : "modal__submit_invalid"
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
          <button
            onClick={onClick}
            type="button"
            className="modal__alternate-button"
          >
            {alternateButtonText}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
