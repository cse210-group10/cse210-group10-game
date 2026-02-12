import React from "react";
import type { questionData } from "./question-logic";

interface questionDisplayProps{
    questionInfo: questionData;
    amountPerDay: number;
}

const QuestionDisplay: React.FC<questionDisplayProps> = ({questionInfo, amountPerDay}) => {
    return(
        <div className="question-display-container">
            <h2>{questionInfo.question}</h2>
            <div className="question-data-info">
                <p> You earn {questionInfo.rateEarned} per work day.</p>
                <p>Current: {amountPerDay}</p>
            </div>
        </div>
    );

};

export default QuestionDisplay;