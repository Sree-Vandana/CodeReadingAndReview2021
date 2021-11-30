import "./movieCard.css";

/**
 * This method is used to create a movie card container, to display movie poster and its name.
 * @param {*} props 
 * @returns UI component of a movie card, with its poster and movie Title in the bottom. This is a hiper link, whcih will take to new page that gives complete details about that movie.
 */
export const MovieCard = (props) => {
  let { each } = props;
  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";

  return (
    <div className="card-container">
      <a href={baseURL + each.imdbID} className="card">
        {/* <p>IMDB rating: {each.imdbID}</p> */}
        <img
          style={{ width: "100%", height: "100%" }}
          src={each.Poster}
          alt={`${each.Title}`}
          width="200"
        />
        <h5 style={{ textAlign: "center", color: "black" }}>
          {each.Title} ({each.Year})
        </h5>
      </a>
    </div>
  );
};

export default MovieCard;
