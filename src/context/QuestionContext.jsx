import { createContext, useEffect, useState } from "react";
import { Questions } from "../database/Questions";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const QuestionContext = createContext({});

export function QuestionProvider({ children }) {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState(Array(Questions.length));
  const [itemCount] = useState(Questions.length);
  const { itemNumber, question, choices } = Questions[page];
  const navigate = useNavigate();

  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers === null || currentAnswers === undefined) {
      localStorage.setItem("users_answers", JSON.stringify(answers));
    }
  });

  useEffect(() => {
    const currentAnswers = JSON.parse(localStorage.getItem("users_answers"));
    if (currentAnswers) {
      setAnswers(currentAnswers);
    }
  }, [setAnswers]);

  const progress = () => {
    return (itemNumber * 100) / itemCount;
  };

  const numToChar = (num) => {
    const char = ["A", "B", "C", "D"];
    return num <= char.length ? char[num] : null;
  };

  const isAnswerNull = () => {
    if (answers[itemNumber - 1] === null) {
      handleAnswers("X");
    }
  };

  const handleNext = () => {
    if (page !== itemCount - 1) {
      isAnswerNull();
      setPage((page) => page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      isAnswerNull();
      setPage((page) => page - 1);
    }
  };

  const handleJump = (jumpToPage) => {
    setPage(jumpToPage);
  };

  const handleAnswers = (choice) => {
    const oldAnswers = [...answers];
    oldAnswers.splice(itemNumber - 1, 1, choice);
    setAnswers(oldAnswers);
    localStorage.setItem("users_answers", JSON.stringify(oldAnswers));
  };

  const selectedAnswer = (idx) => {
    return answers[itemNumber - 1] === numToChar(idx) ? true : false;
  };

  const submitResponse = () => {
    Swal.fire({
      title: "Are you sure you want to submit your quiz?",
      text: "Once submitted, you cannot make any changes.",
      showCancelButton: true,
      cancelButtonText: "CANCEL",
      confirmButtonText: "SUBMIT",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(function (res) {
      if (res.isConfirmed) {
        navigate("/score", { replace: true });
      }
    });
  };

  return (
    <QuestionContext.Provider
      value={{
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
        handleJump,
        progress,
      }}
    >
      {children}
      <Outlet />
    </QuestionContext.Provider>
  );
}

export default QuestionContext;

QuestionProvider.propTypes = {
  children: PropTypes.node,
};
