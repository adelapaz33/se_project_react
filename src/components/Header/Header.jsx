import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
function Header({ handleAddClick, weatherData, onLoginClick, onSignupClick }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isLoggedIn = currentUser && currentUser.name;

  const renderAvatar = () => {
    if (currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name} avatar`}
          className="header__avatar"
        />
      );
    } else {
      const initial = currentUser.name?.charAt(0).toUpperCase();
      return <div className="header__avatar-placeholder">{initial}</div>;
    }
  };
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
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {renderAvatar()}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__user-container">
          <button onClick={onLoginClick} className="header__log-in-btn">
            Log In
          </button>
          <button onClick={onSignupClick} className="header__sign-up-btn">
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
