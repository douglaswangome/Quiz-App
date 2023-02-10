import { ReactNode } from "react";

interface Props {
  question: string;
  answer: string;
  showFinalHero: boolean;
  showCorrectHero: boolean;
  correct: boolean;
  score: number;
  number: number;
}

const Result: React.FC<Props> = (props) => {
  const {showFinalHero, showCorrectHero, correct, number, score, question, answer} = props;
  let title:string;
  let content:ReactNode;

  if (showFinalHero) {
    content = (
      <>
        <span className={`text-red-400 text-4xl max-[520px]:text-2xl font-extralight my-1`}>Congratulations! You finished the quiz!!</span>
        <div className="my-1 text-2xl">
          <span>Your final score is:</span>
          <span className={`text-red-400 ml-1`}>{score}</span>
          <span>/{number}</span>
        </div>
      </>
    )
  } else {
    if (correct) {
      title = "Yay! You got it right!!"
    } else {
      title = "Oops! You got it wrong!!"
    }

    content = (
      <>
        <span className={`text-red-400 text-4xl max-[520px]:text-2xl font-extralight`}>{title}</span>
        <span 
          className="text-xl"
          dangerouslySetInnerHTML={{__html: `Question: ${question}`}}
        ></span>
        <span className="text-xl">Answer: {answer.slice(0, 1).toUpperCase()}{answer.slice(1)}</span>
        <div className="text-2xl">
          <span>Your score is:</span>
          <span className={`text-red-400 ml-1`}>{score}</span>
          <span>/{number}</span>
        </div>
      </>
    );
  }  

  return (
    <div className={`flex flex-col text-center justify-center items-center absolute top-0 bg-red-200 h-full w-full font-light ${showCorrectHero ? "left-0" : "-ml-10 -left-full"} rounded-xl transition-all duration-300`}>
      {content}
    </div>
  );
}

export default Result;