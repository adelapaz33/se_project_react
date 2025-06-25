import "./SideBar.css";
// import avatar from "../../assets/avatar_photo.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function SideBar({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="Avatar Photo"
      />
      <p className="sidebar__username">{currentUser.name}</p>

      {/* <button onClick={} className="sidebar__edit-btn">
            Change profile data
          </button> */}
      <button onClick={onSignOut} className="sidebar__sign-out-btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
