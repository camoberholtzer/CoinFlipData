// Note: This application may be implemented either with global functions or with an OO-based method approach.
// You may choose either approach.

/*
Kyra Oberholtzer
Lab 4
 */

var context; // the graphics context of the canvas; similar to a swing ContentPane
var canvas;  // the canvas element; similar to a java swing JFrame

var chart;   // the chartjs object (assuming you're using chartjs)
var chartData;  // data object to be supplied to the chart (if using chartjs)
var numArray; //array of id numbers

// Note: You may add additional global variables if needed, but be sure to document them.

// This function is invoked when the document has finished loading (it should be invoked on the body load event).

function init() {
    "use strict";
    chartData = null;
    numArray = new Array();
    canvas = $("#chart1"); // get the DOM canvas element
    context = document.getElementById("chart1").getContext("2d"); // get the context from the canvas
    chart = null; // initialize the chart
    Chart.defaults.global.responsive = true; // make the chart responsive

    // setup the button handler to call a function that updates the page
    $(document).ready(function () {
        $("#update").click(function () {
            updateDisplay();
        })
    });

    //creates array with id numbers
    for(var i = 0; i < results.length; i++){
        numArray[i] = i+1;
    }

    // call the below function that creates the "default" page that displays the full table and chart for the entire result set
    createDefaultDisplay(results, numArray);

}


// This function creates the "default" page.
// plotData is the data to populate the chart and table
// numberArray is the array of id numbers
// Note: You may add parameters to this function if needed, but be sure to document them.
function createDefaultDisplay(plotData, numberArray) {
    "use strict";

    // Note: The Chartjs chart object supposedly supports an update() method, but I've found that it
    // doesn't seem to work as documented. This hack is another way of rebuilding the chart whenever
    // it needs to be re-created.
    if (chart !== null) { // if an old chart exists, destroy it before creating a new one
        chart.destroy();
    }

    // Initialize the "data" object used by the Chartjs chart
    var labels = [];
    var data = [];

    // Initialize the inner html of the table to "", and then iterate through the result set, adding
    // table rows and table data
    $("#table1").html("");
    var html = "";
    for (var x = 0; x < plotData.length; x++) {
        labels[x] = numberArray[x].toString();
        data[x] = plotData[x].time;
        html += "<tr>";
        for (var y = 0; y < 5; y++) {
            html += '<td>';
            if(y === 0){
                html += numberArray[x].toString();
            }else if(y === 1){
                html += plotData[x].name;
            }else if(y === 2){
                html += plotData[x].time;
            }else if(y === 3){
                html += plotData[x].ip;
            }else if(y === 4){
                html += plotData[x].sessionid;
            }
            html += '</td>';
        }
        html += "</tr>";
    }
    $("#table1").html(html);

    // As you iterate through the result set, insert the appropriate values into the "data" object
    // that will be used by the Chartjs object.
    plotData = {
        labels: labels,
        datasets: [{
            fillColor: "red",
            strokeColor: "black",
            data: data
        }]
    };
    chart = new Chart(context).Bar(plotData);

    // When done iterating, set the inner html of the table

    // Also display the chart.

    canvas.html("");
    canvas.append(chart);
    canvas.update();

}

// This function is called whenever the Apply/Update button is pressed.
// When it is called, it applies the specified filter expression to the result set, and
// redraws the table and chart with only the filtered results.
// Note: You may add parameters to this function if needed, but be sure to document them.
function updateDisplay() {
    "use strict";
    chartData = [];
    var numberArray = [];
    // Re-initialize the "data" object used by the Chartjs chart. You're going to repopulate it
    // with only the data that the filter does not remove.
    var option = $("input[name = selector]:checked").val();

    var expression = $("#filter").val().toString().toLowerCase();

    //populates chartData array with filtered results
    for(var i = 0; i < results.length; i++){
        if(option === "Name"){
            if(results[i].name.toLowerCase().includes(expression)) {
                chartData.push(results[i]);
                numberArray.push(numArray[i]);
            }
        }else if(option === "Time"){
            if(results[i].time.toLowerCase().includes(expression)) {
                chartData.push(results[i]);
                numberArray.push(numArray[i]);
            }
        }else if(option === "IP"){
            if(results[i].ip.toLowerCase().includes(expression)) {
                chartData.push(results[i]);
                numberArray.push(numArray[i]);
            }
        }else if(option === "Session"){
            if(results[i].sessionid.toLowerCase().includes(expression)) {
                chartData.push(results[i]);
                numberArray.push(numArray[i]);
            }
        }
    }
    createDefaultDisplay(chartData, numberArray);

    // Determine which radio button is currently selected.
    // Retrieve the filter expression. You'll use this to determine what rows of the result set to show and hide.
    // Refer to the documentation on JavaScript String object's methods to figure out how to use the filter
    // expression to exclude results that don't match the filter expression.

    // When done iterating, set the inner html of the table and re-display a filtered chart.
    // Note that you're not actually removing data from the result set - you're only showing the filtered
    // subset. Thus, the indices of the subset should match those of the original data set.
}

// Note: You may add more functions if you want to, but be sure to fully document them.