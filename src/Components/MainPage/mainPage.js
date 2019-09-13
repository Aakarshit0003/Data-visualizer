import React, { Component } from 'react'
import '../../css/style.css'
import { map } from '../Maps/map'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import Papa from 'papaparse'
import Highcharts from 'highcharts'


export default class MainPage extends Component {

    fileInput = e => {
        let barGraphData = {};
        let dayObj = {};
        let geoJson = {
          "type": "FeatureCollection",
          "features": []
        };
        const file = e.target.files[0];
            Papa.parse(file, 
                {
                    download: true,
                    worker: true,
                    header: true,
                    step: function (row) {
                      if (row.data.from_date !== undefined) {
                        var parts =(row.data.from_date).split('/');
                        parts.map((days) => {
                          let day = new Date(parts).toDateString().slice(0,4);
                          console.log(day);
                          if (day in dayObj) {
                            dayObj[day] += 1;
                          } else {
                            dayObj[day] = 1;
                          }
                        })
                        // console.log(new Date(parts[0]).toDateString().slice(0,4));
                      }
                      // console.log(typeof row.data.from_date, row.data.from_date);
                        // let user_id = parseInt(row.data.user_id);
                        // if(Number.isNaN(user_id) === false) {
                        //     if(user_id in  barGraphData) {
                        //         barGraphData[user_id] = barGraphData[user_id] + 1;
                        //     } else {
                        //         barGraphData[user_id] = 1;
                        //     }
                        // }
                        // let vehicle_model_id = parseInt(row.data.vehicle_model_id);
                        // if(Number.isNaN(vehicle_model_id) === false) {
                        //   if (vehicle_model_id in barGraphData) {
                        //     barGraphData[vehicle_model_id] += 1
                        //   } else {
                        //     barGraphData[vehicle_model_id] = 1;
                        //   }
                        // }
                        Highcharts.chart("graph1", {
                          chart: {
                            type: "column"
                          },
                          title: {
                            text: "Most bookings on week days"
                          },
                          subtitle: {
                            text: ""
                          },
                          xAxis: {
                            categories: Object.keys(dayObj),
                            crosshair: true,
                            title: {
                              text: "Days"
                            }
                          },
                          yAxis: {
                            min: 0,
                            title: {
                              text: "No of times booked"
                            }
                          },
                          tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat:
                              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: "</table>",
                            shared: true,
                            useHTML: true
                          },
                          plotOptions: {
                            column: {
                              pointPadding: 0.2,
                              borderWidth: 0
                            }
                          },
                          series: [
                            {
                              names: "Days",
                              data: Object.values(dayObj)
                            }
                          ]
                        });  
                        let from_lat = parseFloat(row.data.from_lat);
                        let from_long = parseFloat(row.data.from_long);
                        let to_lat = parseFloat(row.data.to_lat);
                        let to_long = parseFloat(row.data.to_long);
                        if ( (!(Number.isNaN(from_lat))) && (!(Number.isNaN(from_long)))  ) {
                        new mapboxgl.Marker()
                        .setLngLat([from_long,from_lat])
                        .addTo(map);
                        if ( (!(Number.isNaN(to_lat))) && (!(Number.isNaN(to_long)))  ) {
                          new mapboxgl.Marker()
                          .setLngLat([to_long,to_lat])
                          .addTo(map);
                        }
                        // let newObj = {};
                        // newObj.type = 'Feature'
                        // newObj.geometry = {
                        //   type: 'Point',
                        //   coordinates: [from_long, from_lat]
                        // }
                        // newObj.properties = {
                          
                        // }
                        // geoJson.features.push(newObj);
                        }
                        // console.log(Object.keys(barGraphData));
                    },
                });
                console.log(geoJson);
                console.log('hello')
                console.log(map.getStyle().layers)
                map.addSource('from_points', {
                  "type": "geojson",
                  "data": geoJson
                })
                map.addLayer({
                  "id": "random",
                  "type": "circle",
                  "source": 'from_points',
                  "paint": {
                    'circle-radius': 10,
                    'circle-color': '#ff5500',
                  }
                })
                console.log(map.getStyle().layers)
                map.on('load', function() {
                  console.log('hello')
                map.addLayer({
                  "id": "random",
                  "type": "circle",
                  "source": {
                    "type": "geojson",
                    "data": geoJson
                  },
                  "paint": {
                    // 'circle-radius': {
                    //   'base': 1.75,
                    //   'stops': [[12,2], [22,180]]
                    // },
                    'circle-color': 'red',
                    'fill-color': '#ff5500'
                  }
                })
              })
                // console.log(Object.keys(barGraphData));
                // console.log(barGraphData);
    }
    render() {
        return (
            <div className="mt-5 ml-5 ">
                <h2 className="head">Choose a CSV file</h2>
                    <input type = "file" className="fileType" onChange = {e => this.fileInput(e)}/>
            </div>
        )
    }
}
