import { Doughnut } from "react-chartjs-2";
import "../styles/DonutChart.css";
import "../styles/Info.css";

/**
 * @param {Object} rating
 * @returns Doughnut chart, with label, in a div
 */
const DonutChart = ({ rating }) => {
  // CLARIFICATION: we only take a certain substring to get the numerical values
  let ratingVal = rating["Value"].substring(0, rating["Value"].indexOf("/"));
  if (!ratingVal) {
    ratingVal = rating["Value"].substring(0, rating["Value"].indexOf("%"));
  }
  // CLARIFICATION: we assume the default max is 100 unless it is TMDB, then it is 10
  let maxScore = 100;
  if (rating["Source"] === "Internet Movie Database") {
    maxScore = 10;
  }
  // CLARIFICATION: we premake the data object
  const data = {
    labels: ["Rating", "Rating from max score"],
    datasets: [
      {
        label: "Score",
        backgroundColor: ["#B21F00", "#FFFFFF"],
        hoverBackgroundColor: ["#501800", "#FFFFFF"],
        data: [ratingVal, maxScore - ratingVal],
      },
    ],
    text: ratingVal,
  };
  return (
    <div className="chart-container">
      <label htmlFor="ratingsChart">
        {rating["Source"]} Rating: {ratingVal}
      </label>
      <Doughnut
        id="ratingsChart"
        aria-label="donut chart"
        role="img"
        data={data}
        options={{
          aspectRatio: 1,
          title: {
            display: true,
            text: rating["Source"],
            fontSize: 20,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default DonutChart;
