// import { useEffect  } from "react";
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
import { useQuiz } from "./context/QuizContext";



function App() {

  const {status } = useQuiz()

  
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen />
        )}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer  />
              <NextBtn />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen />
        )}
      </Main>
    </div>
  );
}

export default App;
