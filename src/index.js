import React, { Component } from "react";
import { render } from "react-dom";

import Map, { setAPIKey } from "./module";

import "./style.css";

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = { apiKey: "" };
  }

  setMarker() {
    const { map } = this;

    if (map) {
      map.setMarker(map.getMapCenter());
    }
  }

  render() {
    const { apiKey } = this.state;

    return (
      <div ref={d => (this.demo = d)} id="demo">
        <Map ref={m => (this.map = m)} id="map" />
        <input
          id="api-key-input"
          value={apiKey}
          onChange={({ target }) => this.setState({ apiKey: target.value })}
        />

        <div className="button" onClick={() => setAPIKey(apiKey)}>
          Set API
        </div>
        <div id="marker" className="button" onClick={() => this.setMarker()}>
          Set Marker
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("root"));
