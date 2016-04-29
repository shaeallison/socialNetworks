      (function(d3) {
        'use strict';
        var dataset = [
          { Site: 'Facebook', data: 72 },
          { Site: 'Twitter', data: 23 },
          { Site: 'Pinterest', data: 31 },
          { Site: 'Instagram', data: 28 },
          { Site: 'LinkedIn', data: 25 }
        ];
        var width = 460;
        var height = 460;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;                
        var legendSpacing = 4;  
        var color = d3.scale.ordinal()
            .range(["#2AB69D", "#343844", "#E65848", "#FDAF24", "#FCF2E3"]);
        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)       
          .outerRadius(radius);
          
        var pie = d3.layout.pie()
          .value(function(d) { return d.data; })
          .sort(null);
          
          var tooltip1 = d3.select('#chart')                  
          .append('div')                                         
          .attr('class', 'tooltip1');                             
                      
        tooltip1.append('div')                                 
          .attr('class', 'Site');                               
             
        tooltip1.append('div')                         
          .attr('class', 'data');                         
        tooltip1.append('div')                               
          .attr('class', 'percent');
          
          d3.csv('/js/popular_sites.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.data = +d.data;
          });

          
        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.Site);
          });
          
          
          path.on('mouseover', function(d) {                 
            var total = d3.sum(dataset.map(function(d) {         
              return d.data;                                   
            }));                                            
            tooltip1.select('.Site').html(d.data.Site);                
            tooltip1.select('.data').html(d.data.data + '%');          
            //tooltip1.select('.percent').html(percent + '%');      
            tooltip1.style('display', 'block');                  
          });                                                   
          
          path.on('mouseout', function() {             
            tooltip1.style('display', 'none');                    
          });

          path.on('mousemove', function(d) {                       
            tooltip1.style('top', (d3.event.layerY + 10) + 'px')  
              .style('left', (d3.event.layerX + 10) + 'px');          
          });                                                       
          
          
        var legend = svg.selectAll('.legend')              
          .data(color.domain())                          
          .enter()                                              
          .append('g')                              
          .attr('class', 'legend')                             
          .attr('transform', function(d, i) {                 
            var height = legendRectSize + legendSpacing;         
            var offset =  height * color.domain().length / 2;     
            var horz = -2 * legendRectSize;                      
            var vert = i * height - offset;                      
            return 'translate(' + horz + ',' + vert + ')';       
          });                                            
        legend.append('rect')                                   
          .attr('width', legendRectSize)                       
          .attr('height', legendRectSize)   
          .style('fill', color)             
          .style('stroke', color);                
          
        legend.append('text')                        
          .attr('x', legendRectSize + legendSpacing)        
          .attr('y', legendRectSize - legendSpacing)    
          .text(function(d) { return d; });
          
          });
          
      })(window.d3);


