import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import swal from "sweetalert";
import { useAuthState } from "../context/authContext";
import { getErrorsByStreamId } from "../services/ErrorService";
import { registrarReport } from "../services/ReportService";
import { getStreams } from "../services/StreamService";
import { getErrorSummaryById, getSummariesByErrorId } from "../services/SummaryService";
import { getUser } from "../services/UserService";
import { Error, Stream, Summary } from "../types";

const Reports = () => {

    const user = useAuthState();

    const userName = user.username;
    console.log(userName);

    const [streamId, setStreamId] = useState("");
    const [errorId, setErrorId] = useState("");
    const [summaryId, setSummaryId] = useState("");
    const [categoria, setCategoria] = useState("");
    const [turno, setTurno] = useState("AM");
    const [diaHabil, setDiaHabil] = useState("Habil");
    const [nivel, setNivel] = useState("N2");
    const [pais, setPais] = useState("Peru");
    const [responsable, setResponsable] = useState("");
    const [complejidad, setComplejidad] = useState("Baja");
    const [codigoTienda, setCodigoTienda] = useState("");
    const [descripcionReporte, setDescripcionReporte] = useState("");
    const [analisis, setAnalisis] = useState("");
    const [acciones, setAcciones] = useState("");
    const [orden, setOrden] = useState("");
    const [imei, setImei] = useState("");
    const [sku, setSku] = useState("");
    const [usuario, setUsuario] = useState("");
    
    const [errors, setErrors] = useState<any>({});

    const [showToast, setShowToast] = useState(false);
    const [sendingData, setSendingData] = useState(false);

    const [streams, setStreams] = useState<Stream[]>([]);
    const [errores, setErrores] = useState<Error[]>([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);

    const [infoAdicional, setInfoAdicional] = useState(false);
    const [camposAdicionales, setCamposAdicionales] = useState("");

    useEffect(() => {
        fetchStreams();
        getUserName(user.username);
    }, []);

    useEffect(() => {
        fetchErrors(streamId);
    }, [streamId]);

    useEffect(() => {
        fetchSummaries(errorId);
    }, [errorId]);

    useEffect(() => {
        fetchInfoAdicional(summaryId);
    }, [summaryId]);

    const fetchStreams = async () => {
        const res: any = await getStreams();

        const streamsC = res.data;

        for (let i = 0; i < streamsC.length; i++) {
            const stream = streamsC[i];
            setStreams(currentStreams => currentStreams.concat(stream));
          }
        
    }   

    const getUserName = async (email: string) => {

        console.log(email);
        if (email !== null){
            const res: any = await getUser(user.username);

            console.log(res);
            setResponsable(res.data.name);
        }
    }

    const fetchErrors = async (streamId: string) => {

        if (streamId !== null){
            setErrores(currentErrores => []);
            setSummaries(currentSummaries => []);
    
            const res: any = await getErrorsByStreamId(streamId);
    
            const errorsC = res.data;
    
            for (let i = 0; i < errorsC.length; i++) {
                const error = errorsC[i];
                setErrores(currentErrores => currentErrores.concat(error));
            }
            
        }

        
    }

    const fetchSummaries = async (errorId: string) => {

        if (errorId !== null){
            setSummaries(currentSummaries => []);
    
            const res: any = await getSummariesByErrorId(errorId);
    
            const summariesC = res.data;
    
            for (let i = 0; i < summariesC.length; i++) {
                const summary = summariesC[i];
                setSummaries(currentSummaries => currentSummaries.concat(summary));
              }
        }        

    }

    const fetchInfoAdicional = async (summaryId: string) => {       
        
        console.log(summaryId);
        if (summaryId !== null){
            setInfoAdicional(false);

            const res: any = await getErrorSummaryById(summaryId);

            console.log(res);

            const infoAdicional = res.data.infoAdicional;

            console.log(infoAdicional);
        
            if (infoAdicional !== null){
                setInfoAdicional(true);

                setCamposAdicionales(infoAdicional);
                
            }
        
            console.log(infoAdicional);
        }    
        
    }    

    const createReport = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    
        const data = {
            turno: turno,
            tipoSoporte: nivel,
            paisSoporte: pais,
            diaHabil: diaHabil,
            categoriaSoporte: categoria,
            complejidadSoporte: complejidad,
            descripcionSoporte: descripcionReporte,
            analisisSoporte: analisis,
            accionesSoporte: acciones,
            streamId: streamId,
            errorId: errorId,
            errorSummaryId: summaryId,
            codigoTienda: codigoTienda,
            ordenAsociada: orden,
            imeiAsociado: imei,
            skuAsociado: sku,
            usuarioAsociado: usuario
        }

        console.log(data);

        try {
            //Activamos el efecto del botón
            setSendingData(true);

            //Guardamos en BD
            await registrarReport(data);

            //Limpiamos los campos del formulario
            setTurno("AM");
            setNivel("N2");
            setPais("Peru");
            setDiaHabil("Habil");
            setCategoria("");
            setComplejidad("Baja");
            setDescripcionReporte("");
            setAnalisis("");
            setAcciones("");
            setStreamId("");
            setErrorId("");
            setSummaryId("");
            setCodigoTienda("");
            setOrden("");
            setImei("");
            setSku("");
            setUsuario("");

            //Mostramos el mensaje
            setShowToast(false)

            //Desactivamos el efecto del botón
            setSendingData(false);

            swal({
                title: "El reporte fue agregado",
                icon: "success",
                timer: 3000
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
                <Breadcrumb.Item active>Agregar reporte</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h3>Agregar nuevo reporte</h3><hr />
                            <Form>                                
                                <Row>
                                    <Col lg="4">
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label>
                                                Responsable
                                            </Form.Label><br />                                            
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mt-3" controlId="responsable">
                                                <p className="text-user">{responsable}</p>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="pais">
                                            <Form.Label>
                                                Pais
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={pais}
                                                onChange={e => setPais(e.target.value)}
                                                isInvalid={!!errors?.pais}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option key="Peru" value={"Peru"}>Perú</option>
                                                <option key="Chile" value={"Chile"}>Chile</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.pais
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>   
                                    <Col>
                                        <Form.Group className="mt-3" controlId="turno">
                                            <Form.Label>
                                                Turno
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={turno}
                                                onChange={e => setTurno(e.target.value)}
                                                isInvalid={!!errors?.turno}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option key="AM" value={"AM"}>AM</option>
                                                <option key="PM" value={"PM"}>PM</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.turno
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="diaHabil">
                                            <Form.Label>
                                                Día Habil
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={diaHabil}
                                                onChange={e => setDiaHabil(e.target.value)}
                                                isInvalid={!!errors?.diaHabil}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option key="H" value={"Habil"}>Hábil</option>
                                                <option key="NH" value={"No Habil"}>No hábil</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.diaHabil
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>                                    
                                </Row>
                                <Row>      
                                <Col>
                                        <Form.Group className="mt-3" controlId="nivel">
                                            <Form.Label>
                                                Nivel de Soporte
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={nivel}
                                                onChange={e => setNivel(e.target.value)}
                                                isInvalid={!!errors?.nivel}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option key="N2" value={"N2"}>N2</option>
                                                <option key="N3" value={"N3"}>N3</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.nivel
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>                                                                
                                    <Col>
                                        <Form.Group className="mt-3" controlId="complejidad">
                                            <Form.Label>
                                                Complejidad
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={complejidad}
                                                onChange={e => setComplejidad(e.target.value)}
                                                isInvalid={!!errors?.complejidad}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option key="Baja" value={"Baja"}>Baja</option>
                                                <option key="Alta" value={"Alta"}>Alta</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.complejidad
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>                                    
                                    <Col>
                                        <Form.Group className="mt-3" controlId="categoria">
                                            <Form.Label>
                                                Categoria
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={categoria}
                                                onChange={e => setCategoria(e.target.value)}
                                                isInvalid={!!errors?.categoria}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                {/*
                                                    streams.map((option: Stream) => (
                                                        <option key={option.id} value={option.id}> A {option.description}</option>
                                                    ))*/
                                                }
                                                <option key="Asesoria" value={"Asesoria"}>Asesoría</option>
                                                <option key="Configuracion" value={"Configuracion"}>Configuración</option>
                                                <option key="Desarrollo" value={"Desarrollo"}>Desarrollo</option>
                                                <option key="Otros" value={"Otros"}>Otros</option>
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.categoria
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>                                    
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group className="md-5" controlId="streamId">
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
                                                        <option key={"S"+option.idStream} value={option.idStream}> {option.descriptionStream}</option>
                                                    )) 
                                                }
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.streamId
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="md-5" controlId="errorId">
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
                                                        <option key={"E"+option.idError} value={option.idError}> {option.descriptionError}</option>
                                                    )) 
                                                }
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.errorId
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="md-5" controlId="summaryId">
                                            <Form.Label>
                                                Error Summary
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={summaryId}
                                                onChange={e => setSummaryId(e.target.value)}
                                                isInvalid={!!errors?.summaryId}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                {
                                                    summaries.map((option: Summary) => (
                                                        <option key={"SE"+option.idErrorSummary} value={option.idErrorSummary}> {option.descriptionSummary}</option>
                                                    )) 
                                                }
                                                
                                            </Form.Control> 
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.summaryId
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>    
                                <Row className="mt-3">
                                    <Col lg="4">
                                        <Form.Group controlId="codigoTienda">
                                            <Form.Label>
                                                Código de Tienda
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                size="lg"
                                                value={codigoTienda}
                                                onChange={e => setCodigoTienda(e.target.value)}
                                                isInvalid={!!errors?.codigoTienda}/>
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.codigoTienda
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="descripcionReporte">
                                            <Form.Label>
                                                Descripción
                                            </Form.Label>
                                            <Form.Control
                                                type="text" 
                                                size="lg"
                                                value={descripcionReporte}
                                                onChange={e => setDescripcionReporte(e.target.value)}
                                                isInvalid={!!errors?.descripcionReporte}/>
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.descripcionReporte
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col lg="6">
                                        <Form.Group controlId="analisis">
                                            <Form.Label>
                                                Análisis
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                size="lg"
                                                value={analisis}
                                                onChange={e => setAnalisis(e.target.value)}
                                                isInvalid={!!errors?.analisis}/>
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.analisis
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="acciones">
                                            <Form.Label>
                                                Acciones
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                size="lg"
                                                value={acciones}
                                                onChange={e => setAcciones(e.target.value)}
                                                isInvalid={!!errors?.acciones}/>
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.acciones
                                                }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <span>
                                    {infoAdicional &&  camposAdicionales === "imei" ?
                                   <>                                 
                                    <Row className="mt-3">
                                        <Col>
                                            <hr/> 
                                            <h5>
                                                Información adicional
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="imei">
                                                    <Form.Label>
                                                        IMEI
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={imei}
                                                        onChange={e => setImei(e.target.value)}                                                
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    </>    
                                    : infoAdicional &&  camposAdicionales === "orden" ?
                                    <>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr/> 
                                            <h5>
                                                Información adicional
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="orden">
                                                    <Form.Label>
                                                        Orden
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={orden}
                                                        onChange={e => setOrden(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    </>
                                    : infoAdicional &&  camposAdicionales === "orden_imei" ?
                                    <>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr/> 
                                            <h5>
                                                Información adicional
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="orden">
                                                    <Form.Label>
                                                        Orden
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={orden}
                                                        onChange={e => setOrden(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="imei">
                                                    <Form.Label>
                                                        IMEI
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={imei}
                                                        onChange={e => setImei(e.target.value)}                                                
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    </>
                                    : infoAdicional &&  camposAdicionales === "orden_sku" ?
                                    <>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr/> 
                                            <h5>
                                                Información adicional
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="orden">
                                                    <Form.Label>
                                                        Orden
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={orden}
                                                        onChange={e => setOrden(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="sku">
                                                    <Form.Label>
                                                        SKU
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={sku}
                                                        onChange={e => setSku(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    </>
                                    : infoAdicional &&  camposAdicionales === "sku" ?
                                    <>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr/> 
                                            <h5>
                                                Información adicional
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="sku">
                                                    <Form.Label>
                                                        SKU
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={sku}
                                                        onChange={e => setSku(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    </>                                    
                                    : infoAdicional &&  camposAdicionales === "usuario" ?
                                    <>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr/> 
                                            <h5>
                                                Información adicional
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <Form.Group controlId="usuario">
                                                    <Form.Label>
                                                        Usuario
                                                    </Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        size="lg"
                                                        value={usuario}
                                                        onChange={e => setUsuario(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </Col>
                                    </Row>
                                    </>   
                                    : 
                                    <></>
                                }
                                </span>
                                <div className="d-flex justify-content-end"> 
                                    <Button
                                        size="lg"
                                        variant="outline-light" 
                                        className="mt-4 button-blue"
                                        onClick={createReport}>
                                            {sendingData ? <>
                                                        <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"></Spinner>
                                                        &nbsp;
                                                        <span>Agregando reporte...</span>
                                        </>: <>Agregar reporte</> }
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
                        <span>El reporte ha sido agregado</span>
                    </Toast.Header>
                </Toast>
            </ToastContainer>

            
            
        </Container>
    )
}

export default Reports;