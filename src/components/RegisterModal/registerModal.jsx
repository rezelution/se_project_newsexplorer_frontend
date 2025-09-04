import ModalWithForm from "../ModalWithForm/modalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  handleLoginClick,
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
      onRegister({
        email: values.email,
        password: values.password,
        userName: values.userName,
      });
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      name="sign-up"
      onClick={handleLoginClick}
      alternateButtonText={
        <>
          or <span className="modal__alternate-title">Sign In</span>
        </>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="registrationEmail"
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
          id="registrationPassword"
          placeholder="Enter password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="userName" className="modal__label">
        Username
        <input
          type="text"
          name="userName"
          className="modal__input"
          id="registrationUserName"
          placeholder="Enter username"
          onChange={handleChange}
          value={values.userName || ""}
          required
        />
        {errors.userName && (
          <span className="modal__error">{errors.userName}</span>
        )}
      </label>
    </ModalWithForm>
  );
}
