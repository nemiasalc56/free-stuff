import React, { Component } from 'react'



class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: '',
      lng: '',
      zoom: ''
    }
  }

  render() {

    return(
      <div>
        <h2>MapContainer</h2>
      </div>
      )
  }
}




export default MapContainer