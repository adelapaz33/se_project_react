import "./EditProfileModal.css";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({
  isOpen,
  handleCloseClick,
  handleEditProfileSubmission,
  // handleEditClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setUserData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);
  const handleNameChange = (e) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleImageChange = (e) => {
    setUserData({ ...userData, avatar: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfileSubmission(userData);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit} // change to onSubmit?
    >
      <label htmlFor="nameEdit" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="nameEdit"
          onChange={handleNameChange}
          value={userData.name}
        />
      </label>
      <label htmlFor="" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarURLEdit"
          onChange={handleImageChange}
          value={userData.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
