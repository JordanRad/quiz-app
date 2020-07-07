import React from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';
import Heading from './components/Heading';
import axios from 'axios';
import Helper from './components/Helper';
import particlesOptions from './components/particlesOptions';
import Loader from './components/Loader';
import history from './../services/history';

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
class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: true,
      questions: [],
      currentQuestion: 0,
      currentAnswers: [],
      half_disabled: false,
      phone_a_friend_disabled: false,
      ask_the_audience_disabled: false,
      half_answers: false
    }
    this.Validate = this.Validate.bind(this);
    this.PhoneAFriend = this.PhoneAFriend.bind(this);
    this.AskTheAudience = this.AskTheAudience.bind(this);
    this.Half = this.Half.bind(this);
  }
  componentDidMount() {
    let arr = [];
    axios.all([
      axios.get('https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple'),
      axios.get('https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple'),
      axios.get('https://opentdb.com/api.php?amount=3&difficulty=hard&type=multiple'),
    ]).then((response) => {
      //console.log(response[0].data.results)
      let arr1 = response[0].data.results;
      let arr2 = response[1].data.results;
      let arr3 = response[2].data.results;
      arr = arr.concat(arr1, arr2, arr3)
      this.setState({ questions: arr })
    })
  }
  PhoneAFriend() {
    this.setState({ phone_a_friend_disabled: true })
    alert(this.state.questions[this.state.currentQuestion].correct_answer);
  }
  Half() {
    this.setState({ half_disabled: true })
    this.setState({ half_answers: true })
  }
  AskTheAudience() {
    this.setState({ ask_the_audience_disabled: true })
    alert(this.state.questions[this.state.currentQuestion].correct_answer);
  }
  Validate(e) {
    this.setState({ half_answers: false })
    if (this.state.currentQuestion === 9 && this.state.questions[this.state.currentQuestion].correct_answer === e.target.innerHTML) {
      alert("Yoy win the game")
      history.push('./')
    }
    console.log(this.state.questions[this.state.currentQuestion]);
    if (this.state.questions[this.state.currentQuestion].correct_answer === e.target.innerHTML) {
      //console.log("right")
      this.setState({ currentQuestion: this.state.currentQuestion + 1 })
    } else {
      //console.log("wrong");
      alert(`Sorry, You failed at question number : ${this.state.currentQuestion + 1}`)
      history.push("./")
    }
  }

  render() {
    if (this.state.questions.length !== 0) {
      let currentQ = this.state.questions[this.state.currentQuestion];
      let AnswersComponent;
      let answers = [];
      if (this.state.half_answers === false) {
        //let currentQ = this.state.questions[this.state.currentQuestion];
        answers = shuffle(currentQ.incorrect_answers.concat(currentQ.correct_answer));
        //AnswersComponent = answers.map((el, i) => <button key={i} onClick={this.Validate} className="btn btn-primary m-2">{el}</button>)
        console.log(currentQ.correct_answer);
      } else {
        // let currentQ = this.state.questions[this.state.currentQuestion];
        answers.push(currentQ.correct_answer);
        answers.push(currentQ.incorrect_answers[0])
        //AnswersComponent = answers.map((el, i) => <button key={i} onClick={this.Validate} className="btn btn-primary m-2">{el}</button>)
        console.log(currentQ.correct_answer);
        //this.setState({half_answers:false})
      }
      AnswersComponent = answers.map((el, i) => <button key={i} onClick={this.Validate} className="btn btn-yellow m-2">{el}</button>)
      return (
        <div className="App">
          <Partciles
            className="particles"
            params={particlesOptions}
          />
          <Heading />
          <div className="container-fluid row mt-2 m-0 justify-content-center">
            <div className="m-4 br-4 box p-1 col-4">
              <Helper
                handle={this.Half}
                content="50/50"
                disabled={this.state.half_disabled} />

              <Helper
                handle={this.PhoneAFriend}
                content="Phone a friend"
                disabled={this.state.phone_a_friend_disabled} />

              <Helper
                handle={this.AskTheAudience}
                content="Ask the audience"
                disabled={this.state.ask_the_audience_disabled} />
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: currentQ.question }} className="f2 white m-3">
          </div>
          <div className="mt-3">
            {AnswersComponent}
          </div>
        </div>
      );
    } else {
      return (
        <Loader />
      );
    }
  }
}
export default GameScreen;
