import PersonLink from "./PersonProfile";
import DonutChart from "./DonutChart";
import "../UI/css/Info.css";

/**
 * A function to display OMDB, tmdb and media info in one page, and to simplefy Info.js file
 * @param {Array} media - Array of objects for our output
 * @param {Array} tmdb - Array of objects, if omdb call wasn't successful, to output
 * @param {Array} ratings - Array of movie ratings
 * @returns  if we have omdb, media, and tmdb isn't empty aka movie, retuns UI containing all that info
 */
export const InfoOMDB = ({media, tmdb, ratings}) => {

  return (
        <div className="container">
          {`Title` in media && `Year` in media ? (
            <h2>
              {media["Title"]} ({media["Year"]})
            </h2>
          ) : `Title` in media ? (
            // if Title is in the object it SHOULD have a title
            <h2>{media["Title"]}</h2>
          ) : (
            // output nothing if neither title nor year in object
            <></>
          )}

          <div className="box1">
            {`Poster` in media ? (
              media["Poster"] ? (
                <img
                  src={media["Poster"]}
                  width="300px"
                  height="440px"
                  alt={
                    `poster for ` + media["Title"] + ` (` + media["Year"] + `)`
                  }
                />
              ) : (
                // Poster field is empty
                <></>
              )
            ) : (
              // Poster isn't in media
              <></>
            )}
          </div>

          <div className="Box1a">
            {`Plot` in media ? (
              media["Plot"] ? (
                <p>Plot: {media["Plot"]}</p>
              ) : (
                // Plot is empty
                <></>
              )
            ) : (
              // Plot isn't in object
              <></>
            )}

            {`Genre` in media ? (
              media["Genre"] ? (
                <p>Genre(s): {media["Genre"]}</p>
              ) : (
                // Genre is empty
                <></>
              )
            ) : (
              // Genre isn't in object
              <></>
            )}

            {`Rated` in media ? (
              media["Rated"] ? (
                <p key={media["Rated"]}>Rating: {media["Rated"]}</p>
              ) : (
                // is empty
                <></>
              )
            ) : (
              // isn't in object

              <></>
            )}

            {`BoxOffice` in media ? (
              media["BoxOffice"] ? (
                <p key={media["BoxOffice"]}>Box Office: {media["BoxOffice"]}</p>
              ) : (
                // BoxOffice is empty
                <></>
              )
            ) : (
              // BoxOffice isn't in object
              <></>
            )}

            {`Director` in media ? (
              <p>Director(s): {media["Director"]}</p>
            ) : (
              // isn't in object
              <></>
            )}

            {tmdb.length !== 0 && `cast` in tmdb ? (
              <p>
                Cast:
                {tmdb["cast"].map((each, i) =>
                  i === tmdb["cast"].length - 1 ? (
                    <PersonLink
                      key={each["id"]}
                      id={each["id"]}
                      last={true}
                      personName={each["name"]}
                    />
                  ) : (
                    <PersonLink
                      key={each["id"]}
                      id={each["id"]}
                      last={false}
                      personName={each["name"]}
                    />
                  )
                )}
              </p>
            ) : (
              <p>Cast: {media["Actors"]}</p>
            )}

            {`Writer` in media ? (
              media["Writer"] ? (
                <p>Writers: {media["Writer"]}</p>
              ) : (
                // Writer is empty
                <></>
              )
            ) : (
              // Writer isn't in object
              <></>
            )}

            {`Runtime` in media ? (
              <p>Runtime: {media["Runtime"]}</p>
            ) : (
              // Runtime isn't in object
              <></>
            )}

            {`Production` in media ? (
              media["Production"] ? (
                <p>Production: {media["Production"]}</p>
              ) : (
                // is empty
                <></>
              )
            ) : (
              // isn't in object
              <></>
            )}

            {`Released` in media ? (
              media["Released"] ? (
                <p>Release date: {media["Released"]}</p>
              ) : (
                // is empty
                <></>
              )
            ) : (
              // isn't in object

              <></>
            )}
          </div>

          {ratings ? (
            <div className="box2">
              {ratings.map((each) => (
                <DonutChart rating={each} key={each["Source"]} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
}

export default InfoOMDB;
