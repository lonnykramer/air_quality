function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

  d3.json(`/metadata/${sample}`).then((dataJS) => {


    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleNbr = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleNbr.html("");
    console.log(dataJS[0]);
    // Use `Object.entries` to add each key value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    dataJS.forEach(function (item, index) {

      Object.entries(item).forEach(([key, value]) => {
        sampleNbr.append("h6").text(`${key}: ${value}`)
      }
      )
    }
    )
  })
};


// *** my attempt at the charts
function buildCharts(sample) {

  var pollutantData = [0, 0, 0, 0, 0, 0, 0]

  //   //   // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/metadata/${sample}`).then((dataJS2) => {
    console.log("trying to pull info for radar chart");
    // console.log(dataJS2);
    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleNbr = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleNbr.html("");
    console.log(dataJS2[0]);

    dataJS2.forEach(function (item, index) {



      Object.entries(item).forEach(([key, value]) => {
        sampleNbr.append("h6").text(`${key}: ${value}`)

      }
      )

      if (item.parameter == "pm10")
        pollutantData[0] = item.avgvalue;
      if (item.parameter == "pm25")
        pollutantData[1] = item.avgvalue;
      if (item.parameter == "co")
        pollutantData[2] = item.avgvalue;
      if (item.parameter == "so2")
        pollutantData[3] = item.avgvalue;
      if (item.parameter == "o3")
        pollutantData[4] = item.avgvalue;
      if (item.parameter == "no2")
        pollutantData[5] = item.avgvalue;
      if (item.parameter == "bc")
        pollutantData[6] = item.avgvalue;






      console.log(pollutantData)
      var marksCanvas = document.getElementById("marksChart");

      var marksData = {
        labels: ["PM10", "PM25", "CO", "SO2", "O3", "NO2", "BC"],
        datasets: [{
          // label: 
          backgroundColor: "rgba(200,0,0,0.2)",
          data: pollutantData
        },
        ]
      };

      var radarChart = new Chart(marksCanvas, {
        type: 'radar',
        data: marksData
      });



      console.log(marksData);

      // Plotly.newPlot("pie", test_variable2, pieLayout); // "pie" references the HTML id location
      // console.log("drew pie");
    });
  })
};




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // d3.select("#pie").html("")

  buildCharts(newSample);
  buildMetadata(newSample);
}


// Initialize the dashboard
init();

