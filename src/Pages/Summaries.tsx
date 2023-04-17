import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { Error, Stream } from "../types";
import { getStreams } from "../services/StreamService";
import { getErrorsByStreamId } from "../services/ErrorService";
import { registrarSummary } from "../services/SummaryService";
import swal from "sweetalert";

const Summaries = () => {

    const [streamId, setStreamId] = useState("");
    const [errorId, setErrorId] = useState("");
    const [descripcionSummary, setDescripcionSummary] = useState("");
    const [infoAdicional, setInfoAdicional] = useState("");

    const [errors, setErrors] = useState<any>({});

    const [showToast, setShowToast] = useState(false);
    const [sendingData, setSendingData] = useState(false);

    const [streams, setStreams] = useState<Stream[]>([]);
    const [errores, setErrores] = useState<Error[]>([]);

    useEffect(() => {
        fetchStreams();
    }, []);

    useEffect(() => {
        fetchErrors(streamId);
    }, [streamId]);

    const fetchStreams = async () => {
        const res: any = await getStreams();

        const streamsC = res.data;

        for (let i = 0; i < streamsC.length; i++) {
            const stream = streamsC[i];
            setStreams(currentStreams => currentStreams.concat(stream));
          }
        
    }

    const fetchErrors = async (streamId: string) => {

        if(streamId !== null){
            setErrores(currentErrores => []);

            const res: any = await getErrorsByStreamId(streamId);

            const errorsC = res.data;

            for (let i = 0; i < errorsC.length; i++) {
                const error = errorsC[i];
                setErrores(currentErrores => currentErrores.concat(error));
            }
        }       
        
    }

    const createSummary = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    
        const data = {
            errorId: errorId,
            summaryDescription: descripcionSummary,
            infoAdicional: infoAdicional
        }

        console.log(data);

        try {
            //Activamos el efecto del botón
            setSendingData(true);

            //Guardamos en BD
            await registrarSummary(data);

            //Limpiamos los campos del formulario
            setStreamId("");
            setErrorId("");
            setDescripcionSummary("");

            //Mostramos el mensaje
            setShowToast(false);

            //Desactivamos el efecto del botón
            setSendingData(false);

            swal({
                title: "El summary fue agregado",
                icon: "success",
                timer: 2000
            })
        } catch (errors: any) {
            console.log(errors);
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
                <Breadcrumb.Item active>Nuevo summary</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h3>Agregar nuevo summary</h3><hr />
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
                                <Form.Group className="mb-3" controlId="errorId">
                                    <Form.Label>
                                        Error
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="form-select"
                                        value={errorId}
                                        onChange={e => setErrorId(e.target.value)}
                                        isInvalid={!!errors?.errorId}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {
                                            errores.map((option: Error) => (
                                                <option key={option.idError} value={option.idError}> {option.descriptionError}</option>
                                            )) 
                                        }
                                        
                                    </Form.Control> 
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            errors?.errorId
                                        }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descripcionSummary">
                                    <Form.Label>
                                        Summary Error
                                    </Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        size="lg"
                                        value={descripcionSummary}
                                        onChange={e => setDescripcionSummary(e.target.value)}
                                        isInvalid={!!errors?.descripcionSummary}/>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            errors?.descripcionSummary
                                        }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="infoAdicional">
                                            <Form.Label>
                                                Información adicional
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={infoAdicional}
                                                onChange={e => setInfoAdicional(e.target.value)}
                                                isInvalid={!!errors?.infoAdicional}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                {/*
                                                    streams.map((option: Stream) => (
                                                        <option key={option.id} value={option.id}> A {option.description}</option>
                                                    ))*/
                                                }
                                                <option key="orden" value={"orden"}>Orden</option>
                                                <option key="sku" value={"sku"}>SKU</option>
                                                <option key="imei" value={"imei"}>IMEI</option>
                                                <option key="orden_sku" value={"orden_sku"}>Orden y SKU</option>
                                                <option key="orden_imei" value={"orden_imei"}>Orden y IMEI </option>
                                                <option key="usuario" value={"usuario"}>Usuario</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.responsable
                                                }
                                            </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-flex justify-content-end"> 
                                    <Button
                                        size="lg"
                                        variant="outline-light" 
                                        className="mt-4 button-blue"
                                        onClick={createSummary}>
                                            {sendingData ? <>
                                                        <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                                        &nbsp;
                                                        <span>Registrando summary...</span>
                                        </>: <>Registrar summary</> }
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
                        <span>El summary ha sido agregado</span>
                    </Toast.Header>
                </Toast>
            </ToastContainer>
            
        </Container>
    )
}

export default Summaries;