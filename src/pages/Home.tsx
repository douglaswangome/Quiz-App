import React, { ReactNode, useState } from "react";
import Header from "../components/Header";
import Quiz from "../components/Quiz";
import Parameters from "../interface/Parameters";
import axios from "axios";

const Home: React.FC = () => {
  let content:ReactNode;
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [parameters, setParameters] = useState<Parameters>({
    amount: 10,
    difficulty: "easy",
    type: "boolean",
  });

  const changeParameters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = event.target;

    setParameters(prevParameters => {
      return {
        ...prevParameters,
        [name]: type === "checkbox" ? checked : value,
      }
    });
  }

  const getQuestion = async (params: Parameters) => {
    const response = await axios.get("https://opentdb.com/api.php", {params: params});
    setQuestions(response.data.results);
    setShowQuestions(true);
  }

  if (showQuestions) {
    content = (
      <>
      <Header />
      <Quiz questions={questions} />
      </>
    );
  } else {
    content = (
      <>
      <div className="border border-red-400 shadow-xl p-6 w-fit mt-6 mx-auto text-2xl max-[520px]:text-xl max-[520px]:text-md font-extralight rounded-xl">
        <div className="w-fit mx-auto">
          <span className="text-red-400 text-4xl max-[520px]:text-2xl font-extralight">Quiz App</span>
        </div>
        <div className="flex flex-col my-2">
          <span>Number of Questions:</span>
          <input
            className="p-1 border-b border-red-400"
            id="amount"
            name="amount"
            value={parameters.amount}
            onChange={changeParameters}
            type="number"
          />
        </div>
        <div className="flex flex-col my-2">
          <span>Difficulty:</span>
          <div className="text-xl max-[520px]:text-md">
            <div className="flex items-center">
              <input
                className="mr-1"
                id="easy"
                name="difficulty"
                value="easy"
                checked={parameters.difficulty === "easy"}
                onChange={changeParameters}
                type="radio" 
              />
              <label htmlFor="easy">Easy</label>
            </div>
          </div>
          <div className="text-xl max-[520px]:text-md">
            <div className="flex items-center">
              <input
                className="mr-1"
                id="medium"
                name="difficulty"
                value="medium"
                checked={parameters.difficulty === "medium"}
                onChange={changeParameters}
                type="radio"
              />
              <label htmlFor="medium">Medium</label>
            </div>
          </div>
          <div className="text-xl max-[520px]:text-md">
            <div className="flex items-center">
              <input
              className="mr-1"
                id="hard"
                name="difficulty"
                value="hard"
                checked={parameters.difficulty === "hard"}
                onChange={changeParameters}
                type="radio" 
              />
              <label htmlFor="hard">Hard</label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button 
            className={`w-full border border-red-400 font-light text-xl max-[520px]:text-md mr-5 text-red-400 rounded-2xl px-3 py-1 hover:bg-red-400 hover:text-white transition-all duration-300`}
            onClick={() => getQuestion(parameters)}  
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="max-[520px]:p-2">
      {content}
      <div className="w-fit h-fit m-auto mt-6">
        <button 
          className={`w-full border border-red-400 font-light text-xl max-[520px]:text-md mr-5 text-red-400 rounded-2xl px-3 py-1 hover:bg-red-400 hover:text-white transition-all duration-300 ${showQuestions ? "opacity" : "opacity-0"}`}
          onClick={() => setShowQuestions(false)}  
        >
          <span>Restart</span>
        </button>
      </div>
    </div>
  )
}

export default Home;