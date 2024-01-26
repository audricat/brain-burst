import { useContext, useEffect, useState } from "react";
import QuestionContext from "../context/QuestionContext";
import QuestionNavigator from "./QuestionNavigator";
import Swal from "sweetalert2";
import flag from "../assets/flag.png";
import { BsInfoCircle } from "react-icons/bs";
import PropTypes from 'prop-types'
const QuizCard = (props) => {
  const { showInstruction } = props;
  const {
    answers,
    itemNumber,
    itemCount,
    question,
    choices,
    handleAnswers,
    selectedAnswer,
    numToChar,
    handlePrevious,
    submitResponse,
    handleNext,
    progress,
  } = useContext(QuestionContext);

  const [toggleNavigator, setToggleNavigator] = useState(false);

  const handleToggleNavigator = () => {
    setToggleNavigator(!toggleNavigator);
  };

  if (toggleNavigator) {
    return <QuestionNavigator handleToggleNavigator={handleToggleNavigator} />;
  }

  const handleFlag = () => {
    Swal.fire({
      title:
        "<h5 style='color:red'>" +
        "Are you sure you want to flag this question?" +
        "</h5>",
      showCancelButton: true,
      cancelButtonText: "CANCEL",
      confirmButtonText: "CONFIRM",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(function (res) {
      if (res.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Question is Flagged!",
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500,
        });
      }
    });
  };
 
  return (
    <ul className="quiz-card">
      <li className="quiz-card-header">
        <div id="item-count-wrapper">
          <span>Question</span>
          <span>
            {itemNumber}/{itemCount}
          </span>
        </div>
        <div id="navigator-button-wrapper">
     
        <button className="medium-button" id="quiz-icon-button"onClick={handleToggleNavigator}>
            <span className="medium-span" id="quiz-icon-span">   <BsInfoCircle className="quiz-icon" onClick={showInstruction}/></span>
          </button>
          <button className="medium-button" onClick={handleToggleNavigator}>
            <span className="medium-span">Review</span>
          </button>
        </div>
      </li>
      <li id="progress-bar">
        <div id="progress-bar-wrapper">
          <div id="progress-line" style={{ width: `${progress()}%` }}></div>
        </div>
      </li>

      <li id="questions">
        <div id="questions-wrapper">
          <div className="flag-wrapper">
              <button className="flag-button" onClick={handleFlag}>
                <img src={flag} className="flag-img" />
              </button>
          </div>
          <div className="question-text-wrapper">
            <p id="question-text">
              <span>{itemNumber}.</span> {question}
            </p>
          </div>
        </div>
      </li>

      <li id="answer-choices">
        <div id="answer-choices-wrapper">
          {choices.map((choice, idx) => {
            return (
              <button
                className="quiz-button"
                onClick={() => handleAnswers(numToChar(idx))}
                key={idx}
                id={
                  selectedAnswer(idx) ? "button-selected" : "button-unselected"
                }
              >
                <span
                  className="quiz-span"
                  id={selectedAnswer(idx) ? "span-selected" : "span-unselected"}
                >
                  {numToChar(idx)}.{choice}
                </span>
              </button>
            );
          })}
        </div>
      </li>

      <li id="quiz-navigation">
        <div id="quiz-navigation-wrapper">
          <button
            className="quiz-button"
            id="button-navigate"
            onClick={handlePrevious}
            disabled={itemNumber === 1}
          >
            <span className="quiz-span">PREVIOUS</span>
          </button>

          {itemNumber === itemCount ? (
            <button
              className="quiz-button"
              id="button-submit"
              onClick={submitResponse}
            >
              <span className="quiz-span">SUBMIT</span>
            </button>
          ) : (
            <button
              className="quiz-button"
              id="button-navigate"
              onClick={handleNext}
            >
              <span className="quiz-span">NEXT</span>
            </button>
          )}
        </div>
      </li>
    </ul>
  );
};

export default QuizCard;
QuizCard.propTypes = {
  showInstruction: PropTypes.func,
};
