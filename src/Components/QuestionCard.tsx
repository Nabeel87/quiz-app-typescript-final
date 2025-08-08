import React from "react";
import { propsQuestionType } from "../Types/quiz_type";

const QuestionCard: React.FC<propsQuestionType> = ({
    question,
    options,
    callback
}) => {
    return (
        <div className="question-container">
            <div className="question">
                {question}
            </div>
            <form onSubmit={callback}>
                {options.map((opti: string, inde: number) => {
                    return (
                        <div key={inde}>
                            <label>
                                <input
                                    type="radio"
                                    name="opt"
                                    value={opti}
                                />
                                {opti}
                            </label>
                        </div>
                    )
                })}
                <input type="submit" />
            </form>
        </div>
    )
}

export default QuestionCard;