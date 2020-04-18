function plotBarChart(x, y, loc) {

  // Trace1 for the horizontal bar chart
  var data = [{
    type: "bar",
    x: x,
    y: y,
    text: x,
    mode: "markers",
    marker: {
      colorscale: "Earth",
      width: 1
    },
  }];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Unemployment Rate"
  };

  Plotly.newPlot(loc, data, layout);
}

function plotMixedChart(x, lineY, barY) {
  new Chart(document.getElementById("mixed-chart"), {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
          label: "Covid Cases",
          type: "line",
          borderColor: "#8e5ea2",
          data: lineY,
          fill: false
        }, {
          label: "Unemployment Claims",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          data: barY,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Covid Cases Versus The Unemployment Claims'
      },
      legend: { display: false }
    }
  });
}

function readUnemploymentData() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  //read the json file
  d3.json("static/data/Hamilton_Co_unemployment_stats.json").then((sampleNames) => {

    var xAxisDataOldRecession = [];
    for (var i = 23; i < 120; i++) {
      xAxisDataOldRecession.push(sampleNames.YearMonth[i]);
    }
    var yAxisDataOldRecession = [];
    for (var i = 23; i < 120; i++) {
      yAxisDataOldRecession.push(sampleNames.Unemployment_Rate[i]);
    }

    plotBarChart(xAxisDataOldRecession, yAxisDataOldRecession, "oldbar");

    console.log(sampleNames.YearMonth.length);

    var xAxisDataNewRecession = [];
    for (var i = 120; i < 181; i++) {
      xAxisDataNewRecession.push(sampleNames.YearMonth[i]);
    }
    var yAxisDataNewRecession = [];
    for (var i = 120; i < 181; i++) {
      yAxisDataNewRecession.push(sampleNames.Unemployment_Rate[i]);
    }

    plotBarChart(xAxisDataNewRecession, yAxisDataNewRecession, "newbar");

  });
}

function readCovidUempClaimsData() {
  d3.json("static/data/Hamilton__covid_weekly_claims.json").then((data) => {

    var xAxisDate = [];
    for (var i = 1; i < 48; i++) {
      xAxisDate.push(data.Date[i]);
    }
    var yAxisCovidData = [];
    for (var i = 1; i < 48; i++) {
      yAxisCovidData.push(data.Count[i]);
    }
    var yAxisClaimsData = [];
    for (var i = 1; i < 48; i++) {
        yAxisClaimsData.push(data.InitialClaims[i]);
    }
    console.log(yAxisClaimsData);
    plotMixedChart(xAxisDate, yAxisCovidData, yAxisClaimsData);
  });
}

readUnemploymentData();
readCovidUempClaimsData();