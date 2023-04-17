import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import swal from "sweetalert";
import { registrarError } from "../services/ErrorService";
import { getStreams } from "../services/StreamService";
import { Stream} from "../types";

const Errors = () => {

    useEffect(() => {
        fetchStreams();
    }, []);

    const [streamId, setStreamId] = useState("");
    const [descripcionError, setDescripcionError] = useState("");

    const [errors, setErrors] = useState<any>({});

    const [showToast, setShowToast] = useState(false);
    const [sendingData, setSendingData] = useState(false);

    const [streams, setStreams] = useState<Stream[]>([]);

    const fetchStreams = async () => {
        const res: any = await getStreams();

        const streamsC = res.data;

        for (let i = 0; i < streamsC.length; i++) {
            const stream = streamsC[i];
            setStreams(currentStreams => currentStreams.concat(stream));
          }
        
    }

    const createError = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    
        const data = {
            streamId: streamId,
            errorDescription: descripcionError
        }

        console.log(data);

        try {
            //Activamos el efecto del botón
            setSendingData(true);

            //Guardamos en BD
            await registrarError(data);

            //Limpiamos los campos del formulario
            setStreamId("");
            setDescripcionError("");

            //Mostramos el mensaje
            setShowToast(false)

            //Desactivamos el efecto del botón
            setSendingData(false);

            swal({
                title: "El error fue agregado",
                icon: "success",
                timer: 2000
            })
        } catch (errors: any) {
            if (errors.response){
                errors.response.status === 400 && setErrors(errors.response.data.errors);
            }
            console.log(errors);
            setSendingData(false);
        }
    }

    return (
        <Container className="mt-3 mb-3">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Nuevo error</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h3>Agregar nuevo error</h3><hr />
                            <Form>
                            <Form.Group className="mb-3" controlId="streamId">
                                    <Form.Label>
                                        Stream
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-select"
                                        value={streamId}
                                        onChange={e => setStreamId(e.target.value)}
                                        isInvalid={!!errors?.streamId}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {
                                            streams.map((option: Stream) => (
                                                <option key={option.idStream} value={option.idStream}> {option.descriptionStream}</option>
                                            )) 
                                        }
                                           
                                    </Form.Control> 
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            errors?.streamId
                                        }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descripcionError">
                                    <Form.Label>
                                        Error
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        size="lg"
                                        value={descripcionError}
                                        onChange={e => setDescripcionError(e.target.value)}
                                        isInvalid={!!errors?.descripcionError}/>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            errors?.descripcionError
                                        }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-flex justify-content-end"> 
                                    <Button
                                        size="lg"
                                        variant="outline-light" 
                                        className="mt-4 button-blue"
                                        onClick={createError}>
                                            {sendingData ? <>
                                                        <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                                        &nbsp;
                                                        <span>Registrando error...</span>
                                        </>: <>Registrar error</> }
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>    
                </Col>
            </Row>
            
            <ToastContainer position="bottom-center">
                <Toast onClose={() => setShowToast(false) } show={showToast} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <span>El error ha sido agregado</span>
                    </Toast.Header>
                </Toast>
            </ToastContainer>
            
        </Container>
    )
}

export default Errors;