# jw-google-map

A react component for google map.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/jw-google-map.svg
[npm-url]: http://npmjs.org/package/jw-google-map
[travis-image]: https://img.shields.io/travis/WaiChungWong/jw-google-map.svg
[travis-url]: https://travis-ci.org/WaiChungWong/jw-google-map
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/jw-google-map.svg
[download-url]: https://npmjs.org/package/jw-google-map

[Demo](http://waichungwong.github.io/jw-google-map/build)

## Install

[![NPM](https://nodei.co/npm/jw-google-map.png)](https://nodei.co/npm/jw-google-map)

## Static Methods

| Method      | Parameters     | Description                                                   |
| ----------- | -------------- | ------------------------------------------------------------- |
| `setAPIKey` | `api`: string. | set the API key for google map and reload the Map API script. |

## Methods

| Method         | Parameters                                                          | Description                                              |
| -------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| `getMapCenter` |                                                                     | retrieve the lat and long of the center of the map view. |
| `setMarker`    | `position`: object consist of<br/>{ `lat`: number, `lng`: number }. | set a marker on a given position of map.                 |

## Props

| Prop               | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `center`(optional) | the initial center of the map. Default: `{ lat: 0, lng: 0 }` |
| `zoom`(optional)   | the initial zoom of the map. Default: `0`                    |

## Usage

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Map, { setAPIKey } from "jw-google-map";

import "./style.css";

class Demo extends Component {
  conponentDidMount() {
    setAPIKey(`<API KEY HERE>`);

    const { map } = this;

    const position = map.getMapCenter();

    map.setMarker(position);
  }

  render() {
    return <Map ref={m => (this.map = m)} />;
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"));
```
