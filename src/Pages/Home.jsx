import { useState } from "react";
import { cuisineData } from "../db/data";
import { useContext } from "react";

import { RestaurantsContext } from "..";
import Menu from "../Components/Menu";
const Home = () => {
  const { restaurantsInfo } = useContext(RestaurantsContext);
  const [selectedCuisineID, setSelectedCuisineID] = useState(null);

  const selectedCuisineRestaurants = restaurantsInfo.filter(
    (restaurant) => restaurant.cuisine_id === selectedCuisineID
  );

  console.log(selectedCuisineRestaurants);
  return (
    <div className="home--div">
      <h1>Select your cuisine</h1>
      {cuisineData.map(({ id, name }) => (
        <button key={id} onClick={() => setSelectedCuisineID(id)}>
          {name}
        </button>
      ))}
      <div className="restaurants--div">
        {selectedCuisineRestaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <h2> Dishes by {restaurant.name}</h2>
            <div className="list">
              {restaurant.menu.map(({ imgSrc, name, price, qty }) => (
                <Menu
                  id={restaurant.id}
                  image={imgSrc}
                  name={name}
                  price={price}
                  qty={qty}
                  key={name}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
