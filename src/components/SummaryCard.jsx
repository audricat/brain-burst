import { Questions } from "../database/Questions";
import QuestionContext from "../context/QuestionContext";
import { useContext, useState } from "react";
import PropTypes from 'prop-types'
import { GoXCircle, GoCheckCircle, GoSkip } from "react-icons/go";
const SummaryCard = (props) => {
  const {closeSummary} = props;
  const {answers, numToChar } = useContext(QuestionContext);
  const [toggleExplanation,setToggleExplanation] =useState(-1)
  
  
  const summaryRemarks = (correctAnswer, myAnswer) => {
    if (myAnswer === correctAnswer) {
      return "Correct";
    } else if (myAnswer !== correctAnswer && myAnswer !== "X") {
      return "Incorrect";
    } else {
      return "Skipped";
    }
  };

  const summaryRemarksIcon = (correctAnswer, myAnswer) => {
    if (myAnswer === correctAnswer) {
      return <GoCheckCircle className="summary-remarks-icon Correct" />;
    } else if (myAnswer !== correctAnswer && myAnswer !== "X") {
      return <GoXCircle className="summary-remarks-icon Incorrect" />;
    } else {
      return <GoSkip className="summary-remarks-icon Skipped" />;
    }
  };
  
  const openLink =(link)=>{
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
  const handleExplanation = (idx)=>{
     setToggleExplanation(idx)
  }
 
  return (
    <div className="summary-card">
      <div className="summary-head">
        <button className="close-button" onClick={()=>closeSummary
        ()}>X</button>
      </div>
      <ul className="summary-body">
        {Questions.map((q, idx) => {
          return (
            <li className="summary-content" key={idx}>
              <div className="summary-question">
                <p>
                  {q.itemNumber}.{q.question}
                </p>
              </div>
              <div className="summary-choices">
                {q.choices.map((c, idx2) => {
                  return (
                    <span className={`answer-choices-span ${answers[idx] === numToChar(idx2) ? "myAnswer": null}`} key={idx2}>
                      {numToChar(idx2)}.{c}
                    </span>
                  );
                })}
              </div>
              <div className="summary-remarks">
               <div className={`summary-remarks-wrapper ${summaryRemarks(q.correctAnswer, answers[idx])}`}>
                <ul className="summary-remarks-grid">
                  <li id="aaa">
                  {summaryRemarksIcon(q.correctAnswer, answers[idx])}
                  </li>
                  <li id="bbb">
                  <p className="summary-correct-answer">
                  <span>
                    {`${summaryRemarks(q.correctAnswer, answers[idx])}`}:
                  </span>
                  The correct answer is letter {q.correctAnswer}. 
                </p>
                  </li>
                  <li id="ccc" >
                 { toggleExplanation === idx
                 ? <button className="explanation-button" onClick={()=>handleExplanation(-1)}>Hide explanation</button>
                 :  <button className="explanation-button" onClick={()=>handleExplanation(idx)}>Show explanation</button>
                 }
                  </li>
                </ul>
             
               </div>
              { toggleExplanation === idx ?
                <div className={`summary-explanation ${summaryRemarks(q.correctAnswer, answers[idx])}`}>
               <ul className="summary-explanation-wrapper">
                   <li>Explanation:</li>
                   <li>
                    <p>{q.explanation}
                     </p>
                   </li>
                   <li className="summary-source-link">
                    <button  className="explanation-button" onClick={()=> openLink(q.source) }>Learn more</button>
                  
                   </li>
               </ul>
             </div>
               : <></>
               

              }
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SummaryCard;

SummaryCard.propTypes ={
  closeSummary: PropTypes.func,
}