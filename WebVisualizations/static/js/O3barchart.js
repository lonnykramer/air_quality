// Define SVG area dimensions
var svgWidth = 15960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("/static/js/o3.csv", function(error, aqData) {

  // Log an error if one exists
  if (error) return console.warn(error);

  // Print the tvData
  console.log(aqData);

  // Cast the hours value to a number for each piece of tvData
  aqData.forEach(function(data) {
    data.value = +data.avgvalue;
  });

  var yScale = d3.scaleLinear()
  .domain([0, d3.max(aqData, d => d.value)])
  .range([chartHeight, 0]);

  var leftAxis = d3.axisLeft(yScale);
  chartGroup.append("g")
  .call(leftAxis);

  var barSpacing = 10; // desired space between each bar
  var scaleY = 2000; // 10x scale on rect height

  // @TODO
  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (aqData.length - 1))) / aqData.length;

  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(aqData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.value * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.value * scaleY);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left + 40)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Sodium Dioxide");

    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
    .attr("class", "axisText")
    .text("Cities");
  });