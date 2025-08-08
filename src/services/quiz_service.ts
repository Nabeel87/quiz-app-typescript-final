import { QuizType, QuestionType } from "../Types/quiz_type";
const shuffleArray = (array: any[]) =>
    [...array].sort(()=> Math.random() - 0.5)


export const getQuizDetails = async (totalQuestions: number, level: string): Promise<QuizType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    let { results } = await res.json();

    let quiz: QuizType[] = results.map((QuestionObj: QuestionType) => {
        return {
            question: QuestionObj.question,
            answer: QuestionObj.correct_answer,
            correct_answer: QuestionObj.correct_answer,
            option: shuffleArray(QuestionObj.incorrect_answers.concat(QuestionObj.correct_answer))
        }

    })

    return quiz;
} 