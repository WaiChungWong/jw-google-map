(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(17)},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a,r=n(1),o=n(2),i=n(4),c=n(3),s=n(5),u=n(0),l=n.n(u),p=n(7),m=n(9),d=n(8),f=n.n(d),v="",h=!1,g=!1,k=[];window.onGoogleAPILoaded=function(){k.map(function(e){return e()}),g=!0};var y=function(e){v?(h||(h=!0,(a=document.createElement("script")).type="text/javascript",a.src="https://maps.googleapis.com/maps/api/js?key=".concat(v,"&callback=onGoogleAPILoaded"),a.async=!0,a.defer=!0,document.body.appendChild(a)),e&&(g?e():k.push(e))):e&&k.push(e)},b=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={loading:!1,noAPIKey:!v},y(function(){return n._loadMap()}),n}return Object(s.a)(t,e),Object(o.a)(t,[{key:"_loadMap",value:function(){var e=this,t=this.props,n=t.center,a=t.zoom,r=google.maps.Map;this.map=new r(this.mapWrapper,{center:n,zoom:a}),this.map.addListener("idle",function(){return e.setState({loading:!1,noAPIKey:!1})})}},{key:"getMapCenter",value:function(){if(g){var e=this.map.center;return{lat:e.lat(),lng:e.lng()}}return null}},{key:"setMarker",value:function(e){g&&new(0,google.maps.Marker)({map:this.map,position:e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,a=(t.center,t.zoom,Object(m.a)(t,["className","center","zoom"])),r=this.state,o=r.loading,i=r.noAPIKey;return l.a.createElement("div",Object.assign({ref:function(t){return e.mapWrapper=t},className:f()(n,{loading:o,noAPIKey:i})},a))}}]),t}(u.Component);b.defaultProps={center:{lat:0,lng:0},zoom:0};var j=b,O=(n(16),function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={apiKey:""},n}return Object(s.a)(t,e),Object(o.a)(t,[{key:"setMarker",value:function(){var e=this.map;e&&e.setMarker(e.getMapCenter())}},{key:"render",value:function(){var e=this,t=this.state.apiKey;return l.a.createElement("div",{ref:function(t){return e.demo=t},id:"demo"},l.a.createElement(j,{ref:function(t){return e.map=t},id:"map"}),l.a.createElement("input",{id:"api-key-input",value:t,onChange:function(t){var n=t.target;return e.setState({apiKey:n.value})}}),l.a.createElement("div",{className:"button",onClick:function(){return v=t,h=!1,g=!1,a&&a.remove(),void y()}},"Set API Key"),l.a.createElement("div",{id:"marker",className:"button",onClick:function(){return e.setMarker()}},"Set Marker"))}}]),t}(u.Component));Object(p.render)(l.a.createElement(O,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.43008e17.chunk.js.map