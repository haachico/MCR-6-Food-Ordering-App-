import { createContext, useState } from "react";
import { restaurantsData } from "../db/data";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurantsInfo, setRestaurantsInfo] = useState(restaurantsData);
  return (
    <div>
      <RestaurantsContext.Provider
        value={{ restaurantsInfo, setRestaurantsInfo }}
      >
        {children}
      </RestaurantsContext.Provider>
    </div>
  );
};
