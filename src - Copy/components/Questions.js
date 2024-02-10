import Options from "./Options"

function Questions({questions ,answer , dispatch}) {
    return (
        <div>
            <h4>{questions.question}</h4>
            <Options questions={questions} answer={answer} dispatch={dispatch}/>
        </div>
    )
}

export default Questions
