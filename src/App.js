import React from "react";
import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import "leaflet/dist/leaflet.css";
import "./styles.css";

//import { addressPoints } from "./data.js";

class App extends React.Component {
  state = {
    mapHidden: false,
    layerHidden: false,
    addressPoints: [],
    radius: 12,
    blur: 5,
    max: 0.5,
    limitAddressPoints: false
  };
  
  async componentDidMount()
  {
  	this.getData ();
  }

  getData ()
  {
	this.setState({
	     addressPoints:  [
        	[16.282820, 99.942230, "486"],
        	[16.642805, 99.565186, "807"],
        	[16.772568 ,99.405617, "899"]
     	     ]});
  }

  render() {

    const gradient = {
      0.1: "#89BDE0",
      0.2: "#96E3E6",
      0.4: "#82CEB6",
      0.6: "#FAF3A5",
      0.8: "#F5D98B",
      "1.0": "#DE9A96"
    };

    return (
      <div className="app">
        <div className="app-map">
          <Map
            style={{ width: "100%", height: "100%" }}
            center={[15,100]}
            zoom={7}
          >
            {!this.state.layerHidden && (
              <React.Fragment>
                <HeatmapLayer
                  //fitBoundsOnLoad
                  points={this.state.addressPoints}
                  longitudeExtractor={m => m[1]}
                  latitudeExtractor={m => m[0]}
                  gradient={gradient}
                  intensityExtractor={m => parseFloat(m[2])}
                  radius={Number(this.state.radius)}
                  blur={Number(this.state.blur)}
                  max={Number.parseFloat(this.state.max)}
                />
              </React.Fragment>
            )}
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </Map>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
export default App;

