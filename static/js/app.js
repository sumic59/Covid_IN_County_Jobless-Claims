function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("static/data/BooneData.json").then(function(data) {

    // Grab the values from the json data
    var yearData = [];
    for (var i = 0; i < 12; i++) {
      yearData.push(data.periodName[i]);
    }
    var unemployData = [];
    for (var i = 0; i < 12; i++) {
      unemployData.push(sampleNames.Unemployed[i]);
    }
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: yearData,
      y: unemployData,
      type: 'bar'
      // mode: 'markers',
      // marker: {
      //   size: sample_values,
      //   color: otu_ids
      // },
      // text: otu_labels
    };
    
    var data1 = [trace1];

    var layout = {
      showlegend: false
    };

    Plotly.newPlot('bubble', data1, layout);

    // // @TODO: Build a Pie Chart
    // // HINT: You will need to use slice() to grab the top 10 sample_values,
    // // otu_ids, and labels (10 each).

    // var sample_data = otu_ids.map( (x, i) => {
    //   return {"otu_ids": x, "otu_labels": otu_labels[i], "sample_values": sample_values[i]}        
    // });

    // sample_data = sample_data.sort(function(a, b) {
    //   return b.sample_values - a.sample_values;
    // });

    // sample_data = sample_data.slice(0, 10);

    // var trace2 = {
    //   labels: sample_data.map(row => row.otu_ids),
    //   values: sample_data.map(row => row.sample_values),
    //   hovertext: sample_data.map(row => row.otu_labels),
    //   type: 'bar'
    // };

    // var data2 = [trace2];

    // Plotly.newPlot("pie", data2);

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
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
  selector
    .append("option")
    .text("County_" + "Warrick1")
    .property("value", "WarrickData1");  
  const firstSample = "BooneData";
  buildCharts(firstSample);
  //    buildMetadata(firstSample);
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample); 
}

// Initialize the dashboard
init();
