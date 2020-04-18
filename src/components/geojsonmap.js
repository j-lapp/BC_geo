import React from 'react'
import { Map as 
  LeafletMap, 
  LayersControl,
  LayerGroup,
  GeoJSON, 
  Marker, 
  CircleMarker,
  Polyline, 
  Popup, 
  Tooltip } 
  from 'react-leaflet';
import L from 'leaflet';
import {antPath} from 'leaflet-ant-path';

import bcGeoJSON from '../data/BC.json';
import bcParks from '../data/bcparks.json';
import faults from '../data/faults.json';
import geology from '../data/geology.json';
import BCminfile from '../data/minfile.json'
import rivers from '../data/rivers.json'

class GeoJsonMap extends React.Component {

  giveColor = rock_class => {
    switch (rock_class) {
      case "sedimentary rocks":
        return "#ffd971";
      case "metamorphic rocks":
        return "#cd9bff";
      case "volcanic rocks":
        return "#004226";
      case "volcanic and sedimentary rocks":
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
      weight: '0.05'

    };
  };

  giveColor = minfile_class => {
    switch (minfile_class) {
      case "sedimentary rocks":
        return "#ffd971";
      case "metamorphic rocks":
        return "#cd9bff";
      case "volcanic rocks":
        return "#004226";
      case "volcanic and sedimentary rocks":
        return "#004226";
      case "intrusive rocks":
        return "#ffa3b4";
      default:
        return "#fafafa";
    }
  };

  render() {

    // Change minfile marker to circle  
    const minfilePointToLayer = (feature, latlng) => {
      return L.circleMarker(latlng, null); 
   }

  //  minfile tooltip
  const onEachMinfile = (feature, layer) => {
    const PopupContent = `<b><a href="${feature.properties.URL}" target="_blank" style = "color: #ee5859"><span style="font-size: 11px">${feature.properties.MINFILNO} - ${feature.properties.NAMES}</a></b><br>
    ${feature.properties.COMMODIT_D}<br>${feature.properties.DEPOTYPE_D}</span>`;
    
    layer.bindPopup(PopupContent, {closeButton: false, opacity: '0.5'});

    const TooltipContent = `<b><span style="font-size: 9px; color: #383838; float:left">${feature.properties.COMMODIT_D}</span></b>`;
    
    layer.bindTooltip(TooltipContent);
    
    // minfile mouseover
    layer.on('mouseover', function () {
      this.setStyle({
        'weight': '1',
        'color': '#ee5859',
        'fillColor': '#ee5859'
      });
    });
          layer.on('mouseout', function () {
        this.setStyle({ 
          'color': '#1d1d1d',
          'fillColor': 'white',
          'weight': '0.5'
        });
      });
    };

    // park tooltip
    const onEachPark = (feature, layer) => {
      const TooltipContent = `<b><span style="font-size: 14px; color: #14a05a; float:left">${feature.properties.Pa_name}</span></b><br>
      <span style="font-size: 11px; color: #383838; float:left">Provincial Park</span>`;
      
      
      layer.bindTooltip(TooltipContent, {sticky: true, color: '#8dd587'});
      
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

     // geology tooltip
     const onEachRock = (feature, layer) => {
      const TooltipContent = `<span style="font-size: 11px; float:left"><b>${feature.properties.strat_unit}:</b> ${feature.properties.strat_name}</span>`;
      
      layer.bindTooltip(TooltipContent, {sticky: true, fillColor: 'black'});
      
      // geology mouseover
      layer.on('mouseover', function () {
        this.setStyle({
          'weight': '2',
          'color' : 'white'
        });
      });
      layer.on('mouseout', function () {
        this.setStyle({
          'weight': '0.05',
          'color' : '#3b3b3b'
        });
      });
    };

    return (
      <LeafletMap
      // VIsland
        center={[49.65, -125.3]}
        zoom={8}
      // golden triangle
        // center={[56.8, -130.4]}
        // zoom={8}

        zoomDelta = {0.01}
        zoomSnap = {0.01}
        maxZoom = {13}
        minZoom = {6}
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
            fillColor: "white"
          })}
        />
      <GeoJSON
          data={geology}
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
            fillOpacity: 0.6 
        })}
		/>
    {/* <GeoJSON
          data={rivers}
          style= { () => ({ 
            color: '#2b68a5',
            weight: 0.5,
            opacity: 0.5
        })}
		/> */}
    		<GeoJSON
          data={faults}
          style= { () => ({ 
            color: '#1d1d1d',
            weight: 0.9,
            opacity: 0.9,
            dashArray: [4]
        })}
		/>
        <GeoJSON
          data={BCminfile}
          pointToLayer = {minfilePointToLayer}
          onEachFeature = {onEachMinfile}
          style= { () => ({ 
            color: '#1d1d1d',
            fillColor: 'white',
            radius: 2.4,
            weight: 0.5,
            opacity: 0.5,
            fillOpacity: 1
        })}
		/>
      </LeafletMap>
    );
  }
}

export default GeoJsonMap