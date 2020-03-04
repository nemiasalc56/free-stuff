import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
// settinng up the token

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: 13.73
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVtaWFzYWxjIiwiYSI6ImNrN2M2NzN0YTAwdW0zZnB0OGN1M2RiaW0ifQ.QalGDzlT9KrXIhoOYr5erg'
    
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      layer: 'circle'
    })
    
    map.on('load', ()=> {
      map.loadImage('https://i.imgur.com/rdJCRXV.png', (error, image)=>{
        if(error) throw error
        map.addImage('marker', image)
        map.addSource('point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [this.state.lng, this.state.lat]
                }
              }
            ]
          }
        })

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
          'icon-image': 'marker',
          'icon-size': 0.08
        }
      })
    })
  })
}

  render() {

    return(
      <div>
        <div style={{
            height: '60vh',
            width: '48vw'
          }} ref={el => this.mapContainer = el} />
      </div>
      )
  }
}




export default MapContainer