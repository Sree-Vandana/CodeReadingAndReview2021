import PersonLink from "./PersonProfile";
import "../UI/css/Info.css";

/**
 * A function to display TV show info in one page, and to simplefy Info.js file
 * @param {any} type - media type
 * @param {Array} tmdb - Array of objects, if omdb call wasn't successful, to output
 * @param {Array} media - Array of objects for our output
 * @returns  UI component related TV show
 */
export default function InfoTVShow({type, media, tmdb }) {

     return (
        <div className="container">
          {`title` in media && `release_date` in media ? (
            <h2>
              {media["title"]} ({media["release_date"].slice(0, 4)})
            </h2>
          ) : `title` in media ? (
            <h2>{media["title"]} </h2>
          ) : (
            <h2>Unknown {type}</h2>
          )}
          {`release_date` in media || `overview` in media ? (
            <div className="TMDB-box">
              <center>
                {`release_date` in media ? (
                  media["release_date"] ? (
                    <img
                      height="350px"
                      width="350px"
                      src={
                        `https://image.tmdb.org/t/p/original/` +
                        media["poster_path"]
                      }
                      alt={
                        `poster for ` +
                        media["title"] +
                        ` (` +
                        media["release_date"].slice(0, 4) +
                        `)`
                      }
                    />
                  ) : (
                    <img
                      src={
                        `https://image.tmdb.org/t/p/original/` +
                        media["poster_path"]
                      }
                      alt={`poster for ` + media["title"]}
                    />
                  )
                ) : (
                  <></>
                )}

                {`overview` in media ? (
                  media["overview"] ? (
                    <p>
                      <br></br>
                      <b>Overview: </b>
                      <br></br> {media["overview"]}
                    </p>
                  ) : (
                    // is empty
                    <></>
                  )
                ) : (
                  // isn't in object
                  <></>
                )}
              </center>
            </div>
          ) : (
            <></>
          )}

          {`cast` in tmdb ||
          `budget` in media ||
          `production_companies` in media ||
          `crew` in tmdb ||
          `homepage` in media ? (
            <div className="TMDB-box2">
              <center>
                {`cast` in tmdb ? (
                  tmdb["cast"] ? (
                    <p>
                      <br></br>
                      Cast: <br></br>
                      {tmdb["cast"].map((each, i) =>
                        i === tmdb["cast"].length - 1 ? (
                          <PersonLink
                            key={each["id"]}
                            id={each["id"]}
                            last={true}
                            personName={each["name"]}
                          />
                        ) : (
                          // each["name"] + `, `
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
                    // cast is empty - haven't seen a case but just in case we have this
                    <></>
                  )
                ) : (
                  // cast not in object
                  <></>
                )}
                {`budget` in media ? (
                  media["budget"] ? (
                    <p key={media["budget"]}>Budget: {media["budget"]}</p>
                  ) : (
                    // budget not set
                    <></>
                  )
                ) : (
                  // budget not in media
                  <></>
                )}
                {`production_companies` in media ? (
                  media["production_companies"] ? (
                    <p>
                      <b> Production Companies : </b>
                      {media["production_companies"].map((each, i) =>
                        i === media["production_companies"].length - 1
                          ? each["name"]
                          : each["name"] + `, `
                      )}
                    </p>
                  ) : (
                    // is empty
                    <></>
                  )
                ) : (
                  // isn't in object
                  <></>
                )}
                <br />
                {`crew` in tmdb ? (
                  tmdb["crew"] ? (
                    tmdb["crew"].map((each) => (
                      <p key={each["name"]}>
                        <br />
                        {each["job"] + `: ` + each["name"]}
                      </p>
                    ))
                  ) : (
                    // is empty
                    <></>
                  )
                ) : (
                  // isn't in object
                  <></>
                )}
                <br />
                {`homepage` in media ? (
                  media["homepage"] ? (
                    <a href={media["homepage"]} key={media["homepage"]}>
                      <b>Homepage</b>
                    </a>
                  ) : (
                    // homepage not set
                    <></>
                  )
                ) : (
                  // homepage not in object
                  <></>
                )}
              </center>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
}