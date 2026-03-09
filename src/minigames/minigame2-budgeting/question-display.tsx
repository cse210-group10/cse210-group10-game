import React from "react";
import type { questionData } from "./question-logic";

//sets up the question and the amount earned per work day
export interface questionDisplayProps{
    questionInfo: questionData;
    amountPerDay: number;
    totalWorkDays: number;
}

const QuestionDisplay: React.FC<questionDisplayProps> = ({questionInfo, amountPerDay, totalWorkDays}) => {
    return(
        <div className="question-display-container">
            {/*question info*/}
            <h2>{questionInfo.question}</h2>
            <div className="question-data-info">
                {/*displays rate earned and current amount from each work day*/}
                <p> You earn {questionInfo.rateEarned} coins per work day.</p>
                <p>Current: {amountPerDay} coins</p>
            </div>
            {/*Counter Display to check each work day, can reintegrate math logic later in calendar logic*/}
            <h2>Total Work Days: {totalWorkDays}</h2>
        </div>
    );

};

export default QuestionDisplay;