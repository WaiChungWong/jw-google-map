"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAPIKey = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
/* global google */

var googleAPIScript = void 0;
var apiKey = "";
var mapAPIInitiated = false;
var mapAPILoaded = false;
var mapLoadListeners = [];

window.onGoogleAPILoaded = function () {
  mapLoadListeners.map(function (event) {
    return event();
  });
  mapAPILoaded = true;
};

var checkGoogleMapAPI = function checkGoogleMapAPI(callback) {
  if (apiKey) {
    if (!mapAPIInitiated) {
      mapAPIInitiated = true;

      googleAPIScript = document.createElement("script");
      googleAPIScript.type = "text/javascript";
      googleAPIScript.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=onGoogleAPILoaded";
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

var GoogleMap = function (_Component) {
  _inherits(GoogleMap, _Component);

  function GoogleMap(props) {
    _classCallCheck(this, GoogleMap);

    var _this = _possibleConstructorReturn(this, (GoogleMap.__proto__ || Object.getPrototypeOf(GoogleMap)).call(this, props));

    _this.state = { loading: false, noAPIKey: !apiKey };

    checkGoogleMapAPI(function () {
      return _this._loadMap();
    });
    return _this;
  }

  _createClass(GoogleMap, [{
    key: "_loadMap",
    value: function _loadMap() {
      var _this2 = this;

      var _props = this.props,
          center = _props.center,
          zoom = _props.zoom;
      var Map = google.maps.Map;


      this.map = new Map(this.mapWrapper, { center: center, zoom: zoom });

      this.map.addListener("idle", function () {
        return _this2.setState({ loading: false, noAPIKey: false });
      });
    }
  }, {
    key: "getMapCenter",
    value: function getMapCenter() {
      if (mapAPILoaded) {
        var center = this.map.center;


        return { lat: center.lat(), lng: center.lng() };
      }

      return null;
    }
  }, {
    key: "setMarker",
    value: function setMarker(position) {
      if (mapAPILoaded) {
        var Marker = google.maps.Marker;


        new Marker({ map: this.map, position: position });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          className = _props2.className,
          center = _props2.center,
          zoom = _props2.zoom,
          rest = _objectWithoutProperties(_props2, ["className", "center", "zoom"]);

      var _state = this.state,
          loading = _state.loading,
          noAPIKey = _state.noAPIKey;


      return _react2.default.createElement("div", _extends({
        ref: function ref(w) {
          return _this3.mapWrapper = w;
        },
        className: (0, _classnames2.default)(className, { loading: loading, noAPIKey: noAPIKey })
      }, rest));
    }
  }]);

  return GoogleMap;
}(_react.Component);

GoogleMap.propTypes = {
  className: _propTypes2.default.string,
  center: _propTypes2.default.shape({ lat: _propTypes2.default.number, lng: _propTypes2.default.number }),
  zoom: _propTypes2.default.number
};

GoogleMap.defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 0
};

var setAPIKey = exports.setAPIKey = function setAPIKey(api) {
  apiKey = api;
  mapAPIInitiated = false;
  mapAPILoaded = false;

  if (googleAPIScript) {
    googleAPIScript.remove();
  }

  checkGoogleMapAPI();
};

exports.default = GoogleMap;