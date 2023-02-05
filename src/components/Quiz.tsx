import { useEffect, useState } from "react";
import axios from "axios";
import CurrentQuestion from "../interface/CurrentQuestion";
import { Questions, Question} from "../interface/Question";
import Result from "./Result";
import Parameters from "../interface/Parameters";

const Quiz:React.FC<Questions> = ({ questions }) => {
  //"Modal" data
  const [correct, setCorrect] = useState<boolean>(false);
  const [showCorrectHero, setShowCorrectHero] = useState<boolean>(false);
  const [showFinalHero, setShowFinalHero] = useState<boolean>(false);

  // Question data
  const [choice, setChoice] = useState<boolean>(false);
  const changeChoice = () => setChoice(prevChoice => !prevChoice);

  // Quiz data
  const [prevQuestionNumber, setPrevQuestionNumber] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    number: 0,
    question: "",
    category: "",
  });

  const showQuestion = (number: number) => {
    setCurrentQuestion({
      number: number + 1,
      question: questions[number].question,
      category: questions[number].category,
    });
  };

  const nextQuestion = (choice: boolean) => {
    if (choice.toString().toLowerCase() === questions[questionNumber].correct_answer.toLowerCase()) {
      setCorrect(true);
      setScore(prevScore => prevScore += 1);
    } else {
      setCorrect(false);
    }
    setPrevQuestionNumber(questionNumber);

    if (questionNumber < questions.length-1) {
      setQuestionNumber(prevQuestionNumber => prevQuestionNumber += 1);
    }

    setChoice(false);
    setShowCorrectHero(true);
  }

  useEffect(() => {
    showQuestion(questionNumber);
    if (questionNumber < questions.length-1) {
      setTimeout(() => setShowCorrectHero(false), 3000);
    } else {
      setTimeout(() => setShowFinalHero(true), 3000);
    }
  }, [questionNumber, showCorrectHero])

  return (
    <div className={`relative border border-red-200 p-5 mt-5 mx-4 rounded-xl shadow-md`}>
      <div className="flex max-[520px]:flex max-[520px]:flex-col items-center mb-2 text-2xl font-light">
        <div className={`w-fit ml-0 max-[520px]:mr-auto`}>
          <span className={`ml-1 text-red-400`}>{currentQuestion.category}</span>
        </div>
        <div className={`w-fit ml-auto max-[520px]:mr-0`}>
          <span className={`ml-1 text-red-400`}>{questions[questionNumber].difficulty.slice(0, 1).toUpperCase()}{questions[questionNumber].difficulty.slice(1)}</span>
        </div>
        <div className={`w-fit ml-auto`}>
          <span>Score:</span>
          <span className={`ml-1 text-red-400`}>{score}</span>
          <span>/{questions.length}</span>
        </div>
      </div>
      <div className="p-1">
        <div className="text-3xl max-[520px]:text-xl font-light">
          <span>Q.{currentQuestion.number}:</span>
          <span className="ml-1">{currentQuestion.question}</span>
        </div>
        <div className="font-light text-2xl max-[520px]:text-lg p-2">
          <div className="flex items-center">
            <input
              className="mr-1" 
              id="true"
              checked={choice === true}
              onChange={changeChoice}
              type="radio"
            />
            <label htmlFor="true">True</label>
          </div>
          <div className="flex items-center">
            <input 
              className="mr-1"
              id="false"
              checked={choice === false}
              onChange={changeChoice}
              type="radio"
            />
            <label htmlFor="false">False</label>
          </div>
        </div>
        <div className="ml-auto w-fit">
          <button 
            className={`border border-red-400 font-light text-xl text-red-400 rounded-2xl px-3 py-1 hover:bg-red-400 hover:text-white transition-all duration-300`}
            onClick={() => nextQuestion(choice)}
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
      <Result showFinalHero={showFinalHero} showCorrectHero={showCorrectHero} correct={correct} number={questions.length} score={score} question={questions[prevQuestionNumber].question} answer={questions[prevQuestionNumber].correct_answer} />
    </div>
  );
}

export default Quiz;