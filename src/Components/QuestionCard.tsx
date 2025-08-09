import React, { useState } from "react";
import { propsQuestionType } from "../Types/quiz_type";

const QuestionCard: React.FC<propsQuestionType> = ({
    question,
    options,
    callback
}) => {
    const [selected, setSelected] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (!selected) {
            alert("Please Select An Option First");
            return;
        }
        callback(e, selected);
        setSelected("");//its clear section for next question
    };

    return (
        <div className="quiz-container">
            <div className="question">
                {question}
            </div>
            <form onSubmit={handleSubmit}>
                {options.map((opti: string, inde: number) => {
                    return (
                        <div className="option" key={inde}>
                            <label>
                                <input
                                    type="radio"
                                    name="opt"
                                    value={opti}
                                    checked={selected === opti}
                                    onChange={handleChange}
                                />
                                {opti}
                            </label>
                        </div>
                    )
                })}
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default QuestionCard;