import { useQuiz } from "../context/QuizContext";

function FinishScreen() {

  const { points , maxPoints , hightScore ,dispatch} = useQuiz()

  const prec = (points / maxPoints) * 100;


  let emoji;

  if (prec === 100) emoji = "🥇";
  if (prec >= 80 && prec < 100) emoji = "🥈";
  if (prec >= 50 && prec < 80) emoji = "🥉";
  if (prec >= 0 && prec < 50) emoji = "🤐";
  if (prec === 0) emoji = "☹";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of
        {maxPoints} ({Math.ceil(prec)})%
      </p>
      <p className="highscore"> ( HighScore {hightScore} points )</p>
      <button className="btn btn-ui" onClick={() => dispatch({type: "reset"})}>Reset the Quiz</button>
    </>
  );
}

export default FinishScreen
