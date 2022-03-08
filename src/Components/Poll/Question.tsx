import { FC, useEffect } from "react";
import Row from "react-bootstrap/Row"
import { Button, Card, Col, Container, Form} from "react-bootstrap";
import { usePollDispatch, usePollState } from "../../context/pollContext";
import { questionTypeOptions } from "../../utils/constants";
import Answer from "./Answer";
import { PlusCircle, PlusLg, Trash } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";

interface QUestionProps {
    index: number
}

const Question:FC<QUestionProps> = ({ index }) => {

    const poll = usePollState();
    const pollDispatch = usePollDispatch();

    const question = poll.questions[index];

    const errors: any = poll.errors;
    const errorKey = `questions[${index}]`;

    useEffect(() => {
        ReactTooltip.rebuild();
    }, [question.answers.length]);

    const renderAnswers = () => {
        return question.answers.map((answer, answerIndex) => (
            <Answer
                key={answer.id} 
                questionIndex={index} 
                answerIndex={answerIndex}/>
            )
        )
    }

    return (
        <Card className="mt-3">
            <Card.Body>
                <Row>
                    <Col sm="12" md="6" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Pregunta"
                            onChange={(e) => pollDispatch({
                                type: "questioncontent",
                                payload: {
                                    content: e.target.value,
                                    index: index
                                }
                            }) }
                            value={question.content}
                            isInvalid={!!errors[`${errorKey}.content`]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`${errorKey}.content`]}
                        </Form.Control.Feedback>
                    </Col>

                    <Col sm="12" md="6" className="mb-4">
                        <Form.Control
                            as="select"
                            className="form-select"
                            value={question.type}
                            onChange={(e) => pollDispatch({
                                type: "changequestiontype",
                                payload: {
                                    index: index,
                                    value: e.target.value
                                }
                            })}
                            isInvalid={!!errors[`${errorKey}.type`]}
                        >
                            <option>Tipo de pregunta</option>
                            {
                                questionTypeOptions.map(option => (
                                    <option key={option.value} value={option.value}> {option.name}</option>
                                ))
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors[`${errorKey}.type`]}
                        </Form.Control.Feedback>
                    </Col>
                </Row>

                <Container>
                    {renderAnswers()}

                    <Button size="sm" className="mt-2" variant="outline-primary"
                        onClick={() => pollDispatch({
                            type: "newanswer",
                            index: index
                        })}>
                        <PlusLg/> Añadir respuesta
                    </Button>
                </Container>

                <hr /> 
                <div className="d-flex justify-content-end">
                    <span data-tip="Añadir pregunta">
                        <PlusCircle className="option-question-icon ms-1"
                            onClick={() => pollDispatch({
                                type: "newquestion",
                                index: index
                            })}></PlusCircle>
                    </span>
                    <span data-tip="Eliminar pregunta">
                        <Trash className="option-question-icon ms-1"
                            onClick={() => pollDispatch({
                                type: "removequestion",
                                questionId: question.id
                            })}></Trash>
                    </span>
                </div> 

                <ReactTooltip place="left" effect="solid" />
            </Card.Body>
        </Card>
    )
}

export default Question;