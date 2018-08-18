/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
/* global google */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

let googleAPIScript;
let apiKey = "";
let mapAPIInitiated = false;
let mapAPILoaded = false;
let mapLoadListeners = [];

window.onGoogleAPILoaded = () => {
  mapLoadListeners.map(event => event());
  mapAPILoaded = true;
};

const checkGoogleMapAPI = callback => {
  if (apiKey) {
    if (!mapAPIInitiated) {
      mapAPIInitiated = true;

      googleAPIScript = document.createElement("script");
      googleAPIScript.type = "text/javascript";
      googleAPIScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=onGoogleAPILoaded`;
      googleAPIScript.async = true;
      googleAPIScript.defer = true;

      document.body.appendChild(googleAPIScript);
    }

    if (callback) {
      if (!mapAPILoaded) {
        mapLoadListeners.push(callback);
      } else {
        callback();
      }
    }
  } else if (callback) {
    mapLoadListeners.push(callback);
  }
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, noAPIKey: !apiKey };

    checkGoogleMapAPI(() => this._loadMap());
  }

  _loadMap() {
    const { center, zoom } = this.props;
    const { Map } = google.maps;

    this.map = new Map(this.mapWrapper, { center, zoom });

    this.map.addListener("idle", () =>
      this.setState({ loading: false, noAPIKey: false })
    );
  }

  getMapCenter() {
    if (mapAPILoaded) {
      const { center } = this.map;

      return { lat: center.lat(), lng: center.lng() };
    }

    return null;
  }

  setMarker(position) {
    if (mapAPILoaded) {
      const { Marker } = google.maps;

      new Marker({ map: this.map, position });
    }
  }

  render() {
    const { className, center, zoom, ...rest } = this.props;
    const { loading, noAPIKey } = this.state;

    return (
      <div
        ref={w => (this.mapWrapper = w)}
        className={ClassNames(className, { loading, noAPIKey })}
        {...rest}
      />
    );
  }
}

GoogleMap.propTypes = {
  center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  zoom: PropTypes.number
};

GoogleMap.defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 0
};

export const setAPIKey = api => {
  apiKey = api;
  mapAPIInitiated = false;
  mapAPILoaded = false;

  if (googleAPIScript) {
    googleAPIScript.remove();
  }

  checkGoogleMapAPI();
};

export default GoogleMap;
