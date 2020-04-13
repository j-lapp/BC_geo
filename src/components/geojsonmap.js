import React from 'react'
import { Map as LeafletMap, GeoJSON, Marker, Popup } from 'react-leaflet';
import jarod from '../data/j.jpg';
import L from 'leaflet';
import bcGeoJSON from '../data/BC.json';
import bcParks from '../data/BCparks.json';

class GeoJsonMap extends React.Component {
  render() {
	 const iconPerson = new L.Icon({
        iconUrl: jarod,
        // iconRetinaUrl: require('../img/marker-pin-person.svg'),
        // iconAnchor: null,
        // popupAnchor: null,
        // shadowUrl: null,
        // shadowSize: null,
        // shadowAnchor: null,
        iconSize: new L.Point(50, 50),
        className: 'leaflet-div-icon'
    });
    return (
      <LeafletMap
        center={[49.5, -124]}
        zoom={8}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <GeoJSON
          data={bcGeoJSON}
          style={() => ({
            color: '#232323',
            weight: 0.3,
            fillColor: "#d7d7d7",
            fillOpacity: 1,
          })}
        />
		<GeoJSON
          data={bcParks}
          style={() => ({
            color: '#066200',
            weight: 0.2,
            fillColor: "#8dd587",
            fillOpacity: 0.8,
          })}
		  
        />
        <Marker position={[48.37, -123.38]}
		>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default GeoJsonMap