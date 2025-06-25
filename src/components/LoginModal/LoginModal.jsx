import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function LoginModal({ isOpen, handleCloseClick, onLogin, setActiveModal }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };
  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onLogin={handleSubmit}
      footerContent={
        <button
          type="button"
          className="modal__register-btn"
          onClick={() => setActiveModal("registration")}
        >
          or Register
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          onChange={handleEmail}
          value={formData.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          onChange={handlePassword}
          value={formData.password}
        />
      </label>
      {/* <button className="modal__register-btn">or Register</button> */}
    </ModalWithForm>
  );
}

export default LoginModal;
