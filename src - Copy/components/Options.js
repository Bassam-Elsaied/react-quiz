function Options({ questions , answer , dispatch }) {
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option  ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === questions.correctOption
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
