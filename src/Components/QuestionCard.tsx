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

    const decodeHTML = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className="quiz-container">
            <div className="question">
                {decodeHTML(question)}
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
                                {decodeHTML(opti)}
                            </label>
                        </div>
                    )
                })}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default QuestionCard;