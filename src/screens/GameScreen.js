import React from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';
import axios from 'axios';
import Helper from './components/Helper';
import particlesOptions from './components/particlesOptions';
import Loader from './components/Loader';
import history from './../services/history';
import Dialog from './components/Dialog';
import { shuffle } from './functions/shuffle';
class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      isHalfDisabled: false,
      isPhoneAFriendDisabled: false,
      isAskTheAudienceDisabled: false,
      areTwoAnswersShown: false,
      isAskTheAudienceHelperActive: false,
      isPhoneAFriendHelperActive: false
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
      let arr1 = response[0].data.results;
      let arr2 = response[1].data.results;
      let arr3 = response[2].data.results;
      arr = arr.concat(arr1, arr2, arr3)
      this.setState({ questions: arr })
    })
  }
  PhoneAFriend() {
    this.setState({ isPhoneAFriendDisabled: true })
    this.setState({ isPhoneAFriendHelperActive: true })
  }
  Half() {
    this.setState({ isHalfDisabled: true })
    this.setState({ areTwoAnswersShown: true })
  }
  AskTheAudience() {
    this.setState({ isAskTheAudienceDisabled: true })
    this.setState({ isAskTheAudienceHelperActive: true })
  }
  Validate(e) {
    e.preventDefault()
    this.setState({ areTwoAnswersShown: false })
    this.setState({ isAskTheAudienceHelperActive: false })
    this.setState({ isPhoneAFriendHelperActive: false })
    if (this.state.currentQuestionIndex === 9 && this.state.questions[this.state.currentQuestionIndex].correct_answer === e.target.innerHTML) {
      history.push('./success')
    }
    console.log(this.state.questions[this.state.currentQuestionIndex]);
    if (this.state.questions[this.state.currentQuestionIndex].correct_answer === e.target.innerHTML) {
      this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 })
    } else {
      alert(`Sorry, You failed at question number : ${this.state.currentQuestionIndex + 1}`)
      history.push("./")
    }
  }

  render() {
    if (this.state.questions.length !== 0) {
      let currentQ = this.state.questions[this.state.currentQuestionIndex];
      let AnswersComponent;
      let answers = [];
      if (this.state.areTwoAnswersShown === false) {
        answers = shuffle(currentQ.incorrect_answers.concat(currentQ.correct_answer));
        console.log(currentQ.correct_answer);
      } else {
        answers.push(currentQ.correct_answer);
        answers.push(currentQ.incorrect_answers[0])
        console.log(currentQ.correct_answer);
      }
      AnswersComponent = answers.map((el, i) => <button key={i} onClick={this.Validate} className="btn btn-yellow ml-5 mr-5 mt-3 mb-3 btn-lg">{el}</button>)
      return (
        <div className="App">
          <Partciles
            className="particles"
            params={particlesOptions}
          />
          <div className="container-fluid row mt-2 m-0 justify-content-center">
          <div className={"mt-4 mb-1 d-flex justify-content-center text-uppercase text-white f4"}>
           Question  &nbsp;<span style={{fontWeight:900}}># {this.state.currentQuestionIndex+1}</span>
          </div>
            <div className="m-4 br-4 box p-3 ">
              <Helper
                handle={this.Half}
                content="50/50"
                disabled={this.state.isHalfDisabled} />

              <Helper
                handle={this.PhoneAFriend}
                content="Phone a friend"
                disabled={this.state.isPhoneAFriendDisabled} />

              <Helper
                handle={this.AskTheAudience}
                content="Ask the audience"
                disabled={this.state.isAskTheAudienceDisabled} />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: currentQ.question }}
            className="f3 white m-3">
          </div>

          <div className="container-fluid row mt-2 m-0 d-flex justify-content-center">
            <Dialog
              answers={currentQ.incorrect_answers.concat(currentQ.correct_answer)}
              open={this.state.isAskTheAudienceHelperActive}
              type="ask the audience" />

            <Dialog
              answers={currentQ.incorrect_answers.concat(currentQ.correct_answer)}
              open={this.state.isPhoneAFriendHelperActive}
              type="phone a friend" />
          </div>
         
            <div className="mt-3 d-flex justify-content-center flex-column">
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
