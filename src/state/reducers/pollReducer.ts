import { Poll, Question, QuestionType } from "../../types";
import { PollActions } from "../actions/pollActions";
import {v4 as uuid } from "uuid";
import produce from "immer";
import { stat } from "fs";
import { MAX_ANSWERS_PER_QUESTION, MAX_QUESTIONS_PER_POLL, MIN_ANSWERS_PER_QUESTION, MIN_QUESTIONS_PER_POLL } from "../../utils/constants";

const defaultQuestion: Question = {
    id: uuid(),
    content: "",
    questionOrder: 1,
    type: "RADIO",
    answers: [
        {
            id: uuid(),
            content: ""
        }
    ]
}

const defaultPoll: Poll = {
    id: uuid(),
    content: "",
    errors: {},
    opened: true,
    questions: [defaultQuestion]
}


export const pollInitialState: Poll = {
    ...defaultPoll
}

const orderQuestions = (state: Poll) => {
    for (let i = 0; i < state.questions.length; i++){
        state.questions[i].questionOrder = (i + 1);
    }
}

export const pollReducer = produce((state: Poll, action: PollActions): Poll => {
    switch(action.type){
        case "pollcontent":{
            state.content = action.content;
            return state;
        }
        case "questioncontent": {
            state.questions[action.payload.index].content = action.payload.content;
            return state;
        }
        case "changequestiontype": {
            //convertir valor a tipo QuestionType
            let questionType: QuestionType = action.payload.value as QuestionType;
            state.questions[action.payload.index].type = questionType;
            return state;
        }
        case "answercontent": {
            const { index, answerIndex, content} = action.payload;
            state.questions[index].answers[answerIndex].content = content;
            return state;
        }
        case "newquestion": {
            //para validar que no se generen más preguntas del MAX definido
            if (state.questions.length < MAX_QUESTIONS_PER_POLL){
                //vamos a tomar el orden de la ultima pregunta y le sumamos 1
                const questionOrder = state.questions[state.questions.length-1].questionOrder + 1;
                //El push es para agregar una nueva question al arreglo de questions
                //hacemos una copia de la defaultQuestion, pero le sobreescribimos algunas props
                //state.questions.push({...defaultQuestion, questionOrder, id: uuid()});
                //Luego de agregar el boton +, para que pueda inserta en cualquier orden
                state.questions.splice(action.index+1, 0, {...defaultQuestion, questionOrder, id: uuid()})
                //Para recalcular y actualizar los questionOrder
                orderQuestions(state);
                return state;
            }
            return state;
        }
        case "newanswer": {
            //para validar que no se generen más respuestas del MAX definido
            if (state.questions[action.index].answers.length < MAX_ANSWERS_PER_QUESTION){
                //El push es para agregar una nueva question al arreglo de questions
                //hacemos una copia de la defaultQuestion, pero le sobreescribimos algunas props
                state.questions[action.index].answers.push(
                    {id: uuid(), content: ""}
                );
                return state;
            }
            return state;
        }
        case "removeanswer": {
            const { index, answerId} = action.payload;
            //para validar que haya al menos una respuesta
            if (state.questions[index].answers.length > MIN_ANSWERS_PER_QUESTION) {
                state.questions[index].answers = state.questions[index].answers.filter(a => a.id !== answerId);
            }
            state.errors = {};
            return state;
        }   
        case "removequestion": {
            if (state.questions.length > MIN_QUESTIONS_PER_POLL){
                state.questions = state.questions.filter(q => q.id !== action.questionId);
            }
            state.errors = {};
            return state;
        }
        case "orderquestions": {
            const {source, destination } = action.payload;
            //splice remueve elementos de un array, desde la posicion "source", "1" elemento.
            const [question] = state.questions.splice(source, 1);
            //splice tambien agrega elentos a un array
            //Desde la posicion "destination", borrará "0" elementos y agrega "question"
            state.questions.splice(destination, 0, question);
            //para actualizar los questionOrder
            orderQuestions(state);
            state.errors = {};
            return state;
        }
        case "seterrors": {
            state.errors = action.errors;
            return state;
        }
        case "resetFormPoll": {
            state = { ...defaultPoll };
            return state
        }
        default:
            return state;
    }
});


