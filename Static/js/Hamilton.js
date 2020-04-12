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

function buildPlot() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  //read the json file
  d3.json("static/data/Hamilton_Co_unemployment_stats.json").then((sampleNames) => {
    console.log(sampleNames);
    var xAxisDataOldRecession = [];
    for (var i = 23; i < 120; i++) {
      xAxisDataOldRecession.push(sampleNames.YearMonth[i]);
    }
    var yAxisDataOldRecession = [];
    for (var i = 23; i < 120; i++) {
      yAxisDataOldRecession.push(sampleNames.Unemployment_Rate[i]);
    }
    console.log(xAxisDataOldRecession);
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

buildPlot();