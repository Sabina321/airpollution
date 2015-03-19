/*--------------------------------------------------------------------------------------------
    defining the margin
--------------------------------------------------------------------------------------------*/

//Taken from previous assignments
var margin = {top: 20, right: 20, bottom: 20, left: 20};
  width = 1000 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Taken from: http://shancarter.github.io/ucb-dataviz-fall-2013/classes/interactive-maps/
var projection = d3.geo.albers()

.translate([width/1.75, height / 2])
.parallels([60, 50])
.rotate([120, 0])
.scale(3500);


//var p=d3.scale.category10();

//var color2 = d3.scale.ordinal()
  //  .domain([1,2,3,4,5])
//    .range(p.range());

//var color = d3.scale.linear()
//    .domain([1, 2, 3])
//    .range(["red", "white", "green"]);

// coloring the map
// resource: Overstack: Question on Colorbrewer
var color2 = d3.scale.quantize()
    .domain([0,75.75,151.5])
    .range(colorbrewer.Reds[3]);
var path = d3.geo.path().projection(projection);

var county_ozone; 

function health(){
    d3.json("county_health_data.json", function(err, co){
    
    var ozone = [];     
    console.log(co);  
    function getCountyPopulation(d){
        return (co[d]['Population']);    
    } 
     d3.json("ca-counties.json", function(err, ca) {
    
    var counties = topojson.feature(ca, ca.objects.counties);

    
    console.log(counties.features[0].properties.name);
  
   //Taken from: http://shancarter.github.io/ucb-dataviz-fall-2013/classes/interactive-maps/
    svg.selectAll(".county")
        .data(counties.features)
        .enter().append("path")
        .attr("class", "county-border")
        .attr("d", path)
      
        //http://jsfiddle.net/sam0kqvx/24/ and  http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips
        .on("mouseover", function(d) {
        current_position = d3.mouse(this)
        //Update the tooltip position and value
        d3.select("#tooltip")
       .style("left", current_position[0] + "px")
        .style("top", current_position[1] +"px")
        .html("AQI: " + Math.round(getCountyPopulation(d.properties.name)))
        .select("#value");
        //Show the tooltip
        d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
        //Hide the tooltip
        d3.select("#tooltip").classed("hidden", true);
        })
       .transition()
        .delay(50)
        .duration(500)
        .style("fill", function(d) { return color2(getCountyPopulation(d.properties.name)); })
        })     
        
        
        
    });
};
    

/*--------------------------------------------------------------------------------------------
    importing the data for ozone levels
--------------------------------------------------------------------------------------------*/
function map(year){
    var id = "California_2011_Ozone.json";
    var start = "California_";
    
    var end = "_Ozone.json";
    
    var file = start.concat(year);
    file = file.concat(end);
    id = file; 
    /*if(year=="2011"){
       id = file; 
        console.log("if worked");
    }
    else if(year=="2012"){
           id = "California_2012_Ozone.json";  
        console.log("2012 clicked");          
  
    }*/
    d3.json(id, function(err, co){
    
    var ozone = [];     
    console.log(co);  
    function getCountyOzone(d){
        return co[d];    
    }
 

/*--------------------------------------------------------------------------------------------
    importing the data
--------------------------------------------------------------------------------------------*/
//Taken from http://bl.ocks.org/mbostock/5562380
    d3.json("ca-counties.json", function(err, ca) {
    
    var counties = topojson.feature(ca, ca.objects.counties);

    
    console.log(counties.features[0].properties.name);
  
   //Taken from: http://shancarter.github.io/ucb-dataviz-fall-2013/classes/interactive-maps/
    svg.selectAll(".county")
        .data(counties.features)
        .enter().append("path")
        .attr("class", "county-border")
        .attr("d", path)
      
        //http://jsfiddle.net/sam0kqvx/24/ and  http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips
        .on("mouseover", function(d) {
        current_position = d3.mouse(this)
        //Update the tooltip position and value
        d3.select("#tooltip")
       .style("left", current_position[0] + "px")
        .style("top", current_position[1] +"px")
        .html("AQI: " + Math.round(getCountyOzone(d.properties.name)))
        .select("#value");
        //Show the tooltip
        d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
        //Hide the tooltip
        d3.select("#tooltip").classed("hidden", true);
        })
       .transition()
        .delay(50)
        .duration(500)
        .style("fill", function(d) { return color2(getCountyOzone(d.properties.name)); })
        })   
    
         })
   };
        
       /*  var texts = svg.selectAll("text")
               .data(counties.features)
               .enter();
    */
    //displaying the text
    /*texts.append("text")
        .text(function(d){
            return d.properties.name;
        });*/
