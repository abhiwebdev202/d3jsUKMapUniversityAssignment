# d3jsUKMapUniversityAssignment

Project in Detail

For this assighnment I have created 3 files. 

index.html for the html elements: which contains the divs, input and button elements to display on the web browser.

style.css, the stylesheet to add style to the html elements.

script.js, the javascript file in which the code is written to plot the UK map using d3.js and javascript.

In the html file along side the div which contains the map, I have added 3 buttons and a stepped input field. The input field takes the value of number of towns from the JSON feed and plots that exact number of towns on the map. It does that each time we press the added button "Refresh Towns" and plots different towns each time. The other two buttons are for zooming in and out function, so we can use zoom on this map. It also contains div element which contain the map title and an aside element inside the map div which contains all the buttons, the input field and a few h tags. The input is a stepped input field so you can type in or use step input arrows to set number of towns to be displayed. The style.css and script.js file are linked to the index.html file.

In the stylesheet some html elements are styled using the element name and few of them are selected through their ids.

In the script javascript file we have d3.js to draw a UK using a geojson file from the link below:

https://gist.githubusercontent.com/carmoreira/81c0cba020a53397167732dc1756a23a/raw/e2074a86ed1dc1b655fcdbc4340188d1e6974e5e/ukCountriesLow.json

and using d3.js circles to plot towns on the map, using the json feed below:

http://34.38.72.236/Circles/Towns/20

I have used the d3.js geoMercator function to create the projection for the map. Apart from the map and the plotting of the town, I have added zoom in and out function to the map using buttons. I have also wrote a function for tooltip, which uses mouse hover to display town details.
