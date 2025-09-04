import "./ConfirmationModal.css";
import Modal from "../Modal/modal";

function ConfirmationModal({
  isOpen,
  handleCloseClick,
  handleItemDelete,
  article,
}) {
  return (
    <Modal name="confirmation" isOpen={isOpen} onClose={handleCloseClick}>
      <div className="confirmationModal__container">
        <h2 className="confirmationModal__title">
          Are you sure you want to remove this news article?
        </h2>

        <div className="confirmationModal__button_group">
          <button
            onClick={() => handleItemDelete(article)}
            type="button"
            className="confirmationModal__button confirmationModal__button--delete"
          >
            Yes, delete this news article.
          </button>
          <button
            onClick={handleCloseClick}
            type="button"
            className="confirmationModal__button confirmationModal__button--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
