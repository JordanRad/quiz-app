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

const isAnswerCorrect = (correctAnswer, givenAnswer) => {
  return correctAnswer === givenAnswer;
}
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
      .catch(err => console.log(err))
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

  const getAnswers = () => {
    let incorrectAnswers = questions[currentQuestionIndex].incorrect_answers
    let answers = [];
    let correctAnswer = questions[currentQuestionIndex].correct_answer

    answers = !areTwoAnswersShown ?
      shuffle(incorrectAnswers.concat(correctAnswer)) : [correctAnswer, incorrectAnswers[0]]
    return answers.map((el, i) => <Answer key={i} validateHandler={validate} content={el} />)
  }

  const validate = (e) => {
    let correctAnswer = questions[currentQuestionIndex].correct_answer
    let givenAnswer = e.target.innerHTML;

    e.preventDefault()
    setAreTwoAnswersShown(false)
    setIsAskTheAudienceHelperActive(false)
    setIsPhoneAFriendHelperActive(false)

    console.log(questions[currentQuestionIndex]);

    if (isAnswerCorrect(correctAnswer, givenAnswer)) {
      if (currentQuestionIndex === 14) {
        history.push('./success')
      } else {
        let i = currentQuestionIndex
        setCurrentQuestionIndex(i + 1)
      }

      //TODO: pop up with appropriate message
    } else {
      alert(`Sorry, You failed at question number : ${currentQuestionIndex + 1}`)
      console.log(questions[currentQuestionIndex].correct_answer, e.target.innerHTML)
      history.push("./")
    }
  }

  if (questions.length !== 0) {
    let currentQ = questions[currentQuestionIndex];
    console.log(currentQ.correct_answer);
    let AnswersComponent = getAnswers();

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
