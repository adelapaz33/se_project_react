import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { filterWeatherData, getWeather } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import {
  getItems,
  postItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import * as auth from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [authChecked, setAuthChecked] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditClick = () => {
    setActiveModal("edit-profile");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openConfirmationModal = () => {
    setActiveModal("delete-confirmation");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          navigate("/profile");
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        })
        .finally(() => {
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, []);
  const handleCardDelete = () => {
    // console.log("Selected card:", selectedCard);
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    postItem({ name, imageUrl, weather }, token)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleLogin = (formData) => {
    // console.log(formData);
    const { email, password } = formData;
    return auth
      .signIn(email, password)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        // navigate("/profile");
        closeActiveModal();
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const navigate = useNavigate();
  const handleRegistration = (formData) => {
    const { email, password, name, avatar } = formData;
    console.log("signUp called with:", { name, avatar, email, password });

    auth
      .signUp(email, password, name, avatar)

      .then(() => {
        return auth.signIn(email, password);
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
        setIsLoggedIn(true); // may need to delete this
        closeActiveModal();
        // navigate("/profile");
      })
      .catch(console.error);
  };

  const handleEditProfileSubmission = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((res) => {
        console.log("Update profile response:", res);
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
  };
  // const handleCardLike = ({ id, isLiked }) => {
  //   console.log("handleCardLike called with", { id, isLiked });
  //   const token = localStorage.getItem("jwt");

  //   !isLiked
  //     ? api
  //         .addCardLike(id, token)
  //         .then((updatedCard) => {
  //           setClothingItems((cards) =>
  //             cards.map((item) => (item._id === id ? updatedCard : item))
  //           );
  //         })
  //         .catch((err) => console.log(err))
  //     : api
  //         .removeCardLike(id, token)
  //         .then((updatedCard) => {
  //           setClothingItems((cards) =>
  //             cards.map((item) => (item._id === id ? updateCard : item))
  //           );
  //         })
  //         .catch((err) => console.log(err));
  // };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const request = !isLiked ? addCardLike : removeCardLike;

    request(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    console.log("logout button clicked");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        // console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setActiveModal("login")}
              onSignupClick={() => setActiveModal("registration")}
            />{" "}
            {authChecked && (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        clothingItems={clothingItems}
                        handleSignOut={handleSignOut}
                        handleEditClick={handleEditClick}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            )}
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            handleCloseClick={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          ></AddItemModal>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            openConfirmationModal={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            handleCloseClick={closeActiveModal}
            handleCardDelete={handleCardDelete}
          />
          <RegisterModal
            isOpen={activeModal === "registration"}
            onRegister={handleRegistration}
            handleCloseClick={closeActiveModal}
            setActiveModal={setActiveModal}
          />
          <LoginModal
            onLogin={handleLogin}
            isOpen={activeModal === "login"}
            handleCloseClick={closeActiveModal}
            setActiveModal={setActiveModal}
          />
          <EditProfileModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            handleEditProfileSubmission={handleEditProfileSubmission}
            handleEditClick={handleEditClick}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
