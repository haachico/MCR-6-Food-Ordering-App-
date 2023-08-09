import { Link } from "react-router-dom";

const Menu = ({ id, restaurantName, name, image, price, qty }) => {
  return (
    <Link to={`details/${id}`}>
      <div className="menu--card">
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>
          Rs {price} for {qty}
        </p>
        <p>{restaurantName}</p>
      </div>
    </Link>
  );
};

export default Menu;
