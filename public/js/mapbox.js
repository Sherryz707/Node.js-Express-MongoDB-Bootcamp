/* eslint-disable*/



export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic3VyaWF4eHgiLCJhIjoiY2xrYmxrbTNiMDd0eDNlcGZ3dTZyZnRmbyJ9.SdYKHQR8VtSQH93xyJmO2Q';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/suriaxxx/clkblr9pr000201pg33em3gn9',
    scrollZoom: false
    // center:[],
    // zoom:10,
    // interactive:false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // create marker
    const el = document.createElement('div');
    // adding css styles from jonas
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
