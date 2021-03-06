import { useState, useEffect } from "react";
import "../UI/css/personInfo.css";


/**
 * function to fetch actors information, by providing their first, last name and ID assosiated with theor name sin TMDB Database.
 * @param {Number} id - actor ID
 * @param {String} last - last name of actor
 * @param {String} personName - first name of the actor
 * @returns a person's name properly linked so it will open the person's page when selected
 */
const PersonLink = ({ id, last, personName }) => {
  const [error, setError] = useState(null);  // error handling for exceptions.
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState();
  const baseURL = window.location.protocol + "//" + window.location.host + "/info/";

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await fetch( 
          "https://api.themoviedb.org/3/person/" + 
          id + 
          "?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY + 
          "&language=en-US" 
        )
        .then((res) => res.json())
        .then(
          (result) => {
            setPerson(result);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );
    };
    fetchInfo();
  }, [id]);

  if (error) {
    return <div>Error: {error.messsage}</div>;
  } else if (loading) {
    return <></>;
  } else {
    if (person) {
      let name = person["name"];
      if (!last) {
        name = name + ",";
      }
      return (
        <a
          href={baseURL + person["tmdb_id"] + "/person/" + person["id"]}
          key={id}
        >
          {name}
        </a>
      );
    } else {
      return personName;
    }
  }
};

export default PersonLink;
