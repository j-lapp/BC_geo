import React from 'react'
import { Map as 
  LeafletMap, 
  LayersControl,
  withLeaflet, 
  MapControl,
  LayerGroup,
  ZoomControl,
  TileLayer,
  GeoJSON } 
  from 'react-leaflet';
import L from 'leaflet';

import Control from 'react-leaflet-control';
import { BoxZoomControl } from 'react-leaflet-box-zoom'

import bcGeoJSON from '../data/BC.json';
import bcParks from '../data/bcparks.json';
import faults from '../data/faults.json';
import geology from '../data/geology.json';
import BCminfile from '../data/minfile.json'
import rivers from '../data/rivers.json'
import auSilts from '../data/au_silts.json'
import claims from '../data/min_claims.json'

import MapInfo from "./MapInfo";

const { BaseLayer, Overlay } = LayersControl

class GeoJsonMap extends React.Component {


// geology layer colour scheme
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

// geology layer style
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

  render() {

    // Change markers to circle  
    const markerToCircle = (feature, latlng) => {
      return L.circleMarker(latlng, null); 
    }

    const siltToCircle = (feature, latlng) => {
      return L.circleMarker(latlng, null); 
    }

// PARKS ////////////////////////////////////////////
    // park tooltip
    const onEachPark = (feature, layer) => {
      const TooltipContent = `<p>${feature.properties.Pa_name}</p><br>
      <span style="font-size: 9px; color: #383838; float:left">Provincial Park</span>`;
      
      
      layer.bindTooltip(TooltipContent, {sticky: true, className: 'parktooltipCSS'});
      
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

    
// GEOLOGY ////////////////////////////////////////////    
     // geology tooltip
     const onEachRock = (feature, layer) => {
      const TooltipContent = `<span style="font-size: 11px; float:left"><b>${feature.properties.strat_unit}:</b> ${feature.properties.strat_name}</span>`;
      
      layer.bindTooltip(TooltipContent, {sticky: true});
      
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

    // CLAIMS ////////////////////////////////////////////
      //  claims tooltip
      const onEachClaim = (feature, layer) => {
        const TooltipContent = `<p>${feature.properties.OWNER_NAME}</p><br>
        <span style="font-size: 9px; float:left">${feature.properties.TNRTPDSCRP} claim</span>`;

        layer.bindTooltip(TooltipContent, {sticky: true, className: 'claimstooltipCSS'});
        
        //claims mouseover
        layer.on('mouseover', function () {
          this.setStyle({
            'weight': '1.3',
            'color' : '#880012',
            'fillColor': '#ffa3af'
          });
        });
        layer.on('mouseout', function () {
          this.setStyle({
            'color': '#ae0011',
            'fillColor' : '#ff6567',
            'weight': '0.08'
          });
        });
    
        };

// MINFILE ////////////////////////////////////////////
      //  minfile tooltip
      const onEachMinfile = (feature, layer) => {
        const PopupContent = `<p><a href="${feature.properties.URL}" target="_blank" style = "color: #d05d00">${feature.properties.MINFILNO} - ${feature.properties.NAMES}</a></p>
        <span style="font-size: 9px">${feature.properties.COMMODIT_D}</span>`;
        
        layer.bindPopup(PopupContent, {closeButton: false, className: 'minfilePopupCSS'});
    
        // const TooltipContent = `<b><span style="font-size: 9px; color: #383838; float:left">${feature.properties.COMMODIT_D}</span></b>`;    
        // layer.bindTooltip(TooltipContent);
        
        //minfile mouseover
        layer.on('mouseover', function () {
          this.setStyle({
            'weight': '4',
            'color' : '#ffab01',
            'fillColor': '#ffab01'
          });
        });
        layer.on('mouseout', function () {
          this.setStyle({
            'weight': '0.6',
            'color': '#d05d00',
            'fillColor': '#ffe8cd'

          });
        });
        };

// SILTS ////////////////////////////////////////////    
     // silts tooltip
     const onEachSilt = (feature, layer) => {
      const TooltipContent = `<span style="font-size: 9px; float:left"><b>${feature.properties.Au_display}</b> ppb Au in silt</span>`;
      
      layer.bindTooltip(TooltipContent, {className: 'siltstooltipCSS'});
    
        };


    return (
<LeafletMap
      // VIsland
        center={[49.65, -125.3]}
        zoom={8}
      // golden triangle
        // center={[56.8, -130.1]}
        // zoom={9.5}
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
        background-color= {'#232323'}
      >
      <LayersControl 
          collapsed = {false}>
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
        <Overlay checked name="Faults">
      <GeoJSON
          data={faults}
          style= { () => ({ 
            color: '#1d1d1d',
            weight: 0.9,
            opacity: 0.9,
            dashArray: [4]
        })}
		  />
        </Overlay>
		<GeoJSON
          data={bcParks}
          onEachFeature = {onEachPark}
          style= { () => ({ 
            color: '#066200',
            fillColor : '#8dd587',
            weight: 0.2,
            fillOpacity: 0.5 
        })}
		/>
        {/* <Overlay checked name="Rivers"> 
    <GeoJSON
          data={rivers}
          style= { () => ({ 
            color: '#2b68a5',
            weight: 0.5,
            opacity: 0.5
        })}
		/>
    </Overlay>    */}
    		<GeoJSON
          data={claims}
          onEachFeature = {onEachClaim}
          style= { () => ({ 
            color: '#ae0011',
          fillColor : '#ff6567',
            weight: 0.08,
            fillOpacity: 0.6 
        })}
		/>
     <Overlay unchecked name="Minfile">
        <GeoJSON
          data={BCminfile}
          pointToLayer = {markerToCircle}
          onEachFeature = {onEachMinfile}
          style= { () => ({ 
            color: '#d05d00',
            fillColor: '#ffe8cd',
            radius: 2.4,
            weight: 0.6,
            opacity: 0.5,
            fillOpacity: 0.9
        })}
		/>
    </Overlay>
     <Overlay unchecked name="Au silts">
        <GeoJSON
          data={auSilts}
          pointToLayer = {siltToCircle}
          onEachFeature = {onEachSilt}
          style= { () => ({ 
            color: '#b2a743',
            fillColor: '#fffa5d',
            radius: 2.8,
            weight: 1,
            opacity: 0.7,
            fillOpacity: 0.9
        })}
		/>
    </Overlay>
    </LayersControl>
    <BoxZoomControl 
            position="topleft"
            sticky={false}
          />
</LeafletMap>
    );
  }
}

export default GeoJsonMap