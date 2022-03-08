import { FC } from "react";
import { Form } from "react-bootstrap";
import { Circle, Square, Trash } from "react-bootstrap-icons";
import { usePollDispatch, usePollState } from "../../context/pollContext";
import ReactTooltip from "react-tooltip";

interface AnswerProps {
    questionIndex: number,
    answerIndex: number
}

const Answer:FC<AnswerProps> = ({questionIndex, answerIndex}) => {

    const poll = usePollState();
    const pollDispatch = usePollDispatch();

    const answer = poll.questions[questionIndex].answers[answerIndex];
    const question = poll.questions[questionIndex];

    const errors: any = poll.errors;
    const errorKey = `questions[${questionIndex}].answers[${answerIndex}]`;

    const renderIcon = () => {
        switch(question.type) {
            case 'SELECT':
                return <span className="me-1">{ answerIndex + 1 }. </span>
            case 'RADIO':
                return <Circle className="me-1"></Circle>
            case 'CHECKBOX':
                return <Square className="me-1"></Square>
        }
    }

    return (
        <>
            <div className="d-flex align-items-center mb-2 answer-item">
                {renderIcon()}
                <Form.Control
                    type="text"
                    placeholder="Respuesta"
                    value={answer.content}
                    onChange={(e) => pollDispatch({
                        type: "answercontent",
                        payload: {
                            index: questionIndex,
                            answerIndex: answerIndex,
                            content: e.target.value
                        }
                    })}
                    isInvalid={!!errors[`${errorKey}.content`]}
                />
                <span data-tip="Eliminar respuesta">
                    <Trash className="ms-1 delete-answer"  onClick={() => pollDispatch({
                        type: "removeanswer",
                        payload: {
                            index: questionIndex,
                            answerId: answer.id
                        }
                    })}
                    ></Trash>
                </span>
            </div>
            <div className="invalid-feedback d-block mb-2"> 
                {errors[`${errorKey}.content`]}
            </div>

            <ReactTooltip place="left" effect="solid" />
        </>
    )
}

export default Answer;