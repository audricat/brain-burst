import PropTypes from "prop-types";
import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
const QuestionNavigator = (props) => {
  const { handleToggleNavigator } = props;
  const { answers, handleJump } = useContext(QuestionContext);

  const questionStatus = (answer) => {
    const choices = ["A", "B", "C", "D"];
    if (choices.includes(answer)) {
      return "Answered";
    } else if (answer === "X") {
      return "Skipped";
    } else {
      return "Default";
    }
  };

  const handleJumpToPage = (idx) => {
    handleJump(idx);
    handleToggleNavigator();
  };
  return (
    <div className="question-navigator">
      <ul className="question-navigator-wrapper">
        <li className="navigator-header">
          <div className="navigator-header-wrapper">
            <div className="legend-wrapper">
              <span>Question Navigator</span>
              <span>Legend:</span>
            </div>
            <ul className="legend-title">
              <li>
                <span id="legend-answered"></span>
                <span>Answered</span>
              </li>
              <li>
                <span id="legend-skipped"></span>
                <span>Skipped</span>
              </li>
            </ul>
          </div>
        </li>
        <li className="navigator-center">
          <ul className="number-grid">
            {answers.map((answer, idx) => {
              return (
                <li key={idx} className="number-grid-wrapper">
                  <button
                    className="number-grid-button"
                    id={`${questionStatus(answer)}`}
                    onClick={() => handleJumpToPage(idx)}
                  >
                    {idx + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="navigator-footer">
          <button onClick={handleToggleNavigator} className="medium-button" id="navigator-back-button">
            <span className="medium-span">BACK</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default QuestionNavigator;

QuestionNavigator.propTypes = {
  handleToggleNavigator: PropTypes.func,
};
