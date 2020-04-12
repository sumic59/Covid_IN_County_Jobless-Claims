/*
Function to create Chart out of 2008 Monthly Unemployment Data using Chart.js
*/
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("static/data/" + sample +".json").then(function(data) {

    
   // Grab the values from the json data
    var yearData = [];
    for (var i = 0; i < 12; i++) {
      yearData.push(data.periodName[i]);
      //console.log(data.periodName[i]);
    }
    var unemployData = [];
    for (var i = 0; i < 12; i++) {
      unemployData.push(data.Unemployed[i]);
      //console.log(data.Unemployed[i]);
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: yearData,
            datasets: [
            {
                    label: "2008 Recession",
                    fillColor: "blue",
                    strokeColor: "yellow",
                    pointColor: "red",
                    pointStrokeColor: "grey",
                    pointHighlightFill: "purple",
                    pointHighlightStroke: "green",
                    data: unemployData
            }
            ]}
});
});
}
/*
Function to create Chart out of 2020 Weekly Claims Data using Chart.js
*/
function buildWeeklyReport(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("static/data/Weekly" + sample +".json").then(function(data) {
    
    // Grab the values from the json data
     var yearData = [];
     for (var i = 0; i < 12; i++) {
       yearData.push(data.Week[i]);
       console.log(data.Week[i]);
     }
     var unemployData = [];
     for (var i = 0; i < 12; i++) {
       unemployData.push(data.Claims[i]);
       console.log(data.Claims[i]);
     }
     var ctx = document.getElementById("claimChart").getContext("2d");
     var myChart = new Chart(ctx, {
             type: 'line',
             data: {
                     labels: yearData,
             datasets: [
             {
                     label: "2020 Claims dataset",
                     fillColor: "rgba(220,220,220,0.2)",
                     strokeColor: "rgba(220,220,220,1)",
                     pointColor: "rgba(220,220,220,1)",
                     pointStrokeColor: "#fff",
                     pointHighlightFill: "#fff",
                     pointHighlightStroke: "rgba(220,220,220,1)",
                     data: unemployData
             }
             ]}
 });
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Add Drop down values
  selector
    .append("option")
    .text("County_" + "Boone")
    .property("value", "BooneData");

  selector
    .append("option")
    .text("County_" + "Lake")
    .property("value", "LakeData");

  selector
    .append("option")
    .text("County_" + "Warrick")
    .property("value", "WarrickData");
  
  const firstSample = "BooneData";
  buildCharts(firstSample);
  buildWeeklyReport(firstSample);
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample); 
  buildWeeklyReport(newSample);
}

// Initialize the dashboard
init();
