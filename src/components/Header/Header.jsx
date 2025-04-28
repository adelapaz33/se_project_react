import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar_photo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        {" "}
        <img src={logo} alt="wtwr Logo" className="header__logo" />{" "}
      </Link>

      <p className="header__details">
        {currentDate}, {weatherData.city}{" "}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrencce Tegegne</p>
          <img
            src={avatar}
            alt="Terrencce Tegegne Photo"
            className="header__avatar"
          />
        </div>
      </Link>
    </header>
  );
}

export default Header;
