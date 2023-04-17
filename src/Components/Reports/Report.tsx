import { FC, useState, useEffect } from "react";
import { Breadcrumb, Card, Col, Container, Form, Row } from "react-bootstrap";
import { getReportById } from "../../services/ReportService";
import { getUser } from "../../services/UserService";

interface ReportProps {
    id: string
    history: any
}

const Report:FC<ReportProps> = ( {id, history} ) => {
    
    const [report, setReport] = useState<any>(null);
    const [infoAdicional, setInfoAdicional] = useState(false);
    const [responsable, setResponsable] = useState("");

    useEffect(() => {
        fetchReport();
    }, []);

    console.log(history);
    
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
                            <h3>Detalles del reporte</h3><hr />
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
                                                Turno:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.turno}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Nivel:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.tipoSoporte}
                                            </Form.Label>                                          
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Pais:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.paisSoporte}
                                            </Form.Label>                                         
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Complejidad:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.complejidadSoporte}
                                            </Form.Label>                                          
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Categoría:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.categoriaSoporte}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                        <Form.Label className="report-details">
                                                Tienda:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.codigoTienda}
                                            </Form.Label>                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>                                    
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                        <Form.Label className="report-details">
                                                Stream:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.streamDescription}
                                            </Form.Label>                                          
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Error:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.errorDescription}
                                            </Form.Label>                                         
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Summary:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.errorSummaryDescription}
                                            </Form.Label>                                          
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3" controlId="responsable">
                                            <Form.Label className="report-details">
                                                Descripción del Reporte:
                                            </Form.Label>
                                            <br/>
                                            <Form.Label>
                                                {report.descripcionSoporte}
                                            </Form.Label>                                            
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
                                            <Form.Label>
                                                {report.analisisSoporte}
                                            </Form.Label>                                            
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
                                            <Form.Label>
                                                {report.accionesSoporte}
                                            </Form.Label>                                            
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