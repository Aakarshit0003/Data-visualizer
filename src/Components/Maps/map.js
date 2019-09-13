import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWFrYXJzaGl0IiwiYSI6ImNrMGNzaTRpZDAwbXIzbXA4azk3OTBtbGcifQ.BhMKk3l0yAsXEx5u8zlnRQ';
      export let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10', 
      center: [77.67229, 12.92415], 
      zoom: 12,
      });