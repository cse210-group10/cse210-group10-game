import React from "react";
import type { questionData } from "./question-logic";

//sets up the question and the amount earned per work day
interface questionDisplayProps{
    questionInfo: questionData;
    amountPerDay: number;
}

const QuestionDisplay: React.FC<questionDisplayProps> = ({questionInfo, amountPerDay}) => {
    return(
        <div className="question-display-container">
            {/*question info*/}
            <h2>{questionInfo.question}</h2>
            <div className="question-data-info">
                {/*displays rate earned and current amount from each work day*/}
                <p> You earn {questionInfo.rateEarned} coins per work day.</p>
                <p>Current: {amountPerDay} coins</p>
            </div>
        </div>
    );

};

export default QuestionDisplay;