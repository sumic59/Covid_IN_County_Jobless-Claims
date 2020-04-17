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
     for (var i = 1; i < 50; i++) {
       yearData.push(data.Date[i]);
       console.log(data.Date[i]);
     }
     var unemployData = [];
     for (var i = 1; i < 50; i++) {
       unemployData.push(data.Claims[i]);
       console.log(data.Claims[i]);
     }
     var covidData = [];
     for (var i = 1; i < 50; i++) {
       covidData.push(data.Count[i]);
       console.log(data.Count[i]);
     }
     var ctx = document.getElementById("claimChart").getContext("2d");
     var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: yearData,
              datasets: [{
                  label: "Covid Cases",
                  type: "line",
                  borderColor: "#8e5ea2",
                  data: covidData,
                  fill: false
                }, {
                  label: "Unemployment Claims",
                  type: "bar",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  data: unemployData,
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
