// @TODO: YOUR CODE HERE!
//set svg and chart dimensions
//set svg dimensions
var svgWidth = 960;
var svgHeight = 620;

//set borders in svg
var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

//calculate chart height and width
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

//append a div classed chart to the scatter element
var chart = d3.select("#scatter").append("div").classed("chart", true);

//append an svg element to the chart with appropriate height and width
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//append an svg group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//initial Parameters
var chosenXAxis = "Location";
var chosenYAxis = "Value";

//function used for updating x-scale var upon clicking on axis label
function xScale(projectData, chosenXAxis) {
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(projectData, d => d[chosenXAxis]) * 0.8,
            d3.max(projectData, d => d[chosenXAxis]) * 1.2])
        .range([0, width]);

    return xLinearScale;
}

//function used for updating y-scale var upon clicking on axis label
function yScale(projectData, chosenYAxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(projectData, d => d[chosenYAxis]) * 0.8,
            d3.max(projectData, d => d[chosenYAxis]) * 1.2])
        .range([height, 0]);

    return yLinearScale;
}

//function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

//function used for updating xAxis var upon click on axis label
function renderAxesX(newXBCScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXBCScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

//function used for updating xAxis var upon click on axis label
function renderAxesX(newXNO2Scale, xAxis) {
    var bottomAxis = d3.axisBottom(newXNO2Scale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}
//function used for updating xAxis var upon click on axis label
function renderAxesX(newXCOScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXCOScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}
//function used for updating xAxis var upon click on axis label
function renderAxesX(newXO3Scale, xAxis) {
    var bottomAxis = d3.axisBottom(newXO3Scale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}
//function used for updating xAxis var upon click on axis label
function renderAxesX(newXPM2Scale, xAxis) {
    var bottomAxis = d3.axisBottom(newXPM2Scale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}
//function used for updating xAxis var upon click on axis label
function renderAxesX(newXPM10Scale, xAxis) {
    var bottomAxis = d3.axisBottom(newXPM10Scale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}
//function used for updating yAxis var upon click on axis label
function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

//function used for updating circles group with a transition to new circles
//for change in x axis or y axis
function renderCircles(circlesGroup, newXScale, newXBCScale, newXNO2Scale, newXCOScale, newXO3Scale, newXPM2Scale,
    newXPM10Scale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", data => newXScale(data[chosenXAxis]))
        .attr("cy", data => newYScale(data[chosenYAxis]))
        // new pollutant transitions for x axis
        .attr("dx", data => newXBCScale(data[chosenXAxis]))
        .attr("ex", data => newXNO2Scale(data[chosenXAxis]))
        .attr("fx"), data => newXCOScale(data[chosenXAxis])
        .attr("gx"), data => newXO3Scale(data[chosenXAxis])
        .attr("hx"), data => newXPM2Scale(data[chosenXAxis])
        .attr("ix"), data => newXPM10Scale(data[chosenXAxis]);

    return circlesGroup;
}

//function used for updating state labels with a transition to new 

//  ??
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));

    return textGroup;
}
//function to stylize x-axis values for tooltips
function styleX(avgvalue, chosenXAxis) {

    //stylize based on variable chosen
    //poverty percentage
    if (chosenXAxis === 'bc') {
        return `${avgvalue}`;
    }
    if (chosenXAxis === 'co') {
        return `${avgvalue}`;
    }
    if (chosenXAxis === 'no2') {
        return `${avgvalue}`;
    }
    if (chosenXAxis === 'o3') {
        return `${avgvalue}`;
    }
    if (chosenXAxis === 'pm10') {
        return `${avgvalue}`;
    }
    if (chosenXAxis === 'pm25') {
        return `${avgvalue}`;
    }
    //household income in dollars
    else if (chosenXAxis === 'so2') {
        return `${avgvalue}`;
    }
    //age (number)
    // *************************************else {
    //     return `${avgvalue}`;
    // }
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    //select x label
    //poverty percentage
    if (chosenXAxis === 'bc') {
        var xLabel = "Black Carbon:";
    }
    if (chosenXAxis === 'co') {
        var xLabel = "Carbon Monoxide:";
    }
    if (chosenXAxis === 'no2') {
        var xLabel = "Nitrogen Dioxide:";
    }
    if (chosenXAxis === 'o3') {
        var xLabel = "Ozone:";
    }
    if (chosenXAxis === 'pm10') {
        var xLabel = "PM 10:";
    }
    else if (chosenXAxis === 'pm25') {
        var xLabel = "PM 2.5:";
    }
    //age (number)
    //************************* */ else {
    //     var xLabel = "Age:";
    // }

    //select y label
    //percentage lacking healthcare
    if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    //percentage obese
    else if (chosenYAxis === 'avgvalue') {
        var yLabel = "PPM:"
    }
    //smoking percentage
    // ************************************** else {
    //     var yLabel = "Smokers:"
    // }

    //create tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            return (`${d.location}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}`);
        });

    circlesGroup.call(toolTip);

    //add events
    circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);

    return circlesGroup;
}

