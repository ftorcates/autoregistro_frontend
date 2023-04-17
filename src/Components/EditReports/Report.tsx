import { getByTitle } from "@testing-library/react";
import { FC, useState, useEffect } from "react";
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { getErrorsByStreamId } from "../../services/ErrorService";
import { getReportById } from "../../services/ReportService";
import { getStreams } from "../../services/StreamService";
import { getSummariesByErrorId } from "../../services/SummaryService";
import { getUser } from "../../services/UserService";
import { Error, Stream, Summary } from "../../types";

interface ReportProps {
    id: string
    history: any
}

const Report:FC<ReportProps> = ( {id, history} ) => {
    
    const [report, setReport] = useState<any>(null);
    const [infoAdicional, setInfoAdicional] = useState(false);
    const [showDetailsError, setShowDetailsError] = useState(false);
    
    const [responsable, setResponsable] = useState("");
    const [streamId, setStreamId] = useState("");
    const [errorId, setErrorId] = useState("");
    const [summaryId, setSummaryId] = useState("");
    const [categoria, setCategoria] = useState("");
    const [turno, setTurno] = useState("");
    const [diaHabil, setDiaHabil] = useState("");
    const [nivel, setNivel] = useState("");
    const [pais, setPais] = useState("");
    const [complejidad, setComplejidad] = useState("");
    const [codigoTienda, setCodigoTienda] = useState("");
    const [descripcionReporte, setDescripcionReporte] = useState("");
    const [analisis, setAnalisis] = useState("");
    const [acciones, setAcciones] = useState("");
    const [orden, setOrden] = useState("");
    const [imei, setImei] = useState("");
    const [sku, setSku] = useState("");
    const [usuario, setUsuario] = useState("");

    const [streams, setStreams] = useState<Stream[]>([]);
    const [errores, setErrores] = useState<Error[]>([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        fetchReport();
        fetchStreams();
    }, []);

    useEffect(() => {
        fetchErrors(streamId);
    }, [streamId]);

    useEffect(() => {
        fetchSummaries(errorId);
    }, [errorId]);

    const fetchStreams = async () => {
        const res: any = await getStreams();

        const streamsC = res.data;

        for (let i = 0; i < streamsC.length; i++) {
            const stream = streamsC[i];
            setStreams(currentStreams => currentStreams.concat(stream));
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

    const showDetails = () => {
        setShowDetailsError(true);
        console.log(showDetailsError);
    }
    
    const getUserName = async (email: string) => {

        console.log(email);
        if (email !== null){
            const res: any = await getUser(email);

            console.log(res);
            setResponsable(res.data.name);
        }
    }

    const fetchReport = async () => {
        try {
            const res: any = await getReportById(id);

            const data = res.data;
            console.log(data);

            if (data.ordenAsociada !== "" 
                || data.imeiAsociado !== ""
                || data.skuAsociado !== ""
                || data.usuarioAsociado !== ""){

                setInfoAdicional(true);
            }
            
            getUserName(data.responsableSoporte);

            setReport(data);
        } catch (error: any) {
            if (error.response.status === 500) {
               
            }
            //TODO redireccionar a pagina princiapl cuando la encuesta no exista
        }
    }

    return (
        <Container className="mt-3 mb-3">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/search">
                    Buscar
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Reporte</Breadcrumb.Item>
            </Breadcrumb>
            { report !== null &&
            <Row>
                <Col sm="10" md="10" lg="12" className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h3>Editar reporte</h3><hr />
                            <Form>                                
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Id:
                                            </Form.Label>
                                            <Form.Label>
                                                &nbsp;{report.id}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Responsable:
                                            </Form.Label>
                                            <Form.Label>
                                                &nbsp;{responsable}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Fecha:
                                            </Form.Label>
                                            <Form.Label>
                                                &nbsp;{report.fechaSoporte.substring(0,10)}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Pais:
                                            </Form.Label>
                                            <br/>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={report.paisSoporte}
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
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Turno:
                                            </Form.Label>
                                            <br/> 
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={report.turno}
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
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Nivel:
                                            </Form.Label>
                                            <br/>  
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={report.tipoSoporte}
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
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Nivel:
                                            </Form.Label>
                                            <br/>  
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={report.tipoSoporte}
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
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Complejidad:
                                            </Form.Label>
                                            <br/>
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={report.complejidadSoporte}
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
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Categoría:
                                            </Form.Label>
                                            <br/>        
                                            <Form.Control
                                                as="select"
                                                className="form-select"
                                                value={report.categoriaSoporte}
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
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="streamDescription">
                                            <Form.Label className="report-details">
                                                Stream:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                &nbsp;{report.streamDescription}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="errorDescription">
                                            <Form.Label className="report-details">
                                                Error:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                &nbsp;{report.errorDescription}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mt-3" controlId="errorSummaryDescription">
                                            <Form.Label className="report-details">
                                                Summary:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                &nbsp;{report.errorSummaryDescription}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-end"> 
                                    <Button
                                        size="lg"
                                        variant="outline-light" 
                                        className="mt-4 button-blue"
                                        onClick={showDetails}>
                                            Editar detalles del reporte
                                    </Button>            
                                </div>  
                            </Form>
                            {(showDetailsError) && 
                                <>
                                   <Form id="DetailsForm" title="DetailsForm" hidden>
                                        <Row>                                    
                                            <Col>
                                                <Form.Group className="mt-3" controlId="responsable">
                                                <Form.Label className="report-details">
                                                        Stream:
                                                    </Form.Label>
                                                    <br/>
                                                    <Form.Control
                                                        as="select"
                                                        className="form-select"
                                                        value={report.streamDescription}
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
                                                <Form.Group className="mt-3" controlId="responsable">
                                                    <Form.Label className="report-details">
                                                        Error:
                                                    </Form.Label>
                                                    <br/>
                                                    <Form.Control
                                                        as="select"
                                                        className="form-select"
                                                        value={report.errorDescription}
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
                                                <Form.Group className="mt-3" controlId="responsable">
                                                    <Form.Label className="report-details">
                                                        Summary:
                                                    </Form.Label>
                                                    <br/> 
                                                    <Form.Control
                                                        as="select"
                                                        className="form-select"
                                                        value={report.errorSummaryDescription}
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
                                    </Form>
                                </>                            
                            }
                            <Form>
                                <Row>
                                <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                        <Form.Label className="report-details">
                                                Tienda:
                                            </Form.Label>
                                            <br/>
                                            <Form.Control 
                                                type="text" 
                                                size="lg"
                                                value={report.codigoTienda}
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
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Descripción del Reporte:
                                            </Form.Label>
                                            <br/>
                                            <Form.Control
                                                type="text" 
                                                size="lg"
                                                value={report.descripcionSoporte}
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
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Análisis:
                                            </Form.Label>
                                            <br/>  
                                            <Form.Control 
                                                type="text" 
                                                size="lg"
                                                value={report.analisisSoporte}
                                                onChange={e => setAnalisis(e.target.value)}
                                                isInvalid={!!errors?.analisis}/>
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                    errors?.analisis
                                                }
                                            </Form.Control.Feedback>                                        
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Acciones:
                                            </Form.Label>
                                            <br/>   
                                            <Form.Control 
                                                type="text" 
                                                size="lg"
                                                value={report.accionesSoporte}
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
                                    {infoAdicional &&
                                        <>                                 
                                        <Row className="mt-3">
                                            <Col>
                                                <hr/> 
                                                <h5>
                                                    Información adicional
                                                </h5>
                                            </Col>
                                        </Row>
                                        </>
                                    }
                                </span>
                                <span>
                                    {infoAdicional &&  report.ordenAsociada !== "" &&
                                    <>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mt-3" controlId="responsable">
                                                    <Form.Label className="report-details">
                                                        Orden:
                                                    </Form.Label>
                                                    <br/>
                                                    <Form.Label>
                                                        {report.ordenAsociada}
                                                    </Form.Label>                                            
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </>    
                                    }
                                </span>
                                <span>
                                    { infoAdicional && report.imeiAsociado !== "" &&
                                    <>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mt-3" controlId="responsable">
                                                <Form.Label className="report-details">
                                                    IMEI:
                                                </Form.Label>
                                                <br/>
                                                <Form.Label>
                                                    {report.imeiAsociado}
                                                </Form.Label>                                            
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    </>
                                    }
                                </span>
                                <span>
                                    { infoAdicional && report.skuAsociado !== "" &&
                                    <>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mt-3" controlId="responsable">
                                                <Form.Label className="report-details">
                                                    SKU:
                                                </Form.Label>
                                                <br/>
                                                <Form.Label>
                                                    {report.skuAsociado}
                                                </Form.Label>                                            
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    </>
                                    }
                                </span>
                                <span>
                                    { report.usuarioAsociado !== "" &&
                                    <>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mt-3" controlId="responsable">
                                                <Form.Label className="report-details">
                                                    Usuario:
                                                </Form.Label>
                                                <br/>
                                                <Form.Label>
                                                    {report.usuarioAsociado}
                                                </Form.Label>                                            
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    </>                                    
                                    }
                                </span>
                                
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            }
        </Container>
    )
}

export default Report;