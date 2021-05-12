import React, { useState, useEffect } from 'react';
import '../App.css';
import 'tachyons';
import Partciles from 'react-particles-js';
import axios from 'axios';
import Helper from './components/Helper';
import particlesOptions from '../functions/particlesOptions';
import Loader from './components/Loader';
import history from '../services/history';
import Dialog from './components/Dialog';
import Answer from './components/Answer';
import { shuffle } from '../functions/shuffle';

// class GameScreen extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       questions: [],
//       currentQuestionIndex: 0,
//       isHalfDisabled: false,
//       isPhoneAFriendDisabled: false,
//       isAskTheAudienceDisabled: false,
//       areTwoAnswersShown: false,
//       isAskTheAudienceHelperActive: false,
//       isPhoneAFriendHelperActive: false
//     }
//     this.Validate = this.Validate.bind(this);
//     this.PhoneAFriend = this.PhoneAFriend.bind(this);
//     this.AskTheAudience = this.AskTheAudience.bind(this);
//     this.Half = this.Half.bind(this);
//   }
//   componentDidMount() {
//     let arr = [];
//     axios.all([
//       axios.get('https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple'),
//       axios.get('https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple'),
//       axios.get('https://opentdb.com/api.php?amount=3&difficulty=hard&type=multiple'),
//     ]).then((response) => {
//       let arr1 = response[0].data.results;
//       let arr2 = response[1].data.results;
//       let arr3 = response[2].data.results;
//       arr = arr.concat(arr1, arr2, arr3)
//       this.setState({ questions: arr })
//     })
//   }
//   PhoneAFriend() {
//     this.setState({ isPhoneAFriendDisabled: true })
//     this.setState({ isPhoneAFriendHelperActive: true })
//   }
//   Half() {
//     this.setState({ isHalfDisabled: true })
//     this.setState({ areTwoAnswersShown: true })
//   }
//   AskTheAudience() {
//     this.setState({ isAskTheAudienceDisabled: true })
//     this.setState({ isAskTheAudienceHelperActive: true })
//   }
//   Validate(e) {
//     e.preventDefault()
//     this.setState({ areTwoAnswersShown: false })
//     this.setState({ isAskTheAudienceHelperActive: false })
//     this.setState({ isPhoneAFriendHelperActive: false })
//     if (this.state.currentQuestionIndex === 9 && this.state.questions[this.state.currentQuestionIndex].correct_answer === e.target.innerHTML) {
//       history.push('./success')
//     }
//     console.log(this.state.questions[this.state.currentQuestionIndex]);
//     if (this.state.questions[this.state.currentQuestionIndex].correct_answer === e.target.innerHTML) {
//       this.setState({ currentQuestionIndex: this.state.currentQuestionIndex + 1 })
//     } else {
//       alert(`Sorry, You failed at question number : ${this.state.currentQuestionIndex + 1}`)
//       history.push("./")
//     }
//   }

//   render() {
//     if (this.state.questions.length !== 0) {
//       let currentQ = this.state.questions[this.state.currentQuestionIndex];
//       let AnswersComponent;
//       let answers = [];
//       if (this.state.areTwoAnswersShown === false) {
//         answers = shuffle(currentQ.incorrect_answers.concat(currentQ.correct_answer));
//         console.log(currentQ.correct_answer);
//       } else {
//         answers.push(currentQ.correct_answer);
//         answers.push(currentQ.incorrect_answers[0])
//         console.log(currentQ.correct_answer);
//       }
//       AnswersComponent = answers.map((el, i) => <button key={i} onClick={this.Validate} className="btn btn-yellow ml-5 mr-5 mt-3 mb-3 btn-lg">{el}</button>)
//       return (
//         <div className="App">
//           <Partciles
//             className="particles"
//             params={particlesOptions}
//           />
//           <div className="container-fluid row mt-2 m-0 justify-content-center">
//             <div className={"mt-4 mb-1 d-flex justify-content-center text-uppercase text-white f4"}>
//               Question  &nbsp;<span style={{ fontWeight: 900 }}># {this.state.currentQuestionIndex + 1}</span>
//             </div>
//             <div className="m-4 br-4 box p-3 ">
//               <Helper
//                 handle={this.Half}
//                 content="50/50"
//                 disabled={this.state.isHalfDisabled} />

//               <Helper
//                 handle={this.PhoneAFriend}
//                 content="Phone a friend"
//                 disabled={this.state.isPhoneAFriendDisabled} />

//               <Helper
//                 handle={this.AskTheAudience}
//                 content="Ask the audience"
//                 disabled={this.state.isAskTheAudienceDisabled} />
//             </div>
//           </div>
//           <div
//             dangerouslySetInnerHTML={{ __html: currentQ.question }}
//             className="f3 white m-3">
//           </div>

//           <div className="container-fluid row mt-2 m-0 d-flex justify-content-center">
//             <Dialog
//               answers={currentQ.incorrect_answers.concat(currentQ.correct_answer)}
//               open={this.state.isAskTheAudienceHelperActive}
//               type="ask the audience" />