//retrieve csv data and execute everything below

// Do i reference the sqlite data? ****************************************

d3.csv("combinedaq.csv").then(function(data1) {
    console.log(data1);
  });

d3.csv("../combinedaq.csv").then(function(data2) {
    console.log(data2);
  });


d3.csv("/combinedaq.csv").then(function(projectData) {

    console.log(projectData);

    //parse data
    projectData.forEach(function(data) {

        // DATA
        // **********************


        data.location = +data.combined_US.location;
        data.parameter = +data.combined_US.parameter;
        data.city = +data.combined_US.city;
        data.coordinates_latitude = +data.combined_US.coordinates_latitude;
        data.coordinates_longitude = +data.combined_US.coordinates_longitude;
        data.avgvalue = +data.combined_US.avgvalue;
    });

    //create first linear scales
    var xLinearScale = xScale(projectData, chosenXAxis);
    var yLinearScale = yScale(projectData, chosenYAxis);

    //create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    //append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    //append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(projectData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("dx", data => newXBCScale(data[chosenXAxis]))
        .attr("ex", data => newXNO2Scale(data[chosenXAxis]))
        .attr("fx", data => newXCOScale(data[chosenXAxis]))
        .attr("r", 12)
        .attr("opacity", ".5");

    //append initial text
    var textGroup = chartGroup.selectAll(".stateText")
        .data(projectData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d){return d.abbr});

    //create group for 3 x-axis labels
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);

    var bcLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 20)
        .attr("avgvalue", "bc")
        .text("Black Carbon");

    var ageLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age")
        .text("Age (Median)")

    var incomeLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income")
        .text("Household Income (Median)")

    //create group for 3 y-axis labels
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${0 - margin.left/4}, ${(height/2)})`);

    var healthcareLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 0 - 20)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "healthcare")
        .text("Lacks Healthcare (%)");

    var smokesLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 40)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "smokes")
        .text("Smokes (%)");

    var obesityLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 60)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "obesity")
        .text("Obese (%)");

    //updateToolTip function with data
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    //x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function() {
            //get value of selection
            var value = d3.select(this).attr("value");

            //check if value is same as current axis
            if (value != chosenXAxis) {

                //replace chosenXAxis with value
                chosenXAxis = value;

                //update x scale for new data
                xLinearScale = xScale(projectData, chosenXAxis);

                //update x axis with transition
                xAxis = renderAxesX(xLinearScale, xAxis);

                //update circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

                //update text with new x values
                textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

                //update tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

                //change classes to change bold text
                if (chosenXAxis === "poverty") {
                    povertyLabel.classed("active", true).classed("inactive", false);
                    ageLabel.classed("active", false).classed("inactive", true);
                    incomeLabel.classed("active", false).classed("inactive", true);
                }
                else if (chosenXAxis === "age") {
                    povertyLabel.classed("active", false).classed("inactive", true);
                    ageLabel.classed("active", true).classed("inactive", false);
                    incomeLabel.classed("active", false).classed("inactive", true);
                }
                else {
                    povertyLabel.classed("active", false).classed("inactive", true);
                    ageLabel.classed("active", false).classed("inactive", true);
                    incomeLabel.classed("active", true).classed("inactive", false);
                }
            }
        });

    //y axis labels event listener
    yLabelsGroup.selectAll("text")
    .on("click", function() {
        //get value of selection
        var value = d3.select(this).attr("value");

        //check if value is same as current axis
        if (value != chosenYAxis) {

            //replace chosenYAxis with value
            chosenYAxis = value;

            //update y scale for new data
            yLinearScale = yScale(projectData, chosenYAxis);

            //update x axis with transition
            yAxis = renderAxesY(yLinearScale, yAxis);

            //update circles with new y values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

            //update text with new y values
            textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)

            //update tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

            //change classes to change bold text
            if (chosenYAxis === "obesity") {
                obesityLabel.classed("active", true).classed("inactive", false);
                smokesLabel.classed("active", false).classed("inactive", true);
                healthcareLabel.classed("active", false).classed("inactive", true);
            }
            else if (chosenYAxis === "smokes") {
                obesityLabel.classed("active", false).classed("inactive", true);
                smokesLabel.classed("active", true).classed("inactive", false);
                healthcareLabel.classed("active", false).classed("inactive", true);
            }
            else {
                obesityLabel.classed("active", false).classed("inactive", true);
                smokesLabel.classed("active", false).classed("inactive", true);
                healthcareLabel.classed("active", true).classed("inactive", false);
            }
        }
    });
    


    
});



