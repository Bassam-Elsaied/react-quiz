import { createContext, useContext, useEffect, useReducer } from "react";



const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  hightScore: 0,
  seconRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payLoad, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        seconRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        hightScore:
          state.points > state.hightScore ? state.points : state.hightScore
      };
    case "reset":
      return {
        ...state,
        status: "active",
        index: 0,
        points: 0,
        answer: null,
        hightScore: state.hightScore,
        seconRemaining: state.questions.length * 30,
      };
    case "tick":
      return {
        ...state,
        seconRemaining: state.seconRemaining - 1,
        status: state.seconRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unkonw action");
  }
}

const QuizContext = createContext();

function QuizProvider({children}){

    const [
      { questions, status, index, answer, points, hightScore, seconRemaining },
      dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;

    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

      useEffect(function () {
        fetch("http://localhost:9000/questions")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payLoad: data }))
          .catch((err) => dispatch({ type: "dataFailed" }));
      }, []);


    return <QuizContext.Provider value={{questions , status , index , answer , points , hightScore , seconRemaining , numQuestions , maxPoints , dispatch}}>{children}</QuizContext.Provider>
}

 function useQuiz() {
   const context = useContext(QuizContext);
   if (context === undefined)
     throw new Error("QuizContext used outside CitiesProvider");
   return context;
 }

 export { QuizProvider , useQuiz};