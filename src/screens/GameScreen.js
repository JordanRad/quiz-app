import React from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';
import Heading from './components/Heading';
import axios from 'axios';

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
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: true,
      questions: [],
      currentQuestion: 0
    }
  }
  componentDidMount() {
    let arr = [];
    axios.all([
      axios.get('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'),
      axios.get('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple'),
      axios.get('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'),
    ]).then((response) => {
      //console.log(response[0].data.results)
      let arr1 = response[0].data.results;
      let arr2 = response[1].data.results;
      let arr3 = response[2].data.results;
      arr = arr.concat(arr1, arr2, arr3)
      this.setState({questions:arr})
    })
  }

  loadCurrentQuestion() {
    let q = this.state.questions[this.state.currentQuestion]
    return q;
  }
  
 loadAnswers(){
    let q =  this.loadCurrentQuestion();
    let arr = [];
    arr.push(q.correct_answer)
    let result = arr.concat(q.incorrect_answers);
    shuffle(result)
    return result;
  }
  render() {
    console.log(this.state.questions.length===0?"no":this.state.questions)
    console.log(this.state.questions.length===0?"no":this.loadAnswers())
    return (

      <div className="App">
        
        <Partciles
          className="particles"
          params={particlesOptions}
        />

        <Heading />
        <div className="f2 white">
          {this.state.questions.length!==15 ? "Loading..." : this.loadCurrentQuestion().question}
        </div>
        <div className="">
          <button className="btn btn-primary">{this.state.questions.length!==15 ? "Loading..." : this.loadAnswers()[0]}</button>
          <button className="btn btn-primary">{this.state.questions.length!==15 ? "Loading..." : this.loadAnswers()[1]}</button>
          <button className="btn btn-primary">{this.state.questions.length!==15 ? "Loading..." : this.loadAnswers()[2]}</button>
          <button className="btn btn-primary">{this.state.questions.length!==15 ? "Loading..." : this.loadAnswers()[3]}</button>
        </div>
      </div>
    );
  }
}
export default App;
