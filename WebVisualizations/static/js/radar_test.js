console.log("first line")
function buildMetadata(city) {
    console.log("in buildMetadata");
    // @TODO: Complete the following function that builds the metadata panel

    // Use `d3.json` to fetch the metadata for a sample

    d3.json(`/metadata/all/${city}`).then((dataJS) => {


        // Use d3 to select the panel with id of `#sample-metadata`
        var sampleCity = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        sampleNbr.html("");
        console.log(dataJS);
        // Use `Object.entries` to add each key value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(dataJS).forEach(([key, value]) => {
            sampleNbr.append("h6").text(`${key}: ${value}`)
        }
        )

        // BONUS: Build the Gauge Chart
        // buildGauge(data.WFREQ);
    })
}


// *** my attempt at the charts
function buildCharts(city) {

    //   //   // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`/metadata/all/${city}`).then((dataJS2) => {
        console.log("trying to pull info for radar chart");
        console.log(dataJS2);

        var marksCanvas = document.getElementById("marksChart");

        var dataPM10 = []
        var dataPM25 = []
        var dataCO = []
        var dataSO2 = []
        var dataO3 = []
        var dataNO2 = []
        var dataBC = []

        if (airquality_combined.parameter == "pm10") {
            dataPM10 = +airquality_combined.parameter;
        }
        else if (airquality_combined.parameter == "pm25") {
            dataPM25 = +airquality_combined.parameter;
        }
        else if (airquality_combined.parameter == "co") {
            dataCO = +airquality_combined.parameter;
        }
        else if (airquality_combined.parameter == "so2") {
            dataSO2 = +airquality_combined.parameter;
        }
        else if (airquality_combined.parameter == "o3") {
            dataO3 = +airquality_combined.parameter;
        }
        else if (airquality_combined.parameter == "no2") {
            dataNO2 = +airquality_combined.parameter;
        }
        else (airquality_combined.parameter == "bc") {
            dataBC = +airquality_combined.parameter;
        }

        var marksData = {
            labels: ["PM10", "PM25", "CO", "SO2", "O3", "NO2", "BC"],
            datasets: [{
                label: "chicago",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: [dataPM10, dataPM25, dataCO, dataSO2, dataO3, dataSO2, dataBC]
            }]
            // {
            //     label: "Chicago",
            //     backgroundColor: "rgba(0,0,200,0.2)",
            //     data: [54, 65, 60, 70, 70, 75]
            // }, {
            //     label: "St. Louis",
            //     backgroundColor: "yellow",
            //     data: [4, 75, 35, 98, 31, 54]
            // }, {
            //     label: "New York",
            //     backgroundColor: "green",
            //     data: [12, 43, 98, 67, 88, 75]
            // }, {
            //     label: "Miami",
            //     backgroundColor: "pink",
            //     data: [45, 65, 43, 70, 44, 66]
            // },
    ]
    });

    var radarChart = new Chart(marksCanvas, {
        type: 'radar',
        data: marksData
    });

    // **************** commented out from belly button
    //     var traceBubble = {
    //       type: "bubble",
    //       x: dataJS2.otu_ids,
    //       y: dataJS2.sample_values,
    //       mode: "markers",

    //       marker: {
    //         size: dataJS2.sample_values,
    //         color: dataJS2.otu_ids
    //       },
    //       text: dataJS2.otu_labels
    //       // NEED HOVER ADDED TO BUBBLE
    //     }

    //     var layout = {
    //       title: "Gross Belly Buttons",
    //       //showlegend: true,
    //       height: 600,
    //     };

    //     var test_variable = [traceBubble]
    //     // @TODO: Build a Bubble Chart using the sample data
    //     Plotly.newPlot("bubble", test_variable, layout);  // "bubble" references the HTML id location



    //     // @TODO: Build a Pie Chart
    //     // HINT: You will need to use slice() to grab the top 10 sample_values,
    //     // otu_ids, and labels (10 each). - already sorted from app.py @app.route("/samples/<sample>")



    //     var tracePie = {
    //       values: dataJS2.sample_values.slice(0, 10), //1-6
    //       labels: dataJS2.otu_ids.slice(0, 10),
    //       hover: dataJS2.otu_labels.slice(0, 10),
    //       type: "pie"

    //     }

    //     var test_variable2 = [tracePie]
    //     var pieLayout = {
    //       margin: {
    //         t: 0,
    //         l: 0
    //       }
    //     };
    //     console.log(test_variable2);

    //     Plotly.newPlot("pie", test_variable2, pieLayout); // "pie" references the HTML id location
    //     console.log("drew pie");
    //   });
    // }
    // *********************************
});
}


function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/metadata/all").then((airquality_combined) => {
        airquality_combined.forEach((city) => {
            selector
                .append("option")
                .text(city)
                .property("value", city);
        });

        // Use the first sample from the list to build the initial plots
        const firstCity = airquality_combined[4];
        buildCharts(firstCity);
        buildMetadata(firstCity);
    });
}

function optionChanged(newCity) {
    // Fetch new data each time a new sample is selected
    // d3.select("#pie").html("")

    buildCharts(newCity);
    buildMetadata(newCity);
}

// Initialize the dashboard
init();
