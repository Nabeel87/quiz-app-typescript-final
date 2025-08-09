import { QuizType, QuestionType } from "../Types/quiz_type";
const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)


export const getQuizDetails = async (totalQuestions: number, level: string): Promise<QuizType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    if (!res.ok) throw new Error("Failed to fetch Exam");
    let data = await res.json();

    console.log(res);
    if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid API response: 'results' is undefined or not an array");
    }

    let quiz: QuizType[] = data.results.map((QuestionObj: QuestionType) => {
        return {
            question: QuestionObj.question,
            answer: QuestionObj.correct_answer,
            correct_answer: QuestionObj.correct_answer,
            option: shuffleArray(QuestionObj.incorrect_answers.concat(QuestionObj.correct_answer))
        }

    })

    return quiz;
} 