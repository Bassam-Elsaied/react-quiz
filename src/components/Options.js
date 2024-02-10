import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { answer, dispatch } = useQuiz();

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option  ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payLoad: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options
