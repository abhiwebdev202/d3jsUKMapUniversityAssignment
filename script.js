document.addEventListener("DOMContentLoaded", function() {
    const inputValueElement = document.getElementById("inputValue");
    const refreshButton = document.getElementById("refreshButton");
    const zoomInButton = document.getElementById("zoomInButton");
    const zoomOutButton = document.getElementById("zoomOutButton");
    const mapDiv = document.getElementById("map");
    const tooltip = document.getElementById("tooltip");

    let townsLayer;
    let zoom;

    //Map Container Details
    const margin = {top: 5, left:5, right:5, bottom:5}
    const width =700;
    const height= 760;

    // Initialize the map

    const map = d3.select(mapDiv)
        .append('svg')
        .attr('height', height- (margin.bottom) + (margin.top))
        .attr('width', width- (margin.left+ margin.right))
        .style('background-color', '#0B6DA2')
        .append('g');
    // Define the projection and path
        const projection = d3.geoMercator()
        .center([-4, 54])
        .scale(2000)
        .translate([width/ 2, height/ 1.6 ]);

    const path = d3.geoPath().projection(projection);

    //Drawing the Map of UK
    d3.json('https://gist.githubusercontent.com/carmoreira/81c0cba020a53397167732dc1756a23a/raw/e2074a86ed1dc1b655fcdbc4340188d1e6974e5e/ukCountriesLow.json').then(function(data){

    console.log(data)
        


    map.
    selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#BFF3C5')
    .attr('stroke', '#713838')
    //.append('title')
    //.text("United Kingdom");

    // Handle plotting towns and tooltips
    function refreshTowns(numberOfTowns) {
        const townDataUrl = `http://34.38.72.236/Circles/Towns/${numberOfTowns}`;

        d3.json(townDataUrl)
            .then(function(townData) {
                // Remove existing town markers
                if (townsLayer) {townsLayer.remove();}

                // Create a new group for town markers
                townsLayer = map.selectAll("myCircles")
                                    .data(townData)
                                    .enter()
                                    .append("g");

                // Add town markers with tooltips
                townsLayer
                    .append("circle")
                    .attr("cx", function(d) { return projection([d.lng, d.lat])[0]; })
                    .attr("cy", function(d) { return projection([d.lng, d.lat])[1]; })
                    .attr('r', 4)
                    .attr('fill', '#BB0E20')
                    .attr('stroke', 'black')
                    .attr('stroke-width', 1)
                    .attr('fill-opacity', .7)
                    .on("mouseover", function(d) {
                        // Show town details as a tooltip
                        tooltip.style.display = "block";
                        tooltip.style.left = (d3.event.pageX + 10) + "px";
                        tooltip.style.top = (d3.event.pageY - 30) + "px";
                        tooltip.style.opacity = 0.7;
                        tooltip.style.backgroundColor = "black";
                        tooltip.style.color = '#F4F0F0';
                        tooltip.innerHTML = `<strong>${d.Town}</strong><br>
                                            Population: ${d.Population}<br>
                                            County: ${d.County}<br>
                                            lng: ${d.lng}<br>
                                            lat: ${d.lat}`;
                    })
                    .on("mouseout", function() {
                        // Hide the tooltip on mouseout
                        tooltip.style.display = "none";
                    });

                // Implement zoom behavior
                zoom = d3.zoom()
                    .scaleExtent([1, 8])
                    .on("zoom", function() {
                        map.attr("transform", d3.event.transform);
                    });

                map.call(zoom);
            })
            .catch(function(error) {
                console.error("Error loading town data:", error);
            });
    }

    // Handle plot button click
    refreshButton.addEventListener("click", function() {
        const numberOfTowns = inputValueElement.value;
        refreshTowns(numberOfTowns);
    });

    // Handle zoom in button click
    zoomInButton.addEventListener("click", function() {
        zoom.scaleBy(map.transition(), 1.5);
    });

    // Handle zoom out button click
    zoomOutButton.addEventListener("click", function() {
        zoom.scaleBy(map.transition(), 1 / 1.5);
    });
})});
