import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardLike, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  // const isLiked = item.likes.some((id) => id === currentUser._id);
  const isLiked =
    Array.isArray(item.likes) && currentUser?._id
      ? item.likes.some((id) => id === currentUser._id)
      : false;
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;
  const isLoggedIn = !!currentUser?._id;
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    console.log("Clicked like for:", item._id);
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
