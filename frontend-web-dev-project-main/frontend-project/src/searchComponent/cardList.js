import React from "react";
import "./cardList.css";
import { MovieCard } from "./movieCard";

/**
 * This is a function to display all movie cards.
 * @returns List of movie cards UI 
 */
export const CardList = (props) => {
  return (
    <>
      <h1>Search Results</h1>
      <div className="card-list">
        {props.results.map((each) => (
          <MovieCard key={each.id} each={each} />
        ))}
      </div>
    </>
  );
};

export default CardList;
