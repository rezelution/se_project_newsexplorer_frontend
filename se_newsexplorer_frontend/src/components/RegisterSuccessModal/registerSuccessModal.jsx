import "./registerSuccessModal.css";
import Modal from "../Modal/modal";

function RegisterSuccessModal({ isOpen, handleCloseClick, handleLoginClick }) {
  return (
    <Modal
      name="registerSuccess_modal"
      isOpen={isOpen}
      onClose={handleCloseClick}
    >
      <div className="registerSuccess__container">
        <h2 className="registerSuccess__title">
          Registration successfully completed!
        </h2>
        <button
          onClick={handleLoginClick}
          type="button"
          className="registerSuccess__signInBtn--loggedOut"
        >
          Sign in
        </button>
      </div>
    </Modal>
  );
}

export default RegisterSuccessModal;
