import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
// setting up my toke
mapboxgl.accessToken = 'pk.eyJ1IjoibmVtaWFzYWxjIiwiYSI6ImNrN2M2NzN0YTAwdW0zZnB0OGN1M2RiaW0ifQ.QalGDzlT9KrXIhoOYr5erg'


class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: 41.884762,
      lng: -87.637339,
      zoom: 13.73
    }
  }

  componentDidMount() {
    
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      layer: 'circle'
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