function init(){
   /***************************************************************************************************
    Code for legend
    Got the code from homework 3 and modify it
****************************************************************************************************/
/* ----------------------------------------------------------------------------
draw legend colored rectangles and the circles inside
-----------------------------------------------------------------------------*/ 
    
    
    svg.append("rect")
        .attr("x", width-300)
        .attr("y", height-600)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-275)
        .attr("cy", height-575)
       // .style("fill", "green");
        .style("fill", "white");
    
    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-275)
        .attr("cy", height-540)
     //   .style("fill", "yellow");
        .style("fill", "#fee0d2");
    
    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-275)
        .attr("cy", height-505)
      //  .style("fill", "orange");
        .style("fill", "#fc9272");

    svg.append("circle")
        .attr("r", 13)
        .attr("cx", width-275)
        .attr("cy", height-470)
    //    .style("fill", "red");
        .style("fill", "#de2d26");


    
/* ----------------------------------------------------------------------------
creating the text in the legend
-----------------------------------------------------------------------------*/ 
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -250)
        .attr("y", height-573)
        .style("text-anchor", "start")
        .text("Data not available");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -250)
        .attr("y", height-538)
        .style("text-anchor", "start")
        .text("Moderate (51-100)");
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", width -250)
        .attr("y", height-503)
        .style("text-anchor", "start")
        .text("Unhealthy (101-200)");
    

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -250)
        .attr("y", height-468)
        .style("text-anchor", "start")
        .text("Hazardous (200-300)");
        
    
/* ----------------------------------------------------------------------------
labelling the legend
-----------------------------------------------------------------------------*/  
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", width -200)
        .attr("y", height-425)
        .style("text-anchor", "middle")
        .style("fill", "purple") 
        .attr("font-size", "20px")
        .text("Safety Level in AQI");     

          svg.append("text")
        .attr("class", "label")
        .attr("x", width -300)
        .attr("y", height-400)
        .style("text-anchor", "start")
        .style("fill", "purple") 
        .attr("font-size", "16px")
        .text("* AQI = Air Quality Index");
    
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", width -300)
        .attr("y", height-380)
        .style("text-anchor", "start")
        .style("fill", "purple") 
        .attr("font-size", "16px")
        .text("Measure of pollution");  
        
        
     
   map("2011");
         d3.select("#b1")
        .on("click", function(d,i) {
        console.log("b1");
            map("2000");
        });
    d3.select("#b2")
        .on("click", function(d,i) {
        console.log("b2");
            map("2001");
        });  
    
     d3.select("#b3")
        .on("click", function(d,i) {
        console.log("b3");
            map("2002");
        });
        d3.select("#b4")
        .on("click", function(d,i) {
        console.log("b4");
            map("2003");
        });
         d3.select("#b5")
        .on("click", function(d,i) {
        console.log("b5");
            map("2004");
        });
     d3.select("#b6")
        .on("click",  function(d,i) {
        console.log("b6");
            map("2005");
        });
    d3.select("#b7")
        .on("click", function(d,i) {
        console.log("b7");
            map("2006");
        });  
    
     d3.select("#b8")
        .on("click", function(d,i) {
        console.log("b8");
            map("2007");
        });
        d3.select("#b9")
        .on("click", function(d,i) {
        console.log("b9");
            map("2008");
        });
         d3.select("#b9")
        .on("click", function(d,i) {
        console.log("b9");
            map("2009");
        });
     d3.select("#b10")
        .on("click", function(d,i) {
        console.log("b10");
            map("2010");
        });
    d3.select("#b11")
        .on("click", function(d,i) {
        console.log("b11");
            map("2011");
        });  
    
     d3.select("#b12")
        .on("click", function(d,i) {
        console.log("b12");
            map("2012");
        });
        d3.select("#b13")
        .on("click", function(d,i) {
        console.log("b13");
            map("2013");
        });
         d3.select("#b14")
        .on("click", function(d,i) {
        console.log("b14");
            map("2014");
        });
     //for State of the Air from American Lung Association
    d3.select("#b16")
        .on("click", function(d,i) {
        console.log("b16");
        health();
        });
}




//svg.selectAll(".county")
//.data(counties.)
    




//function(){
 //return()   
    
//}

