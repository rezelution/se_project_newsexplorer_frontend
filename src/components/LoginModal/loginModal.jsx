import ModalWithForm from "../ModalWithForm/modalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";

export default function LogInModal({
  isOpen,
  onClose,
  handleLogin,
  handleRegisterClick,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    if (!e.target.checkValidity()) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    if (isValid) {
      handleLogin({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      name="sign-in"
      onClick={handleRegisterClick}
      alternateButtonText={
        <>
          or <span className="modal__alternate-title">Sign Up</span>
        </>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="loginEmail"
          placeholder="Enter email"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="loginPassword"
          placeholder="Enter password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
