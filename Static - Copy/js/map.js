var margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	formatPercent = d3.format(".1%");

var svg = d3.select("#map").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.json, "/static/data/Indiana_weekly_claims.json")
	.defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json")
	.await(ready);

var legendText = ["", "10%", "", "15%", "", "20%", "", "25%"];
var legendColors = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"];


function ready(error, data, us) {

	var counties = topojson.feature(us, us.objects.counties);

	data.forEach(function(d) {
		d.Date = +d.Date;
		d.Fips = +d.Fips;
		d.InitialClaims = +d.InitialClaims;
	});

	var dataByCountyByYear = d3.nest()
		.key(function(d) { return d.Fips; })
		.key(function(d) { return d.Date; })
		.map(data);

  counties.features.forEach(function(county) {
		county.properties.years = dataByCountyByYear[+county.id]
  });

	var color = d3.scale.threshold()
		.domain([10, 12.5, 15, 17.5, 20, 22.5, 25])
		.range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

	var projection = d3.geo.albersUsa()
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);

	var countyShapes = svg.selectAll(".county")
		.data(counties.features)
		.enter()
		.append("path")
		.attr("class", "county")
		.attr("d", path);

		countyShapes
		.on("mouseover", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 1);
			tooltip.html(
				"<p><strong>" + d.properties.dates[20200110][0].county + "</strong></p>" +
				"<table><tbody><tr><td class='wide'>Unemployment Rate in Jan 2020:</td><td>" + d.properties.dates[20200110][0].initialClaims + "</td></tr>" +
				"<tr><td>Unemployment Rate in April 2020:</td><td>" + d.properties.dates[20200410][0].initialClaims + "</td></tr></tbody></table>"
			)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});

	svg.append("path")
		.datum(topojson.feature(us, us.objects.states, function(a, b) { return a !== b; }))
		.attr("class", "states")
		.attr("d", path);

	var legend = svg.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(8))
		.enter()
		.append("g")
		.attr("class", "legenditem")
		.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors[i]; });

	legenditem.append("text")
		.attr("x", width - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText[i]; });

	function update(Date){
			slider.property("value", Date);
			d3.select(".Date").text(Date);
			countyShapes.style("fill", function(d) {
				return color(d.properties.dates[Date][0].initialClaims)
			});
		}

	var slider = d3.select(".slider")
		.append("input")
			.attr("type", "range")
			.attr("min", 20200110)
			.attr("max", 20200410)
			.attr("step", 1)
			.on("input", function() {
				var year = this.value;
				update(Date);
			});

			date(20200110);

}

d3.select(self.frameElement).style("height", "685px");