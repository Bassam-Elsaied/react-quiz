import { useEffect } from "react"

function Timer({dispatch , secondRemaining}) {

    const min = Math.floor(secondRemaining / 60);
    const secondes = secondRemaining % 60

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
