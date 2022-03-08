import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Question from "./Question";
import { usePollDispatch, usePollState } from "../../context/pollContext";
import { savePoll } from "../../services/PollService";
import { useState } from "react";

const Poll = () => {

    const [showToast, setShowToast] = useState(false);
    const [sendingData, setSendingData] = useState(false);
    
    const poll = usePollState();
    const pollDispatch = usePollDispatch();

    const errors: any = poll.errors;

    const renderQuestions = () => {
        return poll.questions.map((question, index) => {
            //return <Question key={question.id} index={index}></Question>
            //Para configurar el drop and drag
            //key y draggableID son ids identificadores. Deben ser únicos
            //index es el index de la pregunta
            return <Draggable key={question.id} draggableId={question.id} index={index}>
                {
                    //el div del draggable debe recibir las propiedades innerRef, 
                    //dragHandleProps y draggableProps. Todas del provided
                    //El elemento Question ya no necesita key, porque lo tiene el elemento padre Draggable
                    (provided) => (
                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Question index={index}></Question>
                        </div>
                    )
                }
            </Draggable>
        });
    }

    const handleOnDragEnd = (result: DropResult) => {
        console.log(result);
        //si tomamos un elemento pero no lo soltamos en ningun lado
        if (!result.destination) return;
        //si tomamos un elemnto y lo soltamos donde mismo
        if (result.source.index === result.destination.index) return;

        pollDispatch({
            type: "orderquestions",
            payload: {
                source: result.source.index,
                destination: result.destination.index
            }
        });
    }

    const createPoll = async () => {
        const data = {
            content: poll.content,
            opened: poll.opened,
            questions: poll.questions
        };

        try {
            setSendingData(true);
            await savePoll(data);
            pollDispatch({
                type: "resetFormPoll"
            })
            setShowToast(true);
            setSendingData(false);
        } catch (errors: any) {
            if (errors.response && errors.response.status === 400){
                pollDispatch({
                    type: "seterrors",
                    errors: errors.response.data.errors
                })                
            }
            setSendingData(false);
        }
    }

    return (
        <Container className="mg-5 mb-5">
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto">
                    <FloatingLabel controlId="poll-content" label="Titulo de la encuesta">
                        <Form.Control 
                            value={poll.content}
                            onChange={(e) => pollDispatch({
                                type: "pollcontent",
                                content: e.target.value
                            })}
                            size="lg"
                            type="text"
                            placeholder="Titulo de la encuesta"
                            isInvalid={!!errors?.content}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.content}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    {/*La propiedad onDragEnd debe tener la función a invocar al momento de soltar 
                        el elemento
                       El Droppable debe llevar el droppableId, que debe ser único. */}
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId={uuid()}>
                            {
                                (provided) => (
                                    //el div del Droppable debe recibir las propiedades innerRef, 
                                    //y droppableProps. Ambas del provided
                                    //Luego de renderizar las preguntas se debe invocar al place holder
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        { renderQuestions() }
                                        { provided.placeholder }
                                    </div>
                                )
                            }
                        </Droppable>
                    </DragDropContext>

                    <Button
                        size="lg"
                        variant="outline-primary" 
                        onClick={createPoll}
                        className="mt-5">
                            {sendingData ? <>
                                        <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                        &nbsp;
                                        <span>Creando encuesta...</span>
                                </>: <>Crear encuesta</> }</Button>

                </Col>
            </Row>

            <ToastContainer position="bottom-center">
                <Toast onClose={() => setShowToast(false) } show={showToast} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <span>La encuesta ha sido creada</span>
                    </Toast.Header>
                    <Toast.Body>
                        Puedes copiar el enlace desde el panel
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            
        </Container>
    );
}

export default Poll;