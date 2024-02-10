import { useEffect } from "react"
import { useQuiz } from "../context/QuizContext";

function Timer() {

  const { dispatch , seconRemaining} = useQuiz()

    const min = Math.floor(seconRemaining / 60);
    const secondes = seconRemaining % 60

    useEffect(()=>{
        const id = setInterval(function(){
            dispatch({type: "tick"})
        }, 1000)
        return () => clearInterval(id)
    },[dispatch])

    return (
      <div className="timer">
        {min < 10 && "0"}
        {min}:{secondes < 10 && "0"}
        {secondes}
      </div>
    );
}

export default Timer
