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

var svg = d3.select("#thesvg")


var data = [[0.212 ,1.179 ,0.592 ,0.275 ,5.027 ,0.052 ,0.57 ,0.023 ,0.054 ], 
[0.246 ,1.022 ,0.403 ,0.294 ,3.437 ,0.057 ,0.628 ,0.017 ,0.044 ], 
[0.459 ,1.211 ,0.312 ,0.508 ,4.629 ,0.036 ,0.947 ,0.013 ,0.077 ], 
[0.292 ,1.853 ,0.613 ,0.772 ,4.368 ,0.066 ,1.161 ,0.027 ,0.074 ], 
[0.489 ,2.368 ,0.818 ,0.671 ,4.157 ,0.073 ,1.262 ,0.039 ,0.099 ], 
[0.299 ,1.954 ,0.452 ,0.27 ,2.79 ,0.086 ,0.873 ,0.029 ,0.131 ], 
[0.352 ,1.465 ,0.672 ,0.343 ,3.166 ,0.072 ,0.816 ,0.021 ,0.146 ], 
[0.461 ,2.135 ,0.824 ,0.576 ,4.455 ,0.082 ,1.019 ,0.083 ,0.2 ], 
[0.719 ,2.53 ,1.037 ,0.541 ,5.483 ,0.248 ,1.435 ,0.172 ,0.308 ], 
[1.267 ,2.888 ,1.235 ,0.775 ,5.849 ,0.307 ,1.476 ,0.136 ,0.44 ], 
[1.85 ,2.986 ,1.519 ,0.966 ,6.681 ,0.345 ,1.776 ,0.216 ,0.613 ], 
[2.005 ,3.382 ,1.638 ,1.493 ,7.292 ,0.726 ,1.634 ,0.195 ,0.783 ], 
[1.996 ,3.429 ,1.344 ,1.775 ,7.022 ,0.574 ,1.366 ,0.236 ,0.729 ], 
[2.096 ,3.424 ,1.133 ,1.976 ,7.521 ,0.699 ,1.419 ,0.319 ,0.796 ], 
[2.738 ,3.742 ,1.45 ,2.002 ,8.051 ,0.978 ,1.581 ,0.416 ,1.117 ], 
[2.953 ,3.733 ,1.594 ,2.577 ,7.445 ,0.806 ,1.709 ,0.34 ,1.403 ], 
[2.502 ,4.254 ,1.486 ,3.826 ,7.912 ,0.814 ,2.141 ,0.458 ,1.535 ], 
[2.677 ,5.573 ,1.742 ,6.911 ,10.272 ,1.256 ,2.871 ,0.447 ,1.967 ], 
[3.07 ,8.289 ,2.216 ,14.337 ,15.915 ,2.711 ,3.42 ,0.709 ,2.868 ], 
[5.018 ,12.762 ,3.343 ,24.78 ,25.537 ,4.937 ,4.975 ,1.542 ,5.394 ], 
[6.421 ,14.478 ,4.167 ,27.922 ,29.684 ,6.457 ,5.561 ,1.935 ,6.953 ]];


var xdata = [5.027 ,3.437 ,4.629 ,4.368 ,4.157 ,2.79 ,3.166 ,4.455 ,5.483 ,5.849 ,6.681 ,7.292 ,7.022 ,7.521 ,8.051 ,7.445 ,7.912 ,10.272 ,15.915 ,25.537 ,29.684 ];

var years = ["1915-1920", "1920-1925", "1925-1930", "1930-1935", "1935-1940", "1940-1945", "1945-1950", "1950-1955", 
             "1955-1960", "1960-1965", "1965-1970", "1970-1975", "1975-1980", "1980-1985", "1985-1990", "1990-1995", 
             "1995-2000", "2000-2005", "2005-2010", "2010-2015", "2015-2020"]

var order = get_order_list(data);
var names = ["Action", "Comedy", "Crime","Documentary", "Drama", "Horror","Romance","Sci-Fi", "Thriller"];
var colors = ["darkolivegreen", "darkgoldenrod", "lightsalmon", "mediumpurple", "lightpink", "lightskyblue","indianred", "lightseagreen", "purple"];
// var titles = ["1915-1920", ]

var width_multiplier = w;
var y_multiplier = 25;
var x_pos = 100;
var height = 20;
var font_size = "14px";
var prefix = "Number(in thousand) of Different Genres During ";


var xmax=0.6

var xScale = d3.scaleLinear()
                .domain([0, xdata[0]])
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
        .attr('width',  xScale(data[0][j]) )
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


var i=0;

animate2();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function update(i){
    xScale.domain([0, xdata[i]]);
    for (let j = 0; j < names.length; j++) {
        svg.select("#" + names[j])
            .transition()
            .duration(dur)
            .attr('width',  xScale(data[i][j]) )
            .attr('y', order[i][j] * y_multiplier);
        svg.select("#" + names[j] + "_font")
            .transition()
            .duration(dur)
            .attr("y", order[i][j] * y_multiplier + y_multiplier - 0.5 * height);
    }
    svg.select("#years")
        .transition()
        .duration(dur)
        .text(prefix + years[i]);
    
    

    svg.select(".xAxis")
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(xAxis);


}

function step(){
    if (i==20){
        i=0;
    }
    update(i);
    i = i+1;
}


async function animate2() {
    d3.select("#svgtypo").attr("fill", "white");
    for (let k = 1; k <= 20; k++) {
        update(k);
        await sleep(1500);
    }
    d3.select("#svgtypo").attr("fill", "red");
}



