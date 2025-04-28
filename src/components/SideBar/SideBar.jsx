import "./SideBar.css";
import avatar from "../../assets/avatar_photo.png";
function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar Photo" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