//             <Dialog
//               answers={currentQ.incorrect_answers.concat(currentQ.correct_answer)}
//               open={this.state.isPhoneAFriendHelperActive}
//               type="phone a friend" />
//           </div>

//           <div className="mt-3 justify-content-center flex-column">
//             {AnswersComponent}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <Loader />
//       );
//     }
//   }
// }

const GameScreen = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isHalfDisabled, setIsHalfDisabled] = useState(false)
  const [isPhoneAFriendDisabled, setIsPhoneAFriendDisabled] = useState(false)
  const [isAskTheAudienceDisabled, setIsAskTheAudienceDisabled] = useState(false)
  const [areTwoAnswersShown, setAreTwoAnswersShown] = useState(false)
  const [isAskTheAudienceHelperActive, setIsAskTheAudienceHelperActive] = useState(false)
  const [isPhoneAFriendHelperActive, setIsPhoneAFriendHelperActive] = useState(false)

  useEffect(() => {
    let arr = [];
    axios.all([
      axios.get('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'),
      axios.get('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple'),
      axios.get('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple'),
    ])
    .then((response) => {
      let arr1 = response[0].data.results;
      let arr2 = response[1].data.results;
      let arr3 = response[2].data.results;
      arr = arr.concat(arr1, arr2, arr3)
      setQuestions(arr)
    })
    .catch(err=>console.log(err))
  }, [])

  const phoneAFriend = () => {
    setIsPhoneAFriendDisabled(true)
    setIsPhoneAFriendHelperActive(true)
  }
  const half = () => {
    setIsHalfDisabled(true)
    setAreTwoAnswersShown(true)

  }
  const askTheAudience = () => {
    setIsAskTheAudienceDisabled(true)
    setIsAskTheAudienceHelperActive(true)

  }

  const validate = (e) => {
    e.preventDefault()

    setAreTwoAnswersShown(false)
    setIsAskTheAudienceHelperActive(false)
    setIsPhoneAFriendHelperActive(false)

    //TODO: Separete function on game won hasWon()
    if (currentQuestionIndex === 14 && questions[currentQuestionIndex].correct_answer === e.target.innerHTML) {
      history.push('./success')
    }

    console.log(questions[currentQuestionIndex]);

    //TODO: Separate function on giving a wrong answer isAnswerCorrect()
    if (questions[currentQuestionIndex].correct_answer === e.target.innerHTML) {
      let i = currentQuestionIndex
      setCurrentQuestionIndex(i + 1)

      //TODO: pop up with appropriate message
    } else {
      alert(`Sorry, You failed at question number : ${currentQuestionIndex + 1}`)
      console.log(questions[currentQuestionIndex].correct_answer,e.target.innerHTML)
      history.push("./")
    }
  }

  if (questions.length !== 0) {
    let currentQ = questions[currentQuestionIndex];
    let AnswersComponent;
    let answers = [];

    //TODO: separate function outside the return statement
    if (areTwoAnswersShown === false) {
      answers = shuffle(currentQ.incorrect_answers.concat(currentQ.correct_answer));
      console.log(currentQ.correct_answer);
    } else {
      answers.push(currentQ.correct_answer);
      answers.push(currentQ.incorrect_answers[0])
      console.log(currentQ.correct_answer);
    }
    //END TODO

    //AnswersComponent = answers.map((el, i) => <button key={i} onClick={validate} className="btn btn-yellow ml-5 mr-5 mt-3 mb-3 btn-lg">{el}</button>)
    AnswersComponent = answers.map((el,i)=><Answer key={i} validateHandler={validate} content={el} />)
    return (
      <div className="App">
        <Partciles
          className="particles"
          params={particlesOptions}
        />
        <div className="container-fluid row mt-2 m-0 justify-content-center">
          <div className="mt-4 mb-1 d-flex justify-content-center text-uppercase text-white f4">
            Question  &nbsp;<span style={{ fontWeight: 900 }}># {currentQuestionIndex + 1}</span>
          </div>
          <div className="m-4 br-4 box p-3 ">
            <Helper
              handle={half}
              content="50/50"
              disabled={isHalfDisabled} />

            <Helper
              handle={phoneAFriend}
              content="Phone a friend"
              disabled={isPhoneAFriendDisabled} />

            <Helper
              handle={askTheAudience}
              content="Ask the audience"
              disabled={isAskTheAudienceDisabled} />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: currentQ.question }}
          className="f3 white m-3">
        </div>

        {/* Invisible by default. Appear on respective helper click */}
        <div className="container-fluid row mt-2 m-0 d-flex justify-content-center">
          <Dialog
            answers={currentQ.incorrect_answers.concat(currentQ.correct_answer)}
            open={isAskTheAudienceHelperActive}
            type="ask the audience" />

          <Dialog
            answers={currentQ.incorrect_answers.concat(currentQ.correct_answer)}
            open={isPhoneAFriendHelperActive}
            type="phone a friend" />
        </div>

        <div className="mt-3 d-flex justify-content-center flex-column answers">
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
export default GameScreen;
