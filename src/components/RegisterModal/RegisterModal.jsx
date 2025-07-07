import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({
  isOpen,
  handleCloseClick,
  onRegister,
  setActiveModal,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  const handleEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, avatar: e.target.value });
  };
  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      footerContent={
        <button
          type="button"
          className="modal__register-btn"
          onClick={() => setActiveModal("login")}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="emailRegister" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="emailRegister"
          placeholder="Email"
          required
          onChange={handleEmail}
          value={formData.email}
        />
      </label>
      <label htmlFor="passwordRegister" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="passwordRegister"
          placeholder="Password"
          required
          onChange={handlePassword}
          value={formData.password}
        />
      </label>
      <label htmlFor="nameRegister" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="nameRegister"
          placeholder="Name"
          required
          onChange={handleNameChange}
          value={formData.name}
        />
      </label>
      <label htmlFor="avatarURLRegister" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarURLRegister"
          placeholder="Avatar URL"
          required
          onChange={handleImageChange}
          value={formData.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
export default RegisterModal;
