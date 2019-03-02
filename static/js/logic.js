function buildMetadata(channel_id) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
  row = d3.select("#sample-metadata")
  row.html("")
  
  //console.log(sample)
  // Use `d3.json` to fetch the metadata for a sample
  console.log(`/channel/${channel_id}`);

  d3.json(`/channel/${channel_id}`).then(metaData => {
    
    console.log(metaData);

    row = d3.select("#channel-metadata")  
    row.html("")
    row.append("h4").text(`Name:  ${metaData["Name"]}`)
      .append("h4").text(`Type:  ${metaData["Channel Type"]}`)
      .append("h4").text(`Date Published:  ${metaData["Published Date"]}`)
      .append("h4").text(`Country:  ${metaData["Country"]}`)
      .append("h4").text(`Video Count:  ${metaData["Video Count"]}`)
      .append("h4").text(`View Count:  ${metaData["View Count"]}`)
      .append("h4").text(`Subscriber Count:  ${metaData["Subscriber Count"]}`)
      .append("h4").text(`Daily Average Earning:  ${metaData["Daily Average Earning"]}`)

    
    // insert banner image
    img_div = d3.select("#banner-image")
    img_div.html("")
    img_div.append("img")
          .attr("class", "banner-image")
          .attr("src", metaData["Banner Image"]);

    // insert channel description
    desc_div = d3.select("#channel-description")
    desc_div.html("")
    desc_div.append("h3").text(metaData["Channel Description"]);
    
    // BONUS: Build the Gauge Chart
    //buildGauge(metaData.Earning_Mid);
    
  });  
}






function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/data").then((Data) => {
      console.log(Data);
      Data.Name.forEach((channelName) => {
        selector
          .append("option")
          .text(channelName)
          .property("value", channelName);
      });

      // Use the first channel from the list to build the initial plots
      const firstChannel = Data.Name[0];
      console.log(firstChannel);
      // Get channel id corresponding to channel
      d3.json("/channel").then((channels) => {
        
        console.log(channels);
        console.log(firstChannel);
        
        var channel_id = channels[firstChannel]
        console.log(channel_id);
        //buildCharts(firstChannel);
        buildMetadata(channel_id);
      })
    
    });
  }
  

  function buildGauge(level) {

    d3.json("/data").then((Data) => {
      var earning = Data["Daily Average Earning Mid"];
    
      var max = Math.max(null, earning)/1000;
      var min = Math.min(null, earning)/1000;

      console.log(max);
      console.log(min);

      var increment = (max-min)/5;

      console.log(increment)
      var labels = [];

      for(var i=0; i<=4; i++){

        labels.push((max-i*increment).toString());
      }

      labels.push(min.toString());
      console.log(labels);

      // Enter a number between 0 and 10
      // Trig to calc meter point
      var degrees = 180 - level*(180/5),
          radius = .5;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);
    
      // Path: may have to change to create a better triangle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
          pathX = String(x),
          space = ' ',
          pathY = String(y),
          pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
      var data = [{ type: 'scatter',
        x: [0], y:[0],
          marker: {size: 10, color:'850000'},
          showlegend: false,
          name: 'frequency',
          text: level,
          hoverinfo: 'text+name'},
        { values: [50/5, 50/5, 50/5, 50/5, 50/5, 50],
        rotation: 90,
        text: labels,
      
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgb(38, 115, 38)', 'rgb(51, 153, 51)', 'rgb(57, 172, 57)', 'rgb(64, 191, 64)', 'rgb(83, 198, 83)',
                        'rgb(102, 204, 102)', 'rgb(121, 210, 121)', 'rgb(140, 217, 140)', 'rgb(179, 230, 179)', 'rgb(236, 249, 236)','rgb(255, 255, 255)']},
        labels: labels,
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }];
    
      var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
        height: 200,
        width: 200,
        margin: {
          l: 2,
          r: 0,
          b: 0,
          t: 70,
          pad: 4
        },
        xaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]}
    };
    
      Plotly.newPlot('gauge', data, layout);
    
    });
}
  




  function optionChanged(newChannel) {
    // Fetch new data each time a new sample is selected
    // buildCharts(newChannel);

    d3.json("/channel").then((channels) => {
        
      console.log(channels);
      console.log(newChannel);
      
      var channel_id = channels[newChannel]
      console.log(channel_id);
      //buildCharts(firstChannel);
      buildMetadata(channel_id);
    })

  }
  
  // Initialize the dashboard
  init();
  