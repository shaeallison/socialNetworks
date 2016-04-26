
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#2AB69D", "#343844", "#E65848", "#FDAF24", "#FCF2E3"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/js/share_of_users.csv", function(error, data) {
  if (error) throw error;

  var networkNames = d3.keys(data[0]).filter(function(key) { return key !== "Year"; });

  data.forEach(function(d) {
    d.networks = networkNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.Year; }));
  x1.domain(networkNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.networks, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    //.append("text")
      //.attr("transform", "rotate(-90)")
      //.attr("y", 6)
      //.attr("dy", ".71em")
      //.style("text-anchor", "end")
      //.text("Users");

  var year = svg.selectAll(".year")
      .data(data)
    .enter().append("g")
      .attr("class", "year")
      .attr("transform", function(d) { return "translate(" + x0(d.Year) + ",0)"; });

  year.selectAll("rect")
      .data(function(d) { return d.networks; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); })
      .on('mouseover', function(d) {
                d3.select('.tooltip')
                    .html(d.name + "<br />" +  d.value + " Million"  )
                    .style('opacity', 1);
            })
            .on('mouseout', function(d) {
                d3.select('.tooltip')
                    .style('opacity', 0);
            })
            .on('mousemove', function(d) {
                console.log(d3.event);
                d3.select('.tooltip')
                  .style('top', (d3.event.layerY + 10) + 'px')  
                  .style('left', (d3.event.layerX + 10) + 'px'); 
      });

  var legend = svg.selectAll(".legend")
      .data(networkNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
      


});