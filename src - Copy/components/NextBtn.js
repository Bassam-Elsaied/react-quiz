function NextBtn({answer , dispatch , index , numQuestions}) {

    if (answer === null) return null

   if(index < numQuestions -1) 
   return (
        <button className="btn btn-ui" onClick={()=> dispatch({type:"next"})}>
            Next
        </button>
    )

    if(index === numQuestions -1) return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finish
      </button>
    );
}

export default NextBtn
