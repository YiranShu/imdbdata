function get_order_list(data) {
    order = [];

    for(i = 0; i < data.length; i++) {
        data_copy = data[i].slice();
        data_copy.sort(function(a, b) {return a - b;});
        data_copy.reverse();
        var temp = [];
        for(j = 0; j < data[i].length; j++) {
            temp.push(data_copy.indexOf(data[i][j]) + 1);
        }
        order.push(temp);
    }

    return order;
}

var w = 600;
var h = 300;

var svg = d3.select("#plot")
  .append("svg")
    .attr("width", w)
    .attr("height", h);

var data = [[0.020, 0.111, 0.026, 0.473, 0.054, 0.005], 
            [0.022, 0.091, 0.026, 0.305, 0.056, 0.004], 
            [0.044, 0.116, 0.049, 0.443, 0.091, 0.007], 
            [0.029, 0.185, 0.077, 0.435, 0.116, 0.007], 
            [0.049, 0.233, 0.066, 0.410, 0.125, 0.010], 
            [0.042, 0.269, 0.037, 0.386, 0.122, 0.018],
            [0.048, 0.199, 0.047, 0.431, 0.112, 0.020], 
            [0.046, 0.212, 0.057, 0.444, 0.102, 0.020], 
            [0.059, 0.208, 0.044, 0.450, 0.118, 0.026], 
            [0.093, 0.212, 0.057, 0.429, 0.108, 0.032], 
            [0.108, 0.174, 0.056, 0.389, 0.103, 0.036], 
            [0.101, 0.171, 0.075, 0.368, 0.082, 0.039], 
            [0.101, 0.173, 0.090, 0.355, 0.069, 0.037], 
            [0.101, 0.166, 0.095, 0.364, 0.069, 0.039], 
            [0.123, 0.168, 0.090, 0.361, 0.071, 0.050], 
            [0.135, 0.171, 0.118, 0.341, 0.078, 0.064], 
            [0.110, 0.186, 0.167, 0.346, 0.094, 0.067], 
            [0.094, 0.195, 0.241, 0.359, 0.100, 0.069], 
            [0.068, 0.182, 0.315, 0.350, 0.075, 0.063], 
            [0.0711, 0.181, 0.351, 0.363, 0.0706, 0.077], 
            [0.073, 0.165, 0.318, 0.338, 0.063, 0.079]];

var years = ["1915-1920", "1920-1925", "1925-1930", "1930-1935", "1935-1940", "1940-1945", "1945-1950", "1950-1955", 
             "1955-1960", "1960-1965", "1965-1970", "1970-1975", "1975-1980", "1980-1985", "1985-1990", "1990-1995", 
             "1995-2000", "2000-2005", "2005-2010", "2010-2015", "2015-2020"]

var order = get_order_list(data);
var names = ["Action", "Comedy", "Documentary", "Drama", "Romance", "Thriller"];
var colors = ["darkolivegreen", "darkgoldenrod", "lightsalmon", "mediumpurple", "lightpink", "lightskyblue"];
// var titles = ["1915-1920", ]

var width_multiplier = w;
var y_multiplier = 25;
var x_pos = 100;
var height = 20;
var font_size = "14px";
var prefix = "Proportion of Different Genres During ";

var xScale = d3.scaleLinear()
                .domain([0, 0.6])
                .range([0, w * 0.6])


var xAxis = d3.axisBottom().scale(xScale);

svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate (${x_pos}, ${(names.length + 1) * y_multiplier})`)
    .call(xAxis);

svg.append("text")         
    .attr("id", "years")
    .style("fill", "black")   
    .style("font-size", font_size)
    .attr("x", w / 2)          
    .attr("y", y_multiplier / 2)           
    .attr("text-anchor", "middle") 
    .text(prefix + years[0]);

for (let j = 0; j < names.length; j++) {
    svg.append("rect")
        .attr("id", names[j])
        .attr("width", data[0][j] * width_multiplier)
        .attr("height", height)
        .attr("x", x_pos)
        .attr("y", order[0][j] * y_multiplier)
        .attr("fill", colors[j]);

    svg.append("text")         
        .attr("id", names[j] + "_font")
        .style("fill", colors[j])   
        .style("font-size", font_size)
        .attr("x", 50)          
        .attr("y", order[0][j] * y_multiplier + y_multiplier - 0.5 * height)           
        .attr("text-anchor", "middle") 
        .text(names[j]);
}

var dur = 1500;

for (let j = 0; j < names.length; j++) {
    svg.select("#" + names[j])
        .transition()
        .duration(dur)
        .attr('width', data[1][j] * width_multiplier)
        .attr('y', order[1][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[2][j] * width_multiplier)
        .attr('y', order[2][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[3][j] * width_multiplier)
        .attr('y', order[3][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[4][j] * width_multiplier)
        .attr('y', order[4][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[5][j] * width_multiplier)
        .attr('y', order[5][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[6][j] * width_multiplier)
        .attr('y', order[6][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[7][j] * width_multiplier)
        .attr('y', order[7][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[8][j] * width_multiplier)
        .attr('y', order[8][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[9][j] * width_multiplier)
        .attr('y', order[9][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[10][j] * width_multiplier)
        .attr('y', order[10][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[11][j] * width_multiplier)
        .attr('y', order[11][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[12][j] * width_multiplier)
        .attr('y', order[12][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[13][j] * width_multiplier)
        .attr('y', order[13][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[14][j] * width_multiplier)
        .attr('y', order[14][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[15][j] * width_multiplier)
        .attr('y', order[15][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[16][j] * width_multiplier)
        .attr('y', order[16][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[17][j] * width_multiplier)
        .attr('y', order[17][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[18][j] * width_multiplier)
        .attr('y', order[18][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[19][j] * width_multiplier)
        .attr('y', order[19][j] * y_multiplier)
        .transition()
        .duration(dur)
        .attr('width', data[20][j] * width_multiplier)
        .attr('y', order[20][j] * y_multiplier)

    svg.select("#" + names[j] + "_font")
        .transition()
        .duration(dur)
        .attr("y", order[1][j] * y_multiplier + y_multiplier - 0.5 * height) 
        .transition()
        .duration(dur)
        .attr("y", order[2][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[3][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[4][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[5][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[6][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[7][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[8][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[9][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[10][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[11][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[12][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[13][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[14][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[15][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[16][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[17][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[18][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[19][j] * y_multiplier + y_multiplier - 0.5 * height)
        .transition()
        .duration(dur)
        .attr("y", order[20][j] * y_multiplier + y_multiplier - 0.5 * height) 

    svg.select("#years")
        .transition()
        .duration(dur)
        .text(prefix + years[1])
        .transition()
        .duration(dur)
        .text(prefix + years[2])
        .transition()
        .duration(dur)
        .text(prefix + years[3])
        .transition()
        .duration(dur)
        .text(prefix + years[4])
        .transition()
        .duration(dur)
        .text(prefix + years[5])
        .transition()
        .duration(dur)
        .text(prefix + years[6])
        .transition()
        .duration(dur)
        .text(prefix + years[7])
        .transition()
        .duration(dur)
        .text(prefix + years[8])
        .transition()
        .duration(dur)
        .text(prefix + years[9])
        .transition()
        .duration(dur)
        .text(prefix + years[10])
        .transition()
        .duration(dur)
        .text(prefix + years[11])
        .transition()
        .duration(dur)
        .text(prefix + years[12])
        .transition()
        .duration(dur)
        .text(prefix + years[13])
        .transition()
        .duration(dur)
        .text(prefix + years[14])
        .transition()
        .duration(dur)
        .text(prefix + years[15])
        .transition()
        .duration(dur)
        .text(prefix + years[16])
        .transition()
        .duration(dur)
        .text(prefix + years[17])
        .transition()
        .duration(dur)
        .text(prefix + years[18])
        .transition()
        .duration(dur)
        .text(prefix + years[19])
        .transition()
        .duration(dur)
        .text(prefix + years[20])
}
