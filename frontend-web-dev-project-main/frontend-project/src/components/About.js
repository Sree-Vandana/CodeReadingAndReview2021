import "../UI/css/About.css";

/**
 * React function for About page.
 * @returns This returns an about page, describing what the app is abut and who developed the app.
 */
export default function About() {

    return (
      <div className= "About">
        <h1>
          About
        </h1>

        <div className="info">
          <p>
            <center>
            Hello! Welcome to our Movie Dashboard Application. <br/>
            This Movie Dashbaord Application is developed by Andrew Wiles, Shashank Sekhar and Jaya Bhargavi Vengala. <br/>
            We are students at Portland State University and we created this project for our Front-end Course CS 410p/510 under Caterina Paun.
            <br/> 
            </center>
          </p>
        </div>

        <div className="description">
          <h3>
            <center>Project Description</center>
          </h3>
          <p>
            <center>
              This Dashboard application gives information about all the Movies, Tv shows, Web series. <br/>
              When you search a movie it gives information about the cast, description, Imdb rating, release date. <br/><br/>
              <b> Motive: </b> Users can know all the information about the Movies, Tv shows <br/><br/> 
              <b> Main Stack Used: </b> HTML, CSS, JavaScript  <br/><br/>
              <b> Libraries Used: </b> Charts.js, react-js-pagination <br/><br/>
              <b> APIs Used: </b> The Movie Database, The Open Movie Database <br/><br/>
              <b>Frameworks Used: </b> React, Bootstrap 
            </center>
          </p>
        </div>
      </div>
    )
}