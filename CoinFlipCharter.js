
/*
Kyra Oberholtzer
Lab 4
 */

var context; // the graphics context of the canvas
var canvas;  // the canvas element

var chart;   // the chartjs object
var chartData;  // data object to be supplied to the chart
var numArray; //array of id numbers

// This function is invoked when the document has finished loading
function init() {
    "use strict";
    chartData = null;
    numArray = new Array();
    canvas = $("#chart1"); // get the DOM canvas element
    context = document.getElementById("chart1").getContext("2d"); // get the context from the canvas
    chart = null; // initialize the chart
    Chart.defaults.global.responsive = true; // make the chart responsive

    // sets up the button handler to call a function that updates the page
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
function createDefaultDisplay(plotData, numberArray) {
    "use strict";

    if (chart !== null) { // if an old chart exists, destroy it before creating a new one
        chart.destroy();
    }

    // Initializes the "data" object used by the Chartjs chart
    var labels = [];
    var data = [];

    // Initializes the inner html of the table to "", and then iterates through the result set, adding
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

    // Iterates through the result set, inserting the appropriate values into the "data" object
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

    // When done iterating, sets the inner html of the table and displays the chart
    canvas.html("");
    canvas.append(chart);
    canvas.update();

}

// This function is called whenever the Apply/Update button is pressed.
// When it is called, it applies the specified filter expression to the result set, and
// redraws the table and chart with the filtered results.
function updateDisplay() {
    "use strict";
    chartData = [];
    var numberArray = [];
    // Re-initializes the "data" object used by the Chartjs chart and repopulates it
    // with only the data that the filter does not remove.
    var option = $("input[name = selector]:checked").val();

    var expression = $("#filter").val().toString().toLowerCase();
    
    // Determines which radio button is currently selected and populates chartData array with filtered results
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
    //re-display the filtered chart
    createDefaultDisplay(chartData, numberArray);
}
