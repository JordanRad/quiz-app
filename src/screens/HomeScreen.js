import React from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';


const particlesOptions = {
  "particles": {
    "number": {
      "value": 180,
      "density": {
        "enable": true,
        "value_area": 1803.4120608655228
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 2,
        "color": "#ffe66d"
      },
      "polygon": {
        "nb_sides": 4
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.4008530152163807,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 1.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 0,
      "color": "#ffffff",
      "opacity": 0.3687847739990702,
      "width": 0.6413648243462091
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }

  }
}

class App extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="App">
        <Partciles
          className="particles"
          params={particlesOptions}
        />
        <button>Hello</button>
      </div>
    );
  }
}
export default App;
