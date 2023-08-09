import { useContext, useEffect, useState } from "react";
import { RestaurantsContext } from "..";
import { Link, useParams } from "react-router-dom";
import Review from "../Components/Review";
import Modal from "../Components/Modal";

const DetailsPage = () => {
  const { restaurantsInfo, setRestaurantsInfo } = useContext(
    RestaurantsContext
  );

  const [review, setReview] = useState({
    rating: "",
    revName: "",
    comment: "",
    pp: ""
  });

  const [editReview, setEditReview] = useState({
    rating: "",
    revName: "",
    comment: "",
    pp: ""
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isEditMode) {
      setEditReview({
        rating: "",
        revName: "",
        comment: "",
        pp: ""
      });
    } else {
      setReview({
        rating: "",
        revName: "",
        comment: "",
        pp: ""
      });
    }
  };

  const selectedRestaurant = restaurantsInfo.find(
    (restaurant) => restaurant.id == id
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setEditReview((prevState) => {
        return {
          ...prevState,

          [name]: value
        };
      });
    } else {
      setReview((prevState) => {
        return {
          ...prevState,
          [name]: value
        };
      });
    }
  };

  const handleAddReview = (id, comment) => {
    if (isEditMode) {
      const updatedRestaurantInfo = restaurantsInfo.map((restaurant) =>
        restaurant.id === id
          ? {
              ...restaurant,
              ratings: restaurant.ratings.map((review) =>
                review.comment === comment ? editReview : review
              )
            }
          : restaurant
      );
      setRestaurantsInfo(updatedRestaurantInfo);

      localStorage.setItem(
        "restaurants",
        JSON.stringify(updatedRestaurantInfo)
      );

      console.log(editReview, "EDIT REVIEW");

      setEditReview({
        rating: "",
        revName: "",
        comment: "",
        pp: ""
      });
      setIsEditMode(false);
      setIsModalOpen(false);
    } else {
      const newReview = {
        rating: review.rating,
        comment: review.comment,
        pp: review.pp,
        revName: review.revName
      };

      const updatedRestaurantInfo = restaurantsInfo.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, ratings: [...restaurant.ratings, newReview] }
          : restaurant
      );

      setRestaurantsInfo(updatedRestaurantInfo);

      localStorage.setItem(
        "restaurants",
        JSON.stringify(updatedRestaurantInfo)
      );

      setReview({
        rating: "",
        revName: "",
        comment: "",
        pp: ""
      });
      setIsModalOpen(false);
    }
  };

  const handleDeleteReview = (id, comment) => {
    const updatedRestaurantInfo = restaurantsInfo.map((restaurant) =>
      restaurant.id === id
        ? {
            ...restaurant,
            ratings: restaurant.ratings.filter(
              (review) => review.comment !== comment
            )
          }
        : restaurant
    );
    setRestaurantsInfo(updatedRestaurantInfo);
    localStorage.setItem("restaurants", JSON.stringify(updatedRestaurantInfo));
  };

  const handleEditReview = (comment) => {
    setEditReview(
      selectedRestaurant.ratings.find((review) => review.comment == comment)
    );
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const avgRatings = selectedRestaurant.ratings.reduce(
    (acc, curr) =>
      acc + Number(curr.rating) / selectedRestaurant.ratings.length,
    0
  );

  useEffect(() => {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      setRestaurantsInfo(JSON.parse(storedRestaurants));
    }
  }, []);

  const menus = selectedRestaurant.menu.map((e) => e.name);
  return (
    <div className="details--body">
      <Link to="/">
        <span>{<i class="fa-solid fa-arrow-left"></i>}</span> Back
      </Link>
      <div className="details--div">
        <div className="detailsPage--top">
          <div>
            <h1>{selectedRestaurant.name}</h1>
            <p>{menus.join(", ")}</p>
            <p>{selectedRestaurant.address}</p>
            <p>Average rating : {avgRatings.toFixed(2)}</p>
          </div>
          <div>
            <button onClick={openModal}>Add Review</button>
          </div>
        </div>
        <div>
          <h3 style={{ textAlign: "left", marginTop: "4rem" }}> Reviews </h3>
          {selectedRestaurant.ratings.map(
            ({ rating, revName, comment, pp }) => (
              <Review
                rating={rating}
                revName={revName}
                comment={comment}
                pp={pp}
                key={pp}
                onDelete={() =>
                  handleDeleteReview(selectedRestaurant.id, comment)
                }
                onEdit={() => handleEditReview(comment)}
              />
            )
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="review--modal">
          <h2>Add your review</h2>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="revName"
            value={isEditMode ? editReview.revName : review.revName}
            id="name"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="image">Image : </label>
          <input
            type="text"
            name="pp"
            value={isEditMode ? editReview.pp : review.pp}
            id="image"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="rating">Select rating : </label>
          <select
            name="rating"
            value={isEditMode ? editReview.rating : review.rating}
            id="rating"
            onChange={(e) => handleChange(e)}
          >
            <option>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label>Comment : </label>
          <input
            type="text"
            name="comment"
            value={isEditMode ? editReview.comment : review.comment}
            onChange={(e) => handleChange(e)}
          />
          <button
            onClick={() =>
              handleAddReview(selectedRestaurant.id, editReview.comment)
            }
          >
            {isEditMode ? "Save" : "Submit"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DetailsPage;
