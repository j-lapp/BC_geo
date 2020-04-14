import React from 'react'
import { Map as LeafletMap, GeoJSON, Marker, Popup, Tooltip } from 'react-leaflet';
import jarod from '../data/j.jpg';
import L from 'leaflet';
import bcGeoJSON from '../data/BC.json';
import bcParks from '../data/BCparks.json';

class GeoJsonMap extends React.Component {
  render() {
    const onEachPark = (feature, layer) => {
      const TooltipContent = `<b><span style="font-size: 16px; color: #14a05a">${feature.properties.Pa_name}</span></b><br>
      <span style="font-size: 13px; color: #383838">Provincial Park</span>`;
      
      layer.bindTooltip(TooltipContent);
      
      layer.on('mouseover', function () {
        this.setStyle({
          'weight': '0.6',
          'color': '#23bb81',
          'fillColor': '#bbfedd'
        });
      });
      
      layer.on('mouseout', function () {
        this.setStyle({
          'fillColor': '#8dd587',
          'color': '#066200',
          'weight': '0.2'
        });
      });
    };

    return (
      <LeafletMap
        center={[49.6, -124.3]}
        zoom={8}
        zoomDelta = {0.01}
        zoomSnap = {0.01}
        maxZoom = {13}
        attributionControl={true}
        zoomControl={false}
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
          onEachFeature = {onEachPark}
          style={() => ({
            color: '#066200',
            weight: 0.2,
            fillColor: "#8dd587",
            fillOpacity: 0.8,
          })} >
		</GeoJSON>
{/* 		<Marker 
            position={[48.37, -123.38]}
            icon={iconPerson}
        >
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker> */}
      </LeafletMap>
    );
  }
}

export default GeoJsonMap