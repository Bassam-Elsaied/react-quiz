import { useEffect , useReducer } from "react";
import Header from './components/Header';
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextBtn from "./components/NextBtn";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState ={
  questions:[],
  status: "loading",
  index: 0,
  answer: null,
  points : 0 ,
  hightScore : 0,
  seconRemaining: null
}

function reducer(state , action){
  switch (action.type){
    case "dataReceived":
      return {...state , questions: action.payLoad , status: "ready"}
    case "dataFailed":
      return {...state ,  status: "error"}
    case "start":
      return {...state ,  status: "active" , seconRemaining : state.questions.length * 30}
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {...state ,  answer: action.payLoad ,
         points: action.payLoad === question.correctOption ?
          state.points + question.points : 
          state.points }
    case "next":
      return {...state, index: state.index +1 , answer: null}
    case "finish":
      return { ...state, status: "finished", hightScore : state.points > state.hightScore ? state.points : state.hightScore};
    case "reset":
        return {
          ...state,
          status: "active",
          index: 0,
          points: 0,
          answer: null,
          hightScore : 0,
          seconRemaining: 10
        };
    case "tick":
      return {
        ...state,
        seconRemaining: state.seconRemaining - 1,
        status: state.seconRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unkonw action")
  }
}

function App() {

const [{questions , status , index ,answer , points , hightScore , seconRemaining} , dispatch] = useReducer(reducer , initialState)

const numQuestions = questions.length;

const maxPoints = questions.reduce((prev , cur) => prev + cur.points , 0)

  useEffect(function(){
    fetch("http://localhost:9000/questions")
    .then(res=>res.json())
    .then(data=>dispatch({type : "dataReceived", payLoad: data}))
    .catch(err=>dispatch({type : "dataFailed"}));
  },[])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={seconRemaining} />
              <NextBtn
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={hightScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
