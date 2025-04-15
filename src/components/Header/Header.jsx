import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar_photo.png";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="wtwr Logo" className="header__logo" />
      <p className="header__details">
        {currentDate}, {weatherData.city}{" "}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrencce Tegegne</p>
        <img
          src={avatar}
          alt="Terrencce Tegegne Photo"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
