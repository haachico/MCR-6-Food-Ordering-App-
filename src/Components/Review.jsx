const Review = ({ revName, pp, comment, rating, onDelete, onEdit }) => {
  const starIcon = <i class="fa-solid fa-star"></i>;

  const starIconsArray = Array.from({ length: Number(rating) }, (_, index) => (
    <span key={index}>{starIcon}</span>
  ));
  return (
    <div>
      <div className="review--card">
        <div className="reviewCard--icons">
          <span onClick={onEdit}>
            <i class="fa-regular fa-pen-to-square"></i>
          </span>
          <span onClick={onDelete}>
            <i class="fa-solid fa-trash"></i>
          </span>
        </div>
        <div>
          <div className="profile">
            <img
              src={
                pp ||
                "https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              }
              alt={revName}
            />
            <h4>{revName}</h4>
          </div>
          <p>{comment}</p>
        </div>
        <div>
          <div className="rating--div">
            <span className="star--icon">{starIconsArray}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
