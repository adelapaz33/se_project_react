import "./SideBar.css";
// import avatar from "../../assets/avatar_photo.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function SideBar({ onSignOut, handleEditClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-data">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Avatar Photo"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button onClick={handleEditClick} className="sidebar__edit-btn">
        Change profile data
      </button>
      <button onClick={onSignOut} className="sidebar__sign-out-btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
