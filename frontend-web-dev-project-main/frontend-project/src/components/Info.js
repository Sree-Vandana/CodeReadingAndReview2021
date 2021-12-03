import { useState, useEffect } from "react";
import Person from "./PersonInfo";
import InfoOMDB from "./InfoOMDB";
import InfoTVShow from "./InfoTVShow";
import "../UI/css/Info.css";

/**
 * function to fetch information about the movie, based on parameters present in URL
 * @param {String} mediaType - valid strings: movie, tv, person
 * @param {Number} imdbID - if the returned object, using this id, is valid, the id was valid
 * @param {Number} tmdbID - if the returned object, using this id, is valid, the id was valid
 * @returns Info page based on params in the url
 */
export default function Info(props) {
  const [error, setError] = useState(null); // error handling for exceptions
  const [media, setMedia] = useState([]);   // Array of objects for our output
  const [ratings, setRatings] = useState();
  const [loading, setLoading] = useState(false);
  const [omdb, setOmdb] = useState(true);   // Flag if omdb call was successful
  const [tmdb, setTmdb] = useState([]);   // Array of objects, if omdb call wasn't successful, to output
  const [type] = useState(props["match"]["params"]["mediaType"]);
  const [id] = useState(props["match"]["params"]["imdbID"]);
  const [tmdbID] = useState(props["match"]["params"]["tmdbID"]);

  useEffect(() => { // Useeffect to fetch all the media data form API
    const fetchMedia = async () => {
      setLoading(true);

      const res = await fetch( 
          "https://www.omdbapi.com/?i=" + 
          id + 
          "&apikey=" + 
          process.env.REACT_APP_OMDB_API_KEY 
        )
        .then(
          (res) => res.json(),
          (error) => {
            setError(error);
          }
        )
        .catch(() => setOmdb(false));

      // If omdb doesn't have the media, thus we need to get the information from tmdb
      if ( res === undefined ||  res.length === 0 ||  res["Response"] === "False" ) {
        let specificRes = [];
        if (type !== "person" && type !== "null" && id !== "null") {
          specificRes = await fetch( 
              "https://api.themoviedb.org/3/" + 
              type + 
              "/" +
              id + 
              "?api_key=" + 
              process.env.REACT_APP_TMDB_API_KEY + 
              "&language=en-US"
            )
          .then(
            (res) => res.json(),
            (error) => {
              setError(error);
            }
          );
        }

        if (specificRes.length === 0 || specificRes["success"] === false) {
          specificRes = await fetch( 
              "https://api.themoviedb.org/3/" + 
              type + 
              "/" + 
              tmdbID + 
              "?api_key=" + 
              process.env.REACT_APP_TMDB_API_KEY + 
              "&language=en-US"
            )
          .then(
            (res) => res.json(),
            (error) => setError(error)
          );
        }
        setMedia(specificRes);
        setOmdb(false); // INFO: we couldn't use omdb
      } else {
        setMedia(res);
        setRatings(res["Ratings"]);
      }

      // INFO: Always grab the list of credits - tmdb contains the most and we can link to profiles
      let resCredits = [];
      if (id !== "null")
        resCredits = await fetch( 
            "https://api.themoviedb.org/3/" + 
            type + 
            "/" + 
            id +  
            "/credits?api_key=" + 
            process.env.REACT_APP_TMDB_API_KEY +  
            "&language=en-US" 
          )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));

      if ((resCredits.length === undefined || resCredits.length === 0) && tmdbID ) {
        resCredits = await fetch( 
            "https://api.themoviedb.org/3/" + 
            type + 
            "/" +  
            tmdbID + 
            "/credits?api_key=" + 
            process.env.REACT_APP_TMDB_API_KEY + 
            "&language=en-US"
          )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));
      }
      setTmdb(resCredits);
      setLoading(false);
    };
    fetchMedia();
  }, [type, id, tmdbID]);

  if (error) {
    <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    if (omdb && media && tmdb !== []) { // INFO: if we have omdb, media, and tmdb isn't empty aka movie
      return (
        <InfoOMDB omdb={omdb} media={media} tmdb={tmdb} ratings={ratings} />
      );
    } else if (type !== "person") { // tv show
      return(
        <InfoTVShow type={type} media={media} tmdb={tmdb}/>
      );
    } else { // output person
      return (
        <div className="container">
          <Person tmdbID={tmdbID} />
        </div>
      );
    }
  }
}
