import React from 'react'
import { Map as 
  LeafletMap, 
  LayersControl,
  LayerGroup,
  GeoJSON, 
  Marker, 
  Polyline, 
  Popup, 
  Tooltip } 
  from 'react-leaflet';
import L from 'leaflet';
import bcGeoJSON from '../data/BC.json';
import bcParks from '../data/BCparks.json';
import bcMajorFaults from '../data/major_faults.json';
import southVIgeology from '../data/vigeo.json';

class GeoJsonMap extends React.Component {

  giveColor = rock_class => {
    switch (rock_class) {
      case "sedimentary rocks":
        return "#ffd971";
      case "metamorphic rocks":
        return "#cd9bff";
      case "volcanic rocks":
        return "#004226";
      case "intrusive rocks":
        return "#ffa3b4";
      default:
        return "#fafafa";
    }
  };

  geologystyle = feature => {
    const {
      properties: { rock_class }
    } = feature;
    return {
      fillColor: this.giveColor(rock_class),
      color: '#3b3b3b',
      weight: '0.1'

    };
  };

  render() {
    // park tooltip
    const onEachPark = (feature, layer) => {
      const TooltipContent = `<b><span style="font-size: 16px; color: #14a05a; float:left">${feature.properties.Pa_name}</span></b><br>
      <span style="font-size: 13px; color: #383838; float:left">Provincial Park</span>`;
      
      layer.bindTooltip(TooltipContent);
      
      // park mouseover
      layer.on('mouseover', function () {
        this.setStyle({
          'weight': '1',
          'color': '#23bb81',
          'fillColor': '#bbfedd'
        });
      });
      layer.on('mouseout', function () {
        this.setStyle({
          'fillColor': '#8dd587',
          'color': '#066200',
          'weight': '0.3'
        });
      });
    };

     // rock tooltip
     const onEachRock = (feature, layer) => {
      const TooltipContent = `<span style="font-size: 11px; float:left">${feature.properties.strat_unit}: ${feature.properties.strat_name}</span>`;
      
      layer.bindTooltip(TooltipContent);
      
      // rock mouseover
      layer.on('mouseover', function () {
        this.setStyle({
          'weight': '2',
          'color' : 'white'
        });
      });
      layer.on('mouseout', function () {
        this.setStyle({
          'weight': '0.1',
          'color' : '#3b3b3b'
        });
      });
    };

    return (
      <LeafletMap
        center={[48.69, -123.8]}
        zoom={9.5}
        zoomDelta = {0.01}
        zoomSnap = {0.01}
        maxZoom = {13}
        attributionControl={true}
        zoomControl={false}
        doubleClickZoom={false}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
      <GeoJSON
          data={bcGeoJSON}
          style={() => ({
            color: '#232323',
            weight: 0.6,
            fillColor: "#d7d7d7"
          })}
        />
      <GeoJSON
          data={southVIgeology}
          onEachFeature = {onEachRock}
          style={this.geologystyle} 
          />
		<GeoJSON
          data={bcParks}
          onEachFeature = {onEachPark}
          style= { () => ({ 
            color: '#066200',
            fillColor : '#8dd587',
            weight: 0.2,
            fillOpacity: 0.65
        })}
		/>
    		
            
		{/* <Marker 
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