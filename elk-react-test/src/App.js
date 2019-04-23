import React from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import uuid from 'uuid';
import $ from 'jquery';
class KibanaIframe extends React.Component {
  state = {
    loaded: false,
    iframeId: uuid(),
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      const iframeBody = $(
        _.get(window, `${this.state.iframeId}.document.body`),
      );
      const isKibanaLoading =
        iframeBody.find('#kbn_loading_message').length > 0;

      if (!isKibanaLoading) {
        const filterBar = iframeBody.find('filter-bar');
        const isFoundFilterBar = filterBar.length > 0;
        const mapBottomText = iframeBody.find(
          'div.leaflet-control-attribution',
        );
        const isFoundMapBottomText = mapBottomText.length > 0;
        if (isFoundFilterBar || isFoundMapBottomText) {
          isFoundFilterBar && filterBar.remove();
          isFoundMapBottomText && mapBottomText.remove();
          this.setState({ loaded: true });
          clearInterval(this.interval);
        }
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <div
          onClick={() => {
            // const iframe1 = $(window.ifr.document.body);
            // console.log('iframe1', iframe1.remove());
            // const iframe2 = $(window.ifr2.document.body);
            // console.log('iframe2', iframe2.find('filter-bar').remove());
            // console.log('#iframe2', iframe2.contents());
          }}
        >
          onClick
        </div>
        {!this.state.loaded && 'Loading.....'}
        <iframe
          style={{ visibility: this.state.loaded ? 'visible' : 'hidden' }}
          name={this.state.iframeId}
          id={this.state.iframeId}
          src={this.props.url}
          height="600"
          width="800"
        />
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <KibanaIframe
        url={`http://localhost/kibana/app/kibana#/visualize/edit/79e8ff60-4c8e-11e8-b3d7-01146121b73d?embed=true&_g=(refreshInterval:(pause:!f,value:900000),time:(from:now-24h,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(autoPrecision:!t,field:DestLocation,isFilteredByCollar:!t,mapCenter:!(0,0),mapZoom:2,precision:2,useGeocentroid:!t),schema:segment,type:geohash_grid)),params:(addTooltip:!t,colorSchema:'Yellow+to+Red',heatClusterSize:1.5,isDesaturated:!t,legendPosition:bottomright,mapCenter:!(0,0),mapType:'Scaled+Circle+Markers',mapZoom:2,wms:(baseLayersAreLoaded:(),enabled:!f,options:(format:image%2Fpng,transparent:!t),selectedTmsLayer:(attribution:'%3Cp%3E%26%23169;+%3Ca+href%3D%22http:%2F%2Fwww.openstreetmap.org%2Fcopyright%22%3EOpenStreetMap%3C%2Fa%3E+contributors+%7C+%3Ca+href%3D%22https:%2F%2Fwww.elastic.co%2Felastic-maps-service%22%3EElastic+Maps+Service%3C%2Fa%3E%3C%2Fp%3E%26%2310;',id:road_map,maxZoom:18,minZoom:0,subdomains:!(),url:'https:%2F%2Ftiles.maps.elastic.co%2Fv2%2Fdefault%2F%7Bz%7D%2F%7Bx%7D%2F%7By%7D.png%3Felastic_tile_service_tos%3Dagree%26my_app_name%3Dkibana%26my_app_version%3D6.3.0%26license%3D686f9ec6-d775-44f0-b334-38caf85da617'),tmsLayers:!((attribution:'%3Cp%3E%26%23169;+%3Ca+href%3D%22http:%2F%2Fwww.openstreetmap.org%2Fcopyright%22%3EOpenStreetMap%3C%2Fa%3E+contributors+%7C+%3Ca+href%3D%22https:%2F%2Fwww.elastic.co%2Felastic-maps-service%22%3EElastic+Maps+Service%3C%2Fa%3E%3C%2Fp%3E%26%2310;',id:road_map,maxZoom:18,minZoom:0,subdomains:!(),url:'https:%2F%2Ftiles.maps.elastic.co%2Fv2%2Fdefault%2F%7Bz%7D%2F%7Bx%7D%2F%7By%7D.png%3Felastic_tile_service_tos%3Dagree%26my_app_name%3Dkibana%26my_app_version%3D6.3.0%26license%3D686f9ec6-d775-44f0-b334-38caf85da617')))),title:'%5BFlights%5D+Destination+Airport',type:tile_map))`}
      />
    </div>
  );
}

export default App;